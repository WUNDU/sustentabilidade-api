Aqui está o README editado com as informações necessárias, incluindo os links do Netlify (frontend) e do backend (Render ou Railway), além de destacar o uso do Express e JavaScript:

---

<p align="center">
  <a href="" rel="noopener">
    <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo">
  </a>
</p>

<h3 align="center">EcoTrack - API Sustentável 🌍</h3>

<div align="center">

</div>

---

<p align="center">
  O EcoTrack é uma API RESTful que incentiva ações sustentáveis relacionadas ao ODS 12 - Consumo e Produção Sustentáveis. Com autenticação JWT, CRUD completo e um sistema de pontuação, o projeto visa promover hábitos sustentáveis de forma interativa e gamificada.
  <br>
</p>

## 📝 Índice

- [Sobre](#about)
- [Começando](#getting_started)
- [Deploy](#deployment)
- [Uso](#usage)
- [Tecnologias Utilizadas](#built_using)
- [Autores](#authors)
- [Agradecimentos](#acknowledgement)

## 🧐 Sobre <a name = "about"></a>

O EcoTrack é um projeto desenvolvido para incentivar ações sustentáveis, como reciclagem, economia de energia e água, e mobilidade sustentável. A API permite que os usuários cadastrem ações, acumulem pontos e acompanhem seu progresso em direção a um estilo de vida mais sustentável.

O frontend, hospedado no Netlify, oferece uma interface simples para interagir com a API, enquanto o backend, construído com Express e JavaScript, gerencia a lógica de autenticação, CRUD e pontuação.

## 🏁 Começando <a name = "getting_started"></a>

Siga as instruções abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (local ou MongoDB Atlas)
- Contas no [Netlify](https://www.netlify.com/) e [Render](https://render.com/) (ou Railway) para deploy.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/WUNDU/sustentabilidade-api.git
   cd sustentabilidade-api
   ```

2. Instale as dependências do backend:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:
   ```env
   PORT=3000
   MONGODB_URI=sua-string-de-conexao-mongodb
   JWT_SECRET=seu-segredo-jwt
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

5. Para o frontend, abra o arquivo `index.html` no navegador ou faça o deploy no Netlify.

## 🔧 Executando os Testes <a name = "tests"></a>

Para executar os testes automatizados, utilize o seguinte comando:
```bash
npm test
```

## 🎈 Uso <a name="usage"></a>

- **Frontend**: Acesse o site hospedado no Netlify para interagir com a API.
  - [Link do Frontend no Netlify](https://seu-link-netlify.com)

- **Backend**: A API está disponível no Render (ou Railway) e pode ser acessada via Swagger.
  - [Link do Backend no Render](https://seu-link-render.com)
  - [Documentação da API com Swagger](https://seu-link-render.com/api-docs)

## 🚀 Deploy <a name = "deployment"></a>

- **Frontend**: Hospedado no Netlify. Para fazer o deploy, conecte seu repositório ao Netlify e configure o build.
- **Backend**: Hospedado no Render (ou Railway). Siga as instruções da plataforma para fazer o deploy do servidor Express.

## ⛏️ Tecnologias Utilizadas <a name = "built_using"></a>

- **Backend**:
  - [Express](https://expressjs.com/) - Framework para construir a API.
  - [MongoDB](https://www.mongodb.com/) - Banco de dados para armazenar ações e usuários.
  - [JWT](https://jwt.io/) - Autenticação de usuários.
  - [Swagger](https://swagger.io/) - Documentação da API.

- **Frontend**:
  - HTML, Tailwind CSS (via CDN) - Interface do usuário.
  - JavaScript - Interação com a API.

## ✍️ Autores <a name = "authors"></a>

- [@Wundu](https://github.com/WUNDU/sustentabilidade-api.git) - Desenvolvimento e documentação.

## 🎉 Agradecimentos <a name = "acknowledgement"></a>

- Mirantes
- Agradecimentos às plataformas Netlify e Render por fornecerem hospedagem gratuita.

---

