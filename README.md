# ⚡ DevFlow - Sua Produtividade Vira Poder

O **DevFlow** é uma aplicação de foco e produtividade gamificada, focada em desenvolvedores que desejam transformar horas de estudo em conquistas. Utilize a técnica Pomodoro, acumule XP e desbloqueie mentores lendários da história da tecnologia!

---

## 🚀 Demonstração

O projeto está disponível online! Confira aqui:
👉 [LINK_DO_SEU_SITE_NO_GITHUB_PAGES](https://stellag2003.github.io/DevFlow/)

---

## 🧠 Sobre o Projeto

O DevFlow nasceu da ideia de que estudar programação pode ser tão recompensador quanto um RPG. Através de missões de foco, o usuário gerencia seu tempo e aprende sobre figuras históricas que revolucionaram o mundo da computação.

### ✨ Funcionalidades Principais:

* **Timer de Foco (Pomodoro):** Escolha seu tempo de missão e mantenha o foco total.
* **Sistema de XP e Nível:** Cada minuto focado se transforma em experiência para o seu perfil.
* **Hall of Fame:** Conheça a história de lendas como Ada Lovelace, Alan Turing e Margaret Hamilton.
* **Mentoria Dinâmica:** Recrute mentores baseados no seu XP para receber frases motivacionais durante o uso.
* **Persistência de Dados:** Integração com API para salvar seu progresso e conquistas.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **React + Vite:** Para uma interface rápida e reativa.
* **TypeScript:** Garantindo tipagem segura e melhor experiência de desenvolvimento.
* **Axios:** Para consumo da API de mentores e usuários.
* **JSON Server:** Simulando um backend completo para persistência de dados.
* **SweetAlert2:** Modais elegantes e interativos para avisos e conquistas.
* **CSS Modules:** Estilização isolada e organizada por componentes.

---

## 🗄️ Estrutura da API

A aplicação consome uma API hospedada no **Render**, utilizando o `json-server`. 
* **Endpoints:** `/users`, `/mentors`.
* **Nota:** Por estar no plano gratuito, a API pode levar cerca de 30 segundos para "despertar" no primeiro login.

---

## 🎨 Layout e Estilo

O estilo visual segue uma temática **Cyberpunk/Retro**, com cores vibrantes (roxo, laranja e neon) e fontes pixeladas para remeter aos consoles clássicos.

---

## 👩‍💻 Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/stellag2003/DevFlow.git](https://github.com/stellag2003/DevFlow.git)
``

2. Instale as dependências

   ```
   npm install

    ```

3. Inicie a API (Mock):
Em um terminal separado, você pode rodar o json-server para testar localmente:

bash
```
npx json-server --watch db.json --port 3000
```

4.Inicie o App:

bash
```
npm run dev

```



   
