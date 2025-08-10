# Projeto HackCafé

## Integrante:

<div align="left">
  <table>
    <tr>
      <td align="center"><a href="https://www.linkedin.com/in/carlosicaro/"><img style="border-radius: 5%;" src="assets/carlos.jpg" width="100px;" alt="Carlos Icaro - Foto" /><br><sub><b>Carlos Icaro</b></sub></a></td>
  </table>
</div>

## Descrição

&nbsp;&nbsp;&nbsp;&nbsp;O projeto HackCafé é uma solução para o Hackathon de mesmo nome organizado pela [Café Fazenda Monthal](https://www.cafemonthal.com.br/). A solução consiste em uma plataforma Web e um dispotivio IOT que visam simplificar a vida do produtor de café de montanha por meio da captação, visualização e análise de dados da sua plantação.

&nbsp;&nbsp;&nbsp;&nbsp;A proposta insere tecnologia acessivel e escalável para o produtor rual e coloca a sua integral disposição dados criticos da sua futura colheita, dando-lhe uma visão estratégica sobre manutenção preventiva e corretiva do solo e de possiveis pragas ou anomalias em suas plantas.

&nbsp;&nbsp;&nbsp;&nbsp;O resultado é maior produtividade, redução de perdas e apoio à tomada de decisão, levando inovação à realidade do produtor rural.

- Código plataforma web: safe-cafe.vercel.app

## Estrutura de pastas

```
HackCafe/
├── análise-preditiva/           # Módulo de análise preditiva e detecção de doenças
│   ├── coffee-datasets/         # Dataset de folhas de café com imagens e metadados
│   │   ├── leaf/
│   │   │   ├── dataset.csv     # Metadados das imagens (severidade, estresse, etc.)
│   │   │   └── images/         # 2000+ imagens de folhas de café (.jpg)
│   ├── detector.py              # Classe principal CoffeeDiseaseDetector
│   ├── main.py                  # Script principal com menu interativo
│   ├── teste_rapido.py          # Script de teste rápido do sistema
│   ├── exemplo_uso.py           # Exemplos de uso programático
│   ├── requirements.txt          # Dependências Python
│   ├── yolov8n.pt               # Modelo YOLO v8 pré-treinado
│   └── README_COFFEE_DISEASE.md # Documentação do módulo
├── dispositivo-iot/              # Dispositivo IoT para monitoramento em tempo real
│   ├── esp32_firmware/          # Firmware Arduino para ESP32
│   │   ├── esp32_monitor.ino    # Código principal do ESP32
│   │   ├── config.h             # Configurações e pinos
│   │   └── sensors.h            # Bibliotecas e funções dos sensores
│   ├── monitor.py               # Script Python para monitoramento
│   ├── requirements.txt          # Dependências Python
│   └── README_IOT.md            # Documentação do dispositivo IoT
├── plataforma-web/               # Plataforma web para visualização e análise
│   ├── app.py                   # Aplicação Flask principal
│   ├── templates/               # Templates HTML
│   ├── static/                  # Arquivos estáticos (CSS, JS, imagens)
│   ├── requirements.txt          # Dependências Python
│   └── README_WEB.md            # Documentação da plataforma web
├── assets/                       # Recursos do projeto
│   ├── carlos.jpg               # Foto do desenvolvedor
│   ├── coffee.csv               # Dataset de café
│   └── Diagrama de rede HackCafé.png # Diagrama da arquitetura
├── documentos/                   # Documentação adicional
│   ├── iad.md                   # Documentação de Inteligência Artificial
│   └── wad.md                   # Documentação de Web Application Development
└── README.md                     # Este arquivo - visão geral do projeto
```

### Componentes Principais

#### 🧠 **Análise Preditiva** (`análise-preditiva/`)
- **Detecção de Doenças**: Sistema baseado em YOLO v8 para identificar doenças em folhas de café
- **Dataset**: 2000+ imagens com metadados de severidade e estresse
- **Código Simplificado**: Arquivos principais organizados e documentados
- **Interface Interativa**: Menu para testes e análises

#### 📡 **Dispositivo IoT** (`dispositivo-iot/`)
- **ESP32**: Microcontrolador principal com conectividade WiFi/LoRaWAN
- **Sensores**: DHT22 (temperatura/umidade), SHT31 (precisão), pH-4502C (pH do solo), LDR (luminosidade)
- **Câmera**: OV2640 para captura de imagens
- **Monitoramento**: Script Python para coleta e visualização de dados

#### 🌐 **Plataforma Web** (`plataforma-web/`)
- **Flask**: Framework web para interface de usuário
- **Visualização**: Dashboards para análise de dados
- **Integração**: Conecta com dispositivo IoT e análise preditiva

#### 📚 **Documentação** (`documentos/`)
- **IAD**: Documentação de IOT
- **WAD**: Documentação de Desenvolvimento Web

## Licença