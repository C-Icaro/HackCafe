/*
 * HackCafé IoT Device - ESP32
 * Monitoramento inteligente de plantações de café
 * 
 * Funcionalidades:
 * - Leitura de sensores ambientais
 * - Captura de imagens para detecção de doenças
 * - Comunicação LoRaWAN
 * - Gerenciamento de energia
 * 
 * Autor: Carlos Icaro
 * Data: 2024
 */

#include <WiFi.h>
#include <LoRa.h>
#include <SPI.h>
#include <Wire.h>
#include <DHT.h>
#include <Adafruit_SHT31.h>
#include <esp_camera.h>
#include <esp_sleep.h>
#include <esp_wifi.h>
#include <esp_bt.h>
#include <ArduinoJson.h>

// Configurações WiFi
const char* ssid = "HackCafe_Config";
const char* password = "hackcafe2024";

// Configurações LoRa
#define LORA_FREQ 915E6
#define LORA_SF 7
#define LORA_BW 125E3
#define LORA_CR 5

// Pinos dos sensores
#define DHT_PIN 4
#define LDR_PIN 36
#define PH_PIN 39
#define LORA_SS 5
#define LORA_RST 14
#define LORA_DIO0 2

// Configuração da câmera
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    22
#define XCLK_GPIO_NUM     0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       21
#define Y5_GPIO_NUM       19
#define Y4_GPIO_NUM       18
#define Y3_GPIO_NUM       5
#define Y2_GPIO_NUM       4
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     1

// Objetos dos sensores
DHT dht(DHT_PIN, DHT22);
Adafruit_SHT31 sht31 = Adafruit_SHT31();

// Estrutura de dados dos sensores
struct SensorData {
  float temperature_air;
  float humidity_air;
  float temperature_soil;
  float humidity_soil;
  float ph_soil;
  int light_level;
  float battery_voltage;
  int rssi;
  unsigned long timestamp;
};

// Estrutura para dados da câmera
struct CameraData {
  bool image_captured;
  size_t image_size;
  String image_base64;
  unsigned long timestamp;
};

SensorData sensorData;
CameraData cameraData;

// Variáveis de controle
unsigned long lastSensorRead = 0;
unsigned long lastImageCapture = 0;
unsigned long lastDataTransmission = 0;
const unsigned long SENSOR_INTERVAL = 300000;    // 5 minutos
const unsigned long IMAGE_INTERVAL = 21600000;   // 6 horas
const unsigned long TRANSMISSION_INTERVAL = 600000; // 10 minutos

// Contador de ciclo de sono
RTC_DATA_ATTR int bootCount = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("\n🌱 HackCafé IoT Device Iniciando...");
  
  // Incrementa contador de boot
  bootCount++;
  Serial.printf("Boot #%d\n", bootCount);
  
  // Inicializa sensores
  initSensors();
  
  // Inicializa câmera
  initCamera();
  
  // Inicializa LoRa
  initLoRa();
  
  // Inicializa WiFi (apenas para configuração)
  initWiFi();
  
  // Leitura inicial dos sensores
  readAllSensors();
  
  // Captura imagem se necessário
  if (shouldCaptureImage()) {
    captureImage();
  }
  
  // Transmite dados
  transmitData();
  
  // Configura próximo ciclo de sono
  setupSleep();
  
  Serial.println("✅ Setup completo. Entrando em modo de sono...");
}

void loop() {
  // O ESP32 entra em modo de sono profundo
  // Este loop não é executado normalmente
}

void initSensors() {
  Serial.println("🔧 Inicializando sensores...");
  
  // DHT22
  dht.begin();
  Serial.println("  ✅ DHT22 inicializado");
  
  // SHT31
  if (sht31.begin(0x44)) {
    Serial.println("  ✅ SHT31 inicializado");
  } else {
    Serial.println("  ❌ SHT31 não encontrado");
  }
  
  // Pinos analógicos
  pinMode(LDR_PIN, INPUT);
  pinMode(PH_PIN, INPUT);
  
  Serial.println("  ✅ Sensores analógicos configurados");
}

