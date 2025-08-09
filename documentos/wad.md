# Website Architecture Document (WAD)

## 1. Introdução
Breve descrição da plataforma web, propósito e relação com o dispositivo IoT (se houver).

**Exemplo:**  
A plataforma web é responsável por exibir, processar e gerenciar dados recebidos do dispositivo IoT, oferecendo interface para usuários e administradores.

---

## 2. Visão Geral
- **Tipo de aplicação:** (SPA, SSR, PWA etc.)  
- **Tecnologias principais:** (React, Node.js, Flask, etc.)  
- **Público-alvo:** (usuários finais, administradores, técnicos)

---

## 3. Escopo
**Inclui:**
- Dashboard em tempo real
- Autenticação de usuários
- API para integração com o dispositivo

**Não inclui:**
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
| Banco de Dados | Armazenamento persistente | PostgreSQL |
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

## 10. Testes
- Testes unitários e de integração  
- Ferramentas usadas (Jest, Cypress etc.)

---

## 11. Plano de Evolução
Funcionalidades previstas para próximas versões

---

## 12. Anexos
- Diagramas  
- Capturas de tela  
- Links para protótipos
