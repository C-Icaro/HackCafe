# 🍃 Detector de Doenças em Folhas de Café - Versão Simplificada

Sistema simplificado para detecção automática de doenças em folhas de café usando YOLO v8.

## 📁 Estrutura dos Arquivos

- **`detector.py`** - Classe principal `CoffeeDiseaseDetector`
- **`main.py`** - Script principal com menu interativo
- **`requirements.txt`** - Dependências Python
- **`yolov8n.pt`** - Modelo YOLO pré-treinado

## 🚀 Instalação

1. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

2. **Verifique se o modelo YOLO existe:**
   - O arquivo `yolov8n.pt` deve estar na pasta raiz
   - Se não existir, será baixado automaticamente na primeira execução

## 💻 Como Usar

### Execução Rápida
```bash
python main.py
```

### Uso Programático
```python
from detector import CoffeeDiseaseDetector

# Inicializa detector
detector = CoffeeDiseaseDetector()

# Carrega dataset e modelo
detector.load_dataset()
detector.load_model()

# Faz predição em uma imagem
results = detector.predict_image("caminho/para/imagem.jpg")

# Mostra estatísticas do dataset
detector.analyze_dataset()
```

## 📋 Funcionalidades

### ✅ Análise do Dataset
- Carrega dataset CSV com 1749 imagens
- Mostra estatísticas de folhas saudáveis vs doentes
- Distribuição de severidade das doenças

### 🔍 Detecção com YOLO
- Usa modelo YOLO v8 pré-treinado
- Detecta objetos em imagens de folhas
- Configurável nível de confiança

### 🖼️ Visualização
- Mostra imagens com detecções marcadas
- Retângulos delimitadores coloridos
- Informações de classe e confiança

### 🧪 Testes
- Testa modelo em imagens aleatórias
- Testa imagem específica por nome
- Validação de arquivos existentes

## 🎯 Menu Interativo

O `main.py` oferece um menu com opções:

1. **Analisar dataset** - Estatísticas básicas
2. **Testar modelo** - Imagens aleatórias
3. **Testar imagem específica** - Por nome de arquivo
4. **Mostrar com detecções** - Visualização gráfica
5. **Sair** - Encerra programa

## 📊 Dataset

- **Localização:** `coffee-datasets/leaf/`
- **Arquivo:** `dataset.csv`
- **Imagens:** `images/` (1749 arquivos .jpg)
- **Colunas:** id, predominant_stress, miner, rust, phoma, cercospora, severity

## 🔧 Configuração

### Caminhos Padrão
- **Modelo:** `yolov8n.pt` (pasta atual)
- **Dataset:** `coffee-datasets/leaf/`
- **Imagens:** `coffee-datasets/leaf/images/`

### Personalização
```python
detector = CoffeeDiseaseDetector(
    model_path='meu_modelo.pt',
    dataset_path='meu_dataset/'
)
```

## ⚠️ Solução de Problemas

### Erro: "Dataset não encontrado"
- Verifique se `coffee-datasets/leaf/dataset.csv` existe
- Confirme estrutura de pastas

### Erro: "Modelo não encontrado"
- Verifique se `yolov8n.pt` existe
- O YOLO baixa automaticamente se necessário

### Erro: "Imagem não encontrada"
- Verifique se a imagem existe em `coffee-datasets/leaf/images/`
- Use nomes exatos (ex: `1.jpg`, `100.jpg`)

## 🚀 Próximos Passos

1. **Treinar modelo personalizado** para doenças específicas
2. **Integrar com câmera** para detecção em tempo real
3. **Criar interface web** para upload de imagens
4. **Conectar com sistema IoT** para monitoramento automático

## 📝 Exemplo de Saída

```
🍃 DETECTOR DE DOENÇAS EM FOLHAS DE CAFÉ
==================================================

1️⃣ Carregando dataset...
✅ Dataset carregado: 1749 imagens

📊 ANÁLISE DO DATASET:
Total de imagens: 1749
🌿 Folhas saudáveis: 523 (29.9%)
🦠 Folhas doentes: 1226 (70.1%)
📈 Severidade: {0: 523, 1: 456, 2: 389, 3: 381}

2️⃣ Carregando modelo YOLO...
✅ Modelo YOLO carregado: yolov8n.pt

3️⃣ Testando modelo...
🔍 TESTANDO 3 IMAGENS:
...
```

## 🤝 Contribuição

Este é um sistema simplificado para demonstração. Para melhorias:

1. Adicione validação de entrada
2. Implemente cache de modelo
3. Adicione suporte a múltiplos formatos de imagem
4. Crie testes automatizados