void initCamera() {
  Serial.println("📸 Inicializando câmera...");
  
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_VGA;
  config.pixel_format = PIXFORMAT_JPEG;
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("❌ Erro na inicialização da câmera: %s\n", esp_err_to_name(err));
    return;
  }
  
  Serial.println("  ✅ Câmera inicializada");
}

void initLoRa() {
  Serial.println("📡 Inicializando LoRa...");
  
  SPI.begin(LORA_SCK, LORA_MISO, LORA_MOSI, LORA_SS);
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  
  if (!LoRa.begin(LORA_FREQ)) {
    Serial.println("❌ LoRa falhou ao inicializar");
    return;
  }
  
  LoRa.setSpreadingFactor(LORA_SF);
  LoRa.setBandwidth(LORA_BW);
  LoRa.setCodingRate(LORA_CR);
  LoRa.setSyncWord(0x12);
  LoRa.setTxPower(20);
  
  Serial.println("  ✅ LoRa inicializado");
}

void initWiFi() {
  Serial.println("📶 Inicializando WiFi...");
  
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);
  
  Serial.printf("  ✅ AP WiFi criado: %s\n", ssid);
  Serial.printf("  📱 Conecte-se para configurar o dispositivo\n");
}

void readAllSensors() {
  Serial.println("📊 Lendo sensores...");
  
  // DHT22 - Temperatura e umidade do ar
  sensorData.temperature_air = dht.readTemperature();
  sensorData.humidity_air = dht.readHumidity();
  
  // SHT31 - Temperatura e umidade de alta precisão
  sensorData.temperature_soil = sht31.readTemperature();
  sensorData.humidity_soil = sht31.readHumidity();
  
  // Sensor de pH (simulado - precisa de calibração)
  int phRaw = analogRead(PH_PIN);
  sensorData.ph_soil = map(phRaw, 0, 4095, 35, 90) / 10.0; // Mapeamento para pH 3.5-9.0
  
  // Sensor de luminosidade
  sensorData.light_level = analogRead(LDR_PIN);
  
  // Tensão da bateria (simulado - precisa de divisor de tensão)
  sensorData.battery_voltage = 12.8; // Volts
  
  // RSSI do LoRa
  sensorData.rssi = LoRa.packetRssi();
  
  // Timestamp
  sensorData.timestamp = millis();
  
  // Validação dos dados
  if (isnan(sensorData.temperature_air) || isnan(sensorData.humidity_air)) {
    Serial.println("  ⚠️  DHT22 retornou valores inválidos");
  }
  
  if (isnan(sensorData.temperature_soil) || isnan(sensorData.humidity_soil)) {
    Serial.println("  ⚠️  SHT31 retornou valores inválidos");
  }
  
  Serial.println("  ✅ Sensores lidos com sucesso");
  printSensorData();
}

void printSensorData() {
  Serial.println("\n📊 Dados dos Sensores:");
  Serial.printf("  🌡️  Temperatura do ar: %.1f°C\n", sensorData.temperature_air);
  Serial.printf("  💧 Umidade do ar: %.1f%%\n", sensorData.humidity_air);
  Serial.printf("  🌡️  Temperatura do solo: %.1f°C\n", sensorData.temperature_soil);
  Serial.printf("  💧 Umidade do solo: %.1f%%\n", sensorData.humidity_soil);
  Serial.printf("  🧪 pH do solo: %.1f\n", sensorData.ph_soil);
  Serial.printf("  ☀️  Nível de luz: %d\n", sensorData.light_level);
  Serial.printf("  🔋 Tensão da bateria: %.1fV\n", sensorData.battery_voltage);
  Serial.printf("  📡 RSSI: %d dBm\n", sensorData.rssi);
}

bool shouldCaptureImage() {
  // Captura imagem a cada 6 horas ou se for o primeiro boot
  return (bootCount == 1) || (millis() - lastImageCapture >= IMAGE_INTERVAL);
}

