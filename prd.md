# MiniProjeto M4 - Programadores do Amanhã

**Autora:** Stella Gonçalves Mendonça  
**Local:** São Carlos – SP  
**Ano:** 2026  

---

## 1. Problema

Estudantes iniciantes na área de tecnologia enfrentam dificuldades em manter consistência nos estudos, principalmente devido à falta de foco e disciplina no cotidiano.

A ausência de consistência impacta diretamente no progresso do estudante, tornando o aprendizado mais lento, aumentando as chances de desistência e dificultando a entrada no mercado de trabalho na área de tecnologia.

O público-alvo são estudantes iniciantes em tecnologia, especialmente aqueles que estudam de forma autônoma por meio de cursos online e não possuem uma rotina estruturada de estudos.

---

## 2. Soluções

O sistema propõe a implementação de uma sessão de foco baseada em tempo, permitindo que o usuário realize períodos controlados de estudo.

Além disso, será implementado um sistema de pontuação (XP), no qual o usuário acumula pontos ao concluir sessões de estudo, promovendo engajamento por meio de gamificação.

O sistema também contará com um mecanismo de sequência de dias consecutivos de estudo (streak), incentivando a consistência diária.

O sistema contará com um **Hall da Fama**, onde o usuário poderá visualizar e escolher mentores inspirados em figuras importantes da tecnologia.

Cada mentor possui mensagens motivacionais próprias, incentivando o usuário durante sua jornada de estudos e tornando a experiência mais personalizada.

---

## 3. Decisões Técnicas

A aplicação utiliza uma API simulada por meio do JSON Server, permitindo operações básicas de persistência de dados.

As principais entidades da aplicação são:

### User
- id  
- username  
- name  
- level  
- xp  
- streak  
- requiredXp  

### Mentor
- id  
- name  
- role  
- xpRequired  
- avatar  
- bio  
- messages  

As operações da API incluem:

- `GET /users` → buscar usuários  
- `POST /users` → criar usuário  
- `PATCH /users/:id` → atualizar XP, nível e streak  

- `GET /mentors` → listar mentores disponíveis  

---

## 4. Mentores (Hall da Fama)

O sistema conta com mentores inspirados em figuras históricas da tecnologia, cada um com personalidade, história e mensagens próprias.

Os mentores disponíveis são:

- Ada Lovelace — Mãe da Programação  
- Alan Turing — Pai da Computação  
- Grace Hopper — Rainha do COBOL  
- Margaret Hamilton — Diretora da Apollo 11  
- Hedy Lamarr — Mãe do Wi-Fi  

Cada mentor possui:

- Mini biografia  
- Avatar personalizado  
- Requisito mínimo de XP para desbloqueio  
- Lista de mensagens motivacionais  

Essa funcionalidade tem como objetivo aumentar o engajamento do usuário, criando uma experiência mais imersiva e inspiradora durante os estudos.

---
