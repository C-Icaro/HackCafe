#!/usr/bin/env python3
"""
Detector de Doenças em Folhas de Café - Versão Simplificada
Usa YOLO v8 para detecção automática de doenças
"""

import os
import cv2
import numpy as np
import pandas as pd
from ultralytics import YOLO
import matplotlib.pyplot as plt

class CoffeeDiseaseDetector:
    def __init__(self, model_path='yolov8n.pt', dataset_path=None):
        """Inicializa o detector"""
        # Determina o caminho base do script atual
        script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Define caminhos padrão baseados na localização do script
        if dataset_path is None:
            self.dataset_path = os.path.join(script_dir, 'coffee-datasets', 'leaf')
        else:
            self.dataset_path = dataset_path
            
        if not os.path.isabs(model_path):
            self.model_path = os.path.join(script_dir, model_path)
        else:
            self.model_path = model_path
            
        self.model = None
        self.dataset_df = None
        
    def load_dataset(self):
        """Carrega o dataset CSV"""
        try:
            dataset_file = os.path.join(self.dataset_path, 'dataset.csv')
            self.dataset_df = pd.read_csv(dataset_file)
            print(f"✅ Dataset carregado: {len(self.dataset_df)} imagens")
            return True
        except Exception as e:
            print(f"❌ Erro ao carregar dataset: {e}")
            return False
    
    def load_model(self):
        """Carrega o modelo YOLO"""
        try:
            self.model = YOLO(self.model_path)
            print(f"✅ Modelo YOLO carregado: {self.model_path}")
            return True
        except Exception as e:
            print(f"❌ Erro ao carregar modelo: {e}")
            return False
    
    def predict_image(self, image_path, confidence=0.5):
        """Faz predição em uma imagem"""
        if self.model is None:
            print("❌ Modelo não carregado!")
            return None
        
        try:
            results = self.model.predict(source=image_path, conf=confidence, save=False)
            return results
        except Exception as e:
            print(f"❌ Erro na predição: {e}")
            return None
    
    def analyze_dataset(self):
        """Mostra estatísticas básicas do dataset"""
        if self.dataset_df is None:
            print("❌ Dataset não carregado!")
            return
        
        print("\n📊 ANÁLISE DO DATASET:")
        print(f"Total de imagens: {len(self.dataset_df)}")
        
        # Conta folhas saudáveis vs doentes
        healthy = len(self.dataset_df[self.dataset_df['severity'] == 0])
        diseased = len(self.dataset_df) - healthy
        
        print(f"🌿 Folhas saudáveis: {healthy} ({healthy/len(self.dataset_df)*100:.1f}%)")
        print(f"🦠 Folhas doentes: {diseased} ({diseased/len(self.dataset_df)*100:.1f}%)")
        
        # Distribuição de severidade
        severity_counts = self.dataset_df['severity'].value_counts().sort_index()
        print(f"📈 Severidade: {dict(severity_counts)}")
    
    def test_random_images(self, num_images=3):
        """Testa o modelo em imagens aleatórias do dataset"""
        if self.dataset_df is None or self.model is None:
            print("❌ Dataset ou modelo não carregado!")
            return
        
        images_dir = os.path.join(self.dataset_path, 'images')
        if not os.path.exists(images_dir):
            print(f"❌ Diretório de imagens não encontrado: {images_dir}")
            return
        
        # Seleciona imagens aleatórias
        sample_images = self.dataset_df.sample(min(num_images, len(self.dataset_df)))
        
        print(f"\n🔍 TESTANDO {len(sample_images)} IMAGENS:")
        
        for idx, row in sample_images.iterrows():
            image_id = row['id']
            image_file = f"{image_id}.jpg"
            image_path = os.path.join(images_dir, image_file)
            
            if os.path.exists(image_path):
                print(f"\n--- Imagem {image_id} ---")
                print(f"Labels: Severidade={row['severity']}, Estresse={row['predominant_stress']}")
                
                # Faz predição
                results = self.predict_image(image_path)
                if results:
                    self._print_detections(results)
            else:
                print(f"⚠️ Imagem {image_file} não encontrada")
    
    def _print_detections(self, results):
        """Imprime resultados das detecções"""
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                print(f"🔍 YOLO detectou {len(boxes)} objetos:")
                for i, box in enumerate(boxes):
                    conf = box.conf[0].cpu().numpy()
                    cls = int(box.cls[0].cpu().numpy())
                    print(f"   Objeto {i+1}: Classe {cls}, Confiança {conf:.3f}")
            else:
                print("🔍 Nenhum objeto detectado")
    
    def show_image_with_detections(self, image_path, results):
        """Mostra imagem com detecções marcadas"""
        try:
            img = cv2.imread(image_path)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            
            plt.figure(figsize=(10, 8))
            plt.imshow(img)
            
            # Adiciona detecções se houver
            if results and len(results) > 0:
                result = results[0]
                if result.boxes is not None:
                    for box in result.boxes:
                        coords = box.xyxy[0].cpu().numpy()
                        conf = box.conf[0].cpu().numpy()
                        cls = int(box.cls[0].cpu().numpy())
                        
                        # Desenha retângulo
                        x1, y1, x2, y2 = coords.astype(int)
                        rect = plt.Rectangle((x1, y1), x2-x1, y2-y1, 
                                           fill=False, color='red', linewidth=2)
                        plt.gca().add_patch(rect)
                        
                        # Adiciona texto
                        plt.text(x1, y1-10, f'Classe {cls} ({conf:.2f})', 
                                color='red', fontsize=10, weight='bold')
            
            plt.title(f"Detecções em {os.path.basename(image_path)}")
            plt.axis('off')
            plt.tight_layout()
            plt.show()
            
        except Exception as e:
            print(f"❌ Erro na visualização: {e}")
