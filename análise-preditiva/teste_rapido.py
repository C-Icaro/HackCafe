#!/usr/bin/env python3
"""
Teste Rápido - Verifica se o sistema simplificado está funcionando
"""

from detector import CoffeeDiseaseDetector
import os

def teste_rapido():
    """Teste básico do sistema"""
    print("🧪 TESTE RÁPIDO DO SISTEMA")
    print("=" * 40)
    
    # 1. Testa inicialização
    print("1️⃣ Inicializando detector...")
    try:
        detector = CoffeeDiseaseDetector()
        print("✅ Detector inicializado com sucesso")
    except Exception as e:
        print(f"❌ Erro na inicialização: {e}")
        return False
    
    # 2. Testa carregamento do dataset
    print("\n2️⃣ Carregando dataset...")
    try:
        if detector.load_dataset():
            print("✅ Dataset carregado com sucesso")
        else:
            print("❌ Falha ao carregar dataset")
            return False
    except Exception as e:
        print(f"❌ Erro ao carregar dataset: {e}")
        return False
    
    # 3. Testa carregamento do modelo
    print("\n3️⃣ Carregando modelo YOLO...")
    try:
        if detector.load_model():
            print("✅ Modelo YOLO carregado com sucesso")
        else:
            print("❌ Falha ao carregar modelo")
            return False
    except Exception as e:
        print(f"❌ Erro ao carregar modelo: {e}")
        return False
    
    # 4. Testa análise do dataset
    print("\n4️⃣ Analisando dataset...")
    try:
        detector.analyze_dataset()
        print("✅ Análise do dataset concluída")
    except Exception as e:
        print(f"❌ Erro na análise: {e}")
        return False
    
    # 5. Testa predição em uma imagem
    print("\n5️⃣ Testando predição...")
    try:
        # Procura uma imagem para testar
        images_dir = os.path.join(detector.dataset_path, 'images')
        if os.path.exists(images_dir):
            images = [f for f in os.listdir(images_dir) if f.endswith('.jpg')]
            if images:
                test_image = os.path.join(images_dir, images[0])
                print(f"📸 Testando com: {images[0]}")
                
                results = detector.predict_image(test_image)
                if results is not None:
                    print("✅ Predição realizada com sucesso")
                    detector._print_detections(results)
                else:
                    print("⚠️ Predição retornou None (pode ser normal)")
            else:
                print("⚠️ Nenhuma imagem encontrada para teste")
        else:
            print("⚠️ Diretório de imagens não encontrado")
    except Exception as e:
        print(f"❌ Erro na predição: {e}")
        return False
    
    print("\n" + "=" * 40)
    print("🎉 TESTE CONCLUÍDO COM SUCESSO!")
    print("=" * 40)
    print("✅ Sistema funcionando perfeitamente")
    print("✅ Pode executar: python main.py")
    return True

if __name__ == "__main__":
    try:
        teste_rapido()
    except Exception as e:
        print(f"\n❌ Erro inesperado no teste: {e}")
        print("Verifique se todas as dependências estão instaladas:")
        print("pip install -r requirements.txt")
