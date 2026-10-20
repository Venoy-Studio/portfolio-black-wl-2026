# Black WL 2026 — Landing Page Clone

Clone completo da landing page da campanha **Black WL 2026** (WL Colchões), com todos os recursos locais, mídias integradas, interações ativas e dados de contato alterados para dados fictícios.

---

## 📱 Dados de Contato Fictícios Utilizados

Todos os números de contato reais da empresa original foram substituídos por informações fictícias de demonstração:

- **WhatsApp**: `+55 (81) 99999-0000` (`https://wa.me/5581999990000`)
- **E-mail de Atendimento**: `contato@wlcolchoes-ficticio.com.br`
- **Horário de Atendimento**: Segunda a Sexta, das 08h às 18h
- **Formulário de Inscrição na Lista**: Ao preencher o formulário, os dados formatados são direcionados automaticamente para o WhatsApp fictício com mensagem pré-configurada.

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (v18+)

### Iniciar o servidor local
No terminal do projeto, execute:

```bash
npm start
# ou
npm run dev
# ou
node server.js
```

Acesse no navegador:
- **Landing Page**: [http://localhost:3000/](http://localhost:3000/) (ou [http://localhost:3000/black-wl-2026](http://localhost:3000/black-wl-2026))
- **Política de Privacidade**: [http://localhost:3000/politica-de-privacidade](http://localhost:3000/politica-de-privacidade)

---

## 🛠️ Recursos e Funcionalidades Incluídas

- **100% Autônomo e Local**: Todos os assets (imagens WebP/AVIF, fontes WOFF2, estilos CSS e vídeos MP4 com legendas VTT) foram baixados e são servidos diretamente do servidor local.
- **Player de Vídeo e Streaming Range**: O servidor Node.js suporta *HTTP 206 Partial Content*, permitindo streaming de vídeo suave nos navegadores desktop e mobile.
- **Diagnóstico Técnico Interativo**: Abas no desktop e accordions no mobile para explorar os diferentes desgastes (Afundamento central, Perda de sustentação, Espuma deformada, Molas instáveis, Tecido rasgado).
- **Cards de Avaliações 3D**: Efeito de giro (*flip*) 3D para exibir o comprovante original do WhatsApp.
- **Carrossel de Casos Reais**: Alternância fluida entre os vídeos e fotos de antes/depois.
- **Formulário com Máscara e Validação**: Campo com máscara automática `(XX) XXXXX-XXXX` e redirecionamento dinâmico para WhatsApp.
