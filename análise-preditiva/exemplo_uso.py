#!/usr/bin/env python3
"""
Exemplo de Uso - CoffeeDiseaseDetector
Demonstra como usar a classe de forma programática
"""

from detector import CoffeeDiseaseDetector
import os

def exemplo_basico():
    """Exemplo básico de uso"""
    print("🍃 EXEMPLO BÁSICO DE USO")
    print("=" * 40)
    
    # 1. Cria instância do detector
    detector = CoffeeDiseaseDetector()
    
    # 2. Carrega dataset
    print("Carregando dataset...")
    detector.load_dataset()
    
    # 3. Carrega modelo YOLO
    print("Carregando modelo...")
    detector.load_model()
    
    # 4. Analisa dataset
    detector.analyze_dataset()
    
    print("\n✅ Exemplo básico concluído!")

def exemplo_predicao():
    """Exemplo de predição em imagens"""
    print("\n🔍 EXEMPLO DE PREDIÇÃO")
    print("=" * 40)
    
    detector = CoffeeDiseaseDetector()
    detector.load_dataset()
    detector.load_model()
    
    # Procura imagens para testar
    images_dir = os.path.join(detector.dataset_path, 'images')
    if os.path.exists(images_dir):
        images = [f for f in os.listdir(images_dir) if f.endswith('.jpg')][:3]
        
        for img_name in images:
            img_path = os.path.join(images_dir, img_name)
            print(f"\n📸 Processando: {img_name}")
            
            # Faz predição
            results = detector.predict_image(img_path, confidence=0.3)
            if results:
                detector._print_detections(results)
            else:
                print("Nenhuma detecção")

def exemplo_personalizado():
    """Exemplo com configurações personalizadas"""
    print("\n⚙️ EXEMPLO PERSONALIZADO")
    print("=" * 40)
    
    # Cria detector com caminhos personalizados
    detector = CoffeeDiseaseDetector(
        model_path='yolov8n.pt',
        dataset_path='coffee-datasets/leaf/'
    )
    
    # Carrega componentes
    detector.load_dataset()
    detector.load_model()
    
    # Testa com diferentes níveis de confiança
    images_dir = os.path.join(detector.dataset_path, 'images')
    if os.path.exists(images_dir):
        test_image = os.path.join(images_dir, "1.jpg")
        
        if os.path.exists(test_image):
            print(f"Testando {test_image} com diferentes confianças:")
            
            for conf in [0.1, 0.3, 0.5, 0.7]:
                print(f"\nConfiança: {conf}")
                results = detector.predict_image(test_image, confidence=conf)
                if results:
                    detector._print_detections(results)

def exemplo_estatisticas():
    """Exemplo de análise estatística"""
    print("\n📊 EXEMPLO DE ESTATÍSTICAS")
    print("=" * 40)
    
    detector = CoffeeDiseaseDetector()
    detector.load_dataset()
    
    # Análise básica
    detector.analyze_dataset()
    
    # Análise adicional manual
    if detector.dataset_df is not None:
        df = detector.dataset_df
        
        print(f"\n📈 ESTATÍSTICAS DETALHADAS:")
        print(f"Total de imagens: {len(df)}")
        
        # Conta por doença
        diseases = ['miner', 'rust', 'phoma', 'cercospora']
        for disease in diseases:
            if disease in df.columns:
                counts = df[disease].value_counts()
                print(f"{disease}: {dict(counts)}")
        
        # Conta por estresse
        if 'predominant_stress' in df.columns:
            stress_counts = df['predominant_stress'].value_counts().sort_index()
            print(f"Estresse predominante: {dict(stress_counts)}")

if __name__ == "__main__":
    print("🚀 EXEMPLOS DE USO - CoffeeDiseaseDetector")
    print("=" * 50)
    
    try:
        # Executa exemplos
        exemplo_basico()
        exemplo_predicao()
        exemplo_personalizado()
        exemplo_estatisticas()
        
        print("\n" + "=" * 50)
        print("🎉 TODOS OS EXEMPLOS EXECUTADOS COM SUCESSO!")
        print("=" * 50)
        print("💡 Agora você pode usar a classe em seus próprios projetos!")
        
    except Exception as e:
        print(f"\n❌ Erro durante execução: {e}")
        print("Verifique se todas as dependências estão instaladas:")
        print("pip install -r requirements.txt")
