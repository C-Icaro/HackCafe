# IoT Architecture Document (IAD)

## 1. Introdução
&nbsp;&nbsp;&nbsp;&nbsp;O dispositivo IOT do projeto HackCafé consiste em uma unidade de controle e uma ou mais unidades de campo. De forma conjunta, o sistema capta e envia dados críticos do solo e do ar da plantação via MQTT para o banco de dados do agricultor, onde serão posteriormente utilizados para análise preditiva e visualização em dashboard web. 

&nbsp;&nbsp;&nbsp;&nbsp;De forma específica, a unidade de campo é responsável pelo manejo dos dados dos sensores e comunicação LoRa (offline) com a unidade de controle. Essa, por sua vez, recebe os dados de todas as unidades de campo e os envia para o banco de dados para posterior uso. Essa separação de unidades permite **escalabilidade** e **garante integridade dos dados** uma vez que Nº unidades de campo podem ser integrados a uma só unidade de controle com uma distância base de comunicação de 10km em ambientes rurais, podendo também ser ampliada indefinidamente por meio de engenharia de redes.

---

## 2. Visão Geral
- **Tipo de dispositivo:** ESP32 e Raspberry Pi 3. 
- **Função principal:** Monitoramento, posteriormente agregado com automação e controle  
- **Integração:** LoRa (Offline) e servidor dedicado.
- **Formato físico:** Vide seção 7.

---

## 3. Escopo
**Inclui:**
- Coleta de dados offline via sensores das unidades de campo
- Envio de dados para o banco online via protocolo definido na unidade de controle

**Não inclui (no momento):**
- Controle de atuadores
- Processamento offline avançado

---

## 4. Arquitetura

&nbsp;&nbsp;&nbsp;&nbsp;Neste tópico, apresenta-se como o sistema IOT do HackCafé está organizado, mostrando os principais componentes e como eles se conectam para funcionar juntos.

### 4.1. Diagrama de rede

&nbsp;&nbsp;&nbsp;&nbsp;O diagrama de rede mostra, de forma visual, como os dispositivos e serviços do HackCafé se comunicam entre si. Abaixo encontra-se o diagrama de rede do sistema IOT:

<div align="center" width=100%>
<sub>Imagem 01: Diagrama de redes.</sub>
<div>
<img src="../assets/Diagrama de rede HackCafé.png" alt="Diagrama de redes" width=70%>
</div>
<sup>Fonte: Material autoral, 2025.</sup>
</div>

### 4.2. Fluxo de Dados
1. Sensor coleta dado  
2. MCU processa  
3. Envia via MQTT para o banco de dados
4. Plataforma web exibe

---

## 5. Comunicação
- **Protocolo:** MQTT  
- **Formato:** JSON  
- **Tópicos:**  
  - `projeto/sensor/temperatura`  
  - `projeto/sensor/umidade`
  - `projeto/sensor/ph` 
  - `projeto/sensor/` 
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
