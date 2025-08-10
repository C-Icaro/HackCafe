# 🌱 Dispositivo IoT HackCafé

## 📋 Visão Geral

O dispositivo IoT HackCafé é uma solução inteligente para monitoramento em tempo real de plantações de café, integrando sensores ambientais, câmera para detecção de doenças e comunicação via LoRaWAN para áreas rurais.

## 🎯 Funcionalidades

- **Monitoramento Ambiental**: Temperatura, umidade, pH do solo
- **Detecção de Doenças**: Câmera integrada com IA para análise de folhas
- **Comunicação LoRaWAN**: Conexão de longo alcance para áreas rurais
- **Energia Solar**: Sistema autônomo com painel solar e bateria
- **Dashboard em Tempo Real**: Visualização dos dados coletados

## 🗂️ Estrutura do Projeto

```
dispositivo-iot/
├── firmware/           # Código para microcontrolador ESP32
├── hardware/           # Esquemas e especificações
├── docs/              # Documentação técnica
├── simulação/          # Simulador para testes
└── README.md          # Este arquivo
```

## 🔧 Especificações Técnicas

### Microcontrolador
- **ESP32-WROOM-32**: WiFi + Bluetooth + LoRa
- **Processador**: Dual-core 240MHz
- **Memória**: 520KB SRAM, 4MB Flash

### Sensores
- **DHT22**: Temperatura e umidade do ar
- **Sensirion SHT30**: Temperatura e umidade de alta precisão
- **pH-4502C**: Sensor de pH do solo
- **LDR**: Sensor de luminosidade
- **Camera OV2640**: 2MP para captura de imagens

### Comunicação
- **LoRaWAN**: Frequência 915MHz (Brasil)
- **WiFi**: Conexão local para configuração
- **Bluetooth**: Configuração via smartphone

### Energia
- **Painel Solar**: 10W, 12V
- **Bateria**: LiFePO4 12.8V, 10Ah
- **Regulador**: MPPT para máxima eficiência

## 🚀 Como Usar

### 1. Configuração Inicial

```bash
cd dispositivo-iot/firmware
# Instalar dependências Arduino
# Configurar credenciais WiFi e LoRaWAN
# Fazer upload para ESP32
```

### 2. Monitoramento

```bash
# Ver dados em tempo real
python monitor.py

# Configurar alertas
python config_alerts.py
```

### 3. Manutenção

```bash
# Atualizar firmware
python update_firmware.py

# Calibrar sensores
python calibrate_sensors.py
```

## 📊 Dados Coletados

### Sensores Ambientais
- **Temperatura**: -40°C a +80°C (±0.5°C)
- **Umidade**: 0-100% (±2%)
- **pH do Solo**: 3.5-9.0 (±0.1)
- **Luminosidade**: 0-65535 lux

### Imagens
- **Resolução**: 1600x1200 pixels
- **Formato**: JPEG
- **Frequência**: A cada 6 horas ou sob demanda
- **Processamento**: IA local para detecção de doenças

## 🔗 Integração

### Plataforma Web
- API REST para consulta de dados
- WebSocket para atualizações em tempo real
- Dashboard responsivo para visualização

### Análise Preditiva
- Envio automático de imagens para análise
- Recebimento de alertas de doenças
- Histórico de saúde das plantas

### LoRaWAN
- Gateway TTN (The Things Network)
- Aplicação personalizada para HackCafé
- Integração com plataforma de IoT

## 🛠️ Desenvolvimento

### Pré-requisitos
- Arduino IDE 2.0+
- ESP32 Board Manager
- Bibliotecas: LoRa, WiFi, Camera, Sensores

### Estrutura do Código
```cpp
// Estrutura principal
void setup() {
    initSensors();
    initCamera();
    initLoRa();
    initWiFi();
}

void loop() {
    readSensors();
    captureImage();
    processImage();
    sendData();
    deepSleep();
}
```

## 📈 Roadmap

### Fase 1 (Atual)
- ✅ Sensores básicos funcionando
- ✅ Comunicação LoRaWAN
- 🔄 Integração com câmera

### Fase 2 (Próxima)
- 🔄 Processamento de IA local
- 🔄 Dashboard em tempo real
- 🔄 Sistema de alertas

### Fase 3 (Futura)
- 🔄 Machine Learning no dispositivo
- 🔄 Otimização de energia
- 🔄 Rede de dispositivos

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

- **Email**: hackcafe@example.com
- **Issues**: GitHub Issues
- **Documentação**: Wiki do projeto

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
