# Website Architecture Document (WAD)

## 1. Introdução

&nbsp;&nbsp;&nbsp;&nbsp;A plataforma web é o ponto de contato do agricultor com a sua plantação. Nela ele terá a sua disposição um dashboard de amostragem dos dados coletados pelas unidades de campo.

---

## 2. Visão Geral
- **Tipo de aplicação:** Web
- **Tecnologias principais:** React e TailwindCSS
- **Público-alvo:** Agricultor de café de montanha

---

## 3. Escopo
**Inclui:**
- Dashboard com dados coletados
- Autenticação de usuários
- API para integração com o dispositivo
- Web app para celulares

**Não inclui (no momento):**
- Aplicativo mobile dedicado
- Processamento offline

---

## 4. Arquitetura
### 4.1. Diagrama da Plataforma
*(Inserir diagrama de blocos da arquitetura web)*

### 4.2. Componentes Principais
| Componente | Função | Tecnologias |
|------------|--------|-------------|
| Frontend | Interface do usuário | React, TailwindCSS |
| Backend/API | Processamento e integração | Node.js, Express |
| Banco de Dados | Armazenamento persistente | Supabase |
| Serviços Externos | Envio de notificações | Firebase Cloud Messaging |

---

## 5. Comunicação
- **Protocolo:** HTTP/HTTPS, WebSockets  
- **Formato:** JSON  
- **Endpoints principais:**  
  - `GET /api/dados`
  - `POST /api/login`

---

## 6. Frontend
- Estrutura de pastas  
- Principais componentes  
- Rotas e navegação

---

## 7. Backend
- Arquitetura da API  
- Principais serviços  
- Estratégias de segurança (JWT, TLS)

---

## 8. Banco de Dados
- Modelo lógico e físico  
- Principais tabelas  
- Índices e otimizações

---

## 9. Integração com IoT
- Endpoints para receber dados  
- Processamento em tempo real  
- Armazenamento histórico

---

## 10. Plano de Evolução
- Adicionar controle dos dispositivos de campo por meio da plataforma web 

---

## 11. Anexos
- Diagramas  
- Capturas de tela  
- Links para protótipos
