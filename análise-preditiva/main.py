#!/usr/bin/env python3
"""
Script Principal - Detector de Doenças em Folhas de Café
Versão simplificada e organizada
"""

from detector import CoffeeDiseaseDetector
import os

def main():
    """Função principal"""
    print("🍃 DETECTOR DE DOENÇAS EM FOLHAS DE CAFÉ")
    print("=" * 50)
    
    # Inicializa detector
    detector = CoffeeDiseaseDetector()
    
    # 1. Carrega dataset
    print("\n1️⃣ Carregando dataset...")
    if not detector.load_dataset():
        print("❌ Falha ao carregar dataset. Verifique se o arquivo existe.")
        return
    
    # 2. Analisa dataset
    detector.analyze_dataset()
    
    # 3. Carrega modelo YOLO
    print("\n2️⃣ Carregando modelo YOLO...")
    if not detector.load_model():
        print("❌ Falha ao carregar modelo. Verifique se yolov8n.pt existe.")
        return
    
    # 4. Testa modelo em imagens aleatórias
    print("\n3️⃣ Testando modelo...")
    detector.test_random_images(num_images=3)
    
    # 5. Menu interativo
    show_menu(detector)

def show_menu(detector):
    """Mostra menu interativo"""
    while True:
        print("\n" + "=" * 50)
        print("📋 MENU PRINCIPAL")
        print("=" * 50)
        print("1. Analisar dataset")
        print("2. Testar modelo em imagens aleatórias")
        print("3. Testar imagem específica")
        print("4. Mostrar imagem com detecções")
        print("5. Sair")
        
        choice = input("\nEscolha uma opção (1-5): ").strip()
        
        if choice == "1":
            detector.analyze_dataset()
        
        elif choice == "2":
            num = input("Quantas imagens testar? (padrão: 3): ").strip()
            try:
                num = int(num) if num else 3
                detector.test_random_images(num_images=num)
            except ValueError:
                print("❌ Número inválido. Usando padrão: 3")
                detector.test_random_images(num_images=3)
        
        elif choice == "3":
            test_specific_image(detector)
        
        elif choice == "4":
            show_image_with_detections(detector)
        
        elif choice == "5":
            print("👋 Saindo...")
            break
        
        else:
            print("❌ Opção inválida!")

def test_specific_image(detector):
    """Testa uma imagem específica"""
    print("\n📸 TESTE DE IMAGEM ESPECÍFICA")
    
    # Lista algumas imagens disponíveis
    images_dir = os.path.join(detector.dataset_path, 'images')
    if os.path.exists(images_dir):
        available_images = [f for f in os.listdir(images_dir) if f.endswith('.jpg')][:10]
        print(f"Imagens disponíveis (primeiras 10): {available_images}")
    
    image_name = input("Digite o nome da imagem (ex: 1.jpg): ").strip()
    if not image_name.endswith('.jpg'):
        image_name += '.jpg'
    
    image_path = os.path.join(images_dir, image_name)
    
    if os.path.exists(image_path):
        print(f"🔍 Testando {image_name}...")
        results = detector.predict_image(image_path)
        if results:
            detector._print_detections(results)
            
            # Pergunta se quer visualizar
            show = input("Mostrar imagem com detecções? (s/n): ").strip().lower()
            if show in ['s', 'sim', 'y', 'yes']:
                detector.show_image_with_detections(image_path, results)
    else:
        print(f"❌ Imagem {image_name} não encontrada!")

def show_image_with_detections(detector):
    """Mostra imagem com detecções marcadas"""
    print("\n🖼️ VISUALIZAÇÃO DE IMAGEM")
    
    image_name = input("Digite o nome da imagem (ex: 1.jpg): ").strip()
    if not image_name.endswith('.jpg'):
        image_name += '.jpg'
    
    image_path = os.path.join(detector.dataset_path, 'images', image_name)
    
    if os.path.exists(image_path):
        print(f"🔍 Processando {image_name}...")
        results = detector.predict_image(image_path)
        if results:
            detector.show_image_with_detections(image_path, results)
        else:
            print("❌ Falha ao processar imagem")
    else:
        print(f"❌ Imagem {image_name} não encontrada!")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Programa interrompido pelo usuário")
    except Exception as e:
        print(f"\n❌ Erro inesperado: {e}")
        print("Verifique se todas as dependências estão instaladas:")
        print("pip install ultralytics opencv-python pandas matplotlib numpy")