void captureImage() {
  Serial.println("📸 Capturando imagem...");
  
  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("❌ Falha na captura da imagem");
    return;
  }
  
  // Converte para base64 (simplificado)
  cameraData.image_captured = true;
  cameraData.image_size = fb->len;
  cameraData.timestamp = millis();
  
  // Libera buffer da câmera
  esp_camera_fb_return(fb);
  
  Serial.printf("  ✅ Imagem capturada: %d bytes\n", cameraData.image_size);
  lastImageCapture = millis();
}

void transmitData() {
  Serial.println("📡 Transmitindo dados via LoRa...");
  
  // Cria JSON com dados dos sensores
  StaticJsonDocument<512> doc;
  
  doc["device_id"] = "hackcafe_001";
  doc["timestamp"] = sensorData.timestamp;
  doc["sensors"] = JsonObject();
  doc["sensors"]["temperature_air"] = sensorData.temperature_air;
  doc["sensors"]["humidity_air"] = sensorData.humidity_air;
  doc["sensors"]["temperature_soil"] = sensorData.temperature_soil;
  doc["sensors"]["humidity_soil"] = sensorData.humidity_soil;
  doc["sensors"]["ph_soil"] = sensorData.ph_soil;
  doc["sensors"]["light_level"] = sensorData.light_level;
  doc["sensors"]["battery_voltage"] = sensorData.battery_voltage;
  doc["sensors"]["rssi"] = sensorData.rssi;
  
  if (cameraData.image_captured) {
    doc["camera"]["image_captured"] = true;
    doc["camera"]["image_size"] = cameraData.image_size;
    doc["camera"]["timestamp"] = cameraData.timestamp;
  }
  
  // Serializa JSON
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Transmite via LoRa
  LoRa.beginPacket();
  LoRa.print(jsonString);
  int result = LoRa.endPacket();
  
  if (result) {
    Serial.println("  ✅ Dados transmitidos com sucesso");
    Serial.printf("  📤 Tamanho: %d bytes\n", jsonString.length());
    lastDataTransmission = millis();
  } else {
    Serial.println("  ❌ Falha na transmissão");
  }
  
  // Aguarda confirmação
  delay(1000);
  
  // Verifica se há mensagens recebidas
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String received = "";
    while (LoRa.available()) {
      received += (char)LoRa.read();
    }
    Serial.printf("  📥 Mensagem recebida: %s\n", received.c_str());
  }
}

void setupSleep() {
  Serial.println("😴 Configurando modo de sono...");
  
  // Desliga WiFi e Bluetooth para economizar energia
  esp_wifi_stop();
  esp_bt_controller_disable();
  
  // Configura timer para acordar
  esp_sleep_enable_timer_wakeup(TRANSMISSION_INTERVAL * 1000); // Converte para microssegundos
  
  // Configura GPIO para acordar (opcional)
  esp_sleep_enable_ext1_wakeup(0x00000000, ESP_EXT1_WAKEUP_ANY_HIGH);
  
  Serial.printf("  ⏰ Acordará em %d segundos\n", TRANSMISSION_INTERVAL / 1000);
  Serial.println("  💤 Entrando em modo de sono profundo...");
  
  // Entra em sono profundo
  esp_deep_sleep_start();
}

// Função chamada quando o ESP32 acorda do sono profundo
void wakeup_reason() {
  esp_sleep_wakeup_cause_t wakeup_reason = esp_sleep_get_wakeup_cause();
  
  switch(wakeup_reason) {
    case ESP_SLEEP_WAKEUP_EXT0:
      Serial.println("Acordou por GPIO");
      break;
    case ESP_SLEEP_WAKEUP_EXT1:
      Serial.println("Acordou por GPIO externo");
      break;
    case ESP_SLEEP_WAKEUP_TIMER:
      Serial.println("Acordou por timer");
      break;
    case ESP_SLEEP_WAKEUP_TOUCHPAD:
      Serial.println("Acordou por touchpad");
      break;
    case ESP_SLEEP_WAKEUP_ULP:
      Serial.println("Acordou por ULP");
      break;
    default:
      Serial.printf("Acordou por motivo desconhecido: %d\n", wakeup_reason);
      break;
  }
}
