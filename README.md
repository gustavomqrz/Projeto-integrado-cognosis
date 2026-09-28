# Projeto-integrado-cognosis

`gamificação` `aprendizagem` `educação` `mapa interativo` `UFC` `Sistemas e Mídias Digitais`
 
---
 
## Índice
 
1. [Sobre](#sobre)
2. [Imagens e Vídeos Ilustrativos](#imagens-e-vídeos-ilustrativos)
3. [Equipe](#equipe)
4. [Tecnologias](#tecnologias)
5. [Licença](#licença)
6. [Como Rodar](#como-rodar)
7. [Requisitos Funcionais](#requisitos-funcionais)
8. [Link para o Relatório](#link-para-o-relatório)
---
 
## Sobre
 
O objetivo do nosso projeto é a modernização do site (Cognosis) estático da disciplina de Cognição e Tecnologias Digitais (curso de Sistemas e Mídias Digitais, UFC), transformando um repositório de arquivos em uma aplicação web interativa e gamificada.
 
Os conteúdos teóricos são apresentados por meio de reinos temáticos: o usuário escolhe um reino em um carrossel e explora o mapa dele, clicando em pontos de interesse para ver textos e vídeos. O acesso dos alunos matriculados é validado e registrado em uma planilha controlada pelo professor.

## Imagens e Vídeos Ilustrativos
 
Prints serão adicionados futuramente
 
## Equipe
 
| Nome | Função |
|---|---|
| Anna Clara | Designer |
| Gustavo Marques | Gerente de projeto |
| Jonas Ferreira | Designer |
| José Eduardo | Programador |
| José Guilherme | Programador |
| Yuri Holanda | Engenheiro UX/UI |
 
## Tecnologias

Front-end:
- HTML
- CSS
- JavaScript
  
Back-end:
- Google Sheets + Google Apps Script (validação de matrícula e registro de acessos)

## Licença
 
Este projeto está sob a licença GPL v3.

Imagens, logotipos e demais materiais visuais (como os brasões da CTD e da UFC, além das artes da equipe) não são cobertos por esta licença e pertencem aos seus respectivos autores.

## Como Rodar

### Pré-requisitos
 
- Um navegador atual (Chrome, Edge, Firefox...)
- Uma das opções para servir os arquivos localmente: a extensão **Live Server** do VS Code, [Python 3](https://www.python.org/) ou [Node.js](https://nodejs.org/)
- Uma conta Google, para criar a planilha usada no login (passo 2)
  
### Passo a passo
 
1. Clone o repositório e entre na pasta:
```bash
   git clone https://github.com/SEU-USUARIO/Projeto-integrado-cognosis.git
   cd Projeto-integrado-cognosis
```
 
2. Configure o login (a planilha do Google funciona como o back-end do projeto):
   1. Crie uma planilha no Google Sheets com duas abas de nomes exatos:
      - **Alunos:** linha 1 com o cabeçalho (`Matrícula` e `Aluno`); a partir da linha 2, coluna A = matrícula e coluna B = nome do aluno.
      - **Acessos:** deixe vazia, com o cabeçalho na linha 1 (`Nome`, `Matrícula`, `Tipo`, `Data`, `Horário`). O script grava cada acesso a partir da linha 2.
   2. Na planilha, abra **Extensões > Apps Script**, apague o conteúdo padrão e cole o código do arquivo `Codigo.gs`.
   3. Clique em **Implantar > Nova implantação**, escolha o tipo **App da Web**, com **Executar como: Eu** e **Quem pode acessar: Qualquer pessoa**.
   4. Copie a URL gerada (termina em `/exec`) e cole na constante `URL_SCRIPT_LOGIN`, no topo de `js/login.js`.
        
3. Inicie um servidor local. Recomendamos o **Live Server** do VS Code por ser o mais simples: abra a pasta no VS Code e clique em **Go Live**. Também é possível usar Python ou Node:
```bash
   # Python
   python -m http.server 8000
 
   # ou Node.js
   npx serve
```
 
4. Acesse o site no navegador. O endereço depende da opção escolhida:
   | Opção | Endereço |
   |---|---|
   | Live Server | `http://127.0.0.1:5500/login.html` |
   | Python | `http://localhost:8000/login.html` |
   | Node (`npx serve`) | `http://localhost:3000/login.html` |
   
   Pronto: a aplicação estará rodando e a planilha registrará os acessos.

> **Observações:**
>  Não abra os arquivos com duplo clique. O site usa módulos JavaScript (`import`), que os navegadores bloqueiam quando a página não está hospedada em um servidor.
>  sempre que alterar o `Codigo.gs`, publique uma **nova versão** da implantação no Apps Script para a mudança valer na URL, ou então a aplicação continuará usando o script antigo.

## Requisitos Funcionais
 
| ID | Descrição | Prioridade | Estado |
|---|---|---|---|
| RF01 | Tela inicial de login com opção de aluno (matrícula) ou visitante | Alta | Finalizado |
| RF02 | Autenticação do aluno somente por número de matrícula, sem senha | Alta | Finalizado |
| RF03 | Validação automatizada da matrícula digitada contra a planilha de alunos fornecida pelo professor | Alta | Finalizado |
| RF04 | Acesso de visitante a conteúdos públicos sem necessidade de matrícula | Alta | Finalizado |
| RF05 | Registro automático de cada acesso (nome, matrícula, tipo de usuário, data e horário) | Média | Finalizado |
| RF06 | Diferenciação do tipo de acesso registrado: "Aluno" (matrícula validada) ou "Visitante" | Média | Finalizado |
| RF07 | Exibição de mensagem de erro quando a matrícula não é encontrada na planilha | Alta | Finalizado |
| RF08 | Tela de carrossel exibindo os reinos/capítulos disponíveis, um por vez | Alta | Em andamento |
| RF09 | Navegação entre reinos por setas laterais (anterior/próximo) | Alta | Finalizado |
| RF10 | Indicadores visuais mostrando a posição atual no carrossel de reinos | Média | Finalizado |
| RF11 | Efeito de zoom ao selecionar um reino, levando à tela do mapa daquele reino | Média | Finalizado |
| RF12 | Mapa interativo por reino, com locais/pontos de interesse posicionados sobre a imagem | Alta | Em andamento |
| RF13 | Painel de informação exibido ao clicar num local do mapa, com suporte a texto | Alta | Finalizado |
| RF14 | Suporte a vídeo incorporado | Média | Finalizado |
| RF15 | Botão de retorno da tela do mapa para a tela de seleção de reinos | Alta | Finalizado |
| RF16 | Menu "Sobre" explicando o propósito do site/disciplina | Baixa | Finalizado |
| RF17 | Layout responsivo adaptável a diferentes tamanhos de tela | Média | A fazer |
| RF18 | Imagens em órbita na tela de login com links externos (ex: Instagram do Cognosis e da equipe) | Baixa | Finalizado |
| RF19 | Fechamento do painel de informação (botão "X" ou clique fora) com retorno ao mapa | Média | Finalizado |
| RF20 | Barras de progresso para sinalizar a progressão do usuário pelo conteúdo | Média | A fazer |

## Link para o Relatório Final

Link para o relatório final será adicionado posteriormente

