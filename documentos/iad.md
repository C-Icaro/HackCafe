# IoT Architecture Document (IAD)

## 1. Introdução
Breve descrição do dispositivo, propósito e contexto no projeto.

**Exemplo:**  
O dispositivo IoT realiza medições de temperatura e umidade, enviando dados via MQTT para a plataforma web para monitoramento em tempo real.

---

## 2. Visão Geral
- **Tipo de dispositivo:** (ESP32, Raspberry Pi etc.)  
- **Função principal:** (monitoramento, automação, controle)  
- **Integração:** (Wi-Fi, LoRa, ZigBee)  
- **Formato físico:** (dimensões, modelo 3D)

---

## 3. Escopo
**Inclui:**
- Coleta de dados via sensores
- Envio via protocolo definido
- Interface de teste local

**Não inclui:**
- Controle de atuadores
- Processamento offline avançado

---

## 4. Arquitetura
### 4.1. Diagrama de Hardware
*(Inserir diagrama ou imagem)*

| Componente | Função | Modelo | Observações |
|------------|--------|--------|-------------|
| Microcontrolador | Processamento e comunicação | ESP32 DevKit V1 | Wi-Fi + BLE |
| Sensor | Coleta de dados | DHT22 | ±0.5°C |
| Fonte de energia | Alimentação | 5V USB | Compatível com power bank |

### 4.2. Fluxo de Dados
1. Sensor coleta dado  
2. MCU processa  
3. Envia via MQTT  
4. Plataforma web exibe

---

## 5. Comunicação
- **Protocolo:** MQTT  
- **Formato:** JSON  
- **Tópicos:**  
  - `projeto/sensor/temperatura`  
  - `projeto/sensor/umidade`  
- **Segurança:** TLS, autenticação básica

---

## 6. Firmware
- **Linguagem:** C++ (Arduino Framework)  
- **Bibliotecas:** PubSubClient, DHT  
- **OTA:** Sim/Não

---

## 7. Modelagem Física
- Arquivos 3D (.STL, .STEP)  
- Especificações de impressão 3D

---

## 8. Testes
- Testes de bancada  
- Testes de integração  
- Testes de resistência

---

## 9. Plano de Evolução
Melhorias previstas e novas funcionalidades

---

## 10. Anexos
- Esquemáticos  
- Fotos/vídeos  
- Logs
