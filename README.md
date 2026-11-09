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
 
1. Clonar o repositório

Abra o terminal e clone o repositório do projeto:

```bash
git clone https://github.com/SEU-USUARIO/Projeto-integrado-cognosis.git
```
ou

Faça o download dos arquivos diretamente pela página do repositório no github clicando no botão verde escrito <>code e então na opção Download ZIP, assim você terá o arquivo compactado.

2. Abrir no editor

Abra a pasta raiz do projeto no seu editor de código (por exemplo, o VS Code). A estrutura principal deve exibir a pasta projeto_int1/, contendo seus diretórios.

3. Configurar o back-end (planilha de acessos - opcional)

Para habilitar o registro automático de logins e acessos dos alunos através do Google Sheets:
 
1. Crie uma nova planilha no Google Sheets com duas abas de nomes exatos:
   - `Alunos`: linha 1 com o cabeçalho (`Matrícula` e `Aluno`). A partir da linha 2, insira na coluna A a matrícula e na coluna B o nome do aluno.
   - `Acessos`: mantenha vazia, apenas com o cabeçalho na linha 1 (`Nome`, `Matrícula`, `Tipo`, `Data`, `Horário`). O script gravará cada novo acesso a partir da linha 2.
2. Na planilha, acesse **Extensões > Apps Script**, apague qualquer código padrão e cole o conteúdo do arquivo `login.gs` (localizado dentro da pasta `login/` do projeto).
3. Clique em **Implantar > Nova implantação**, selecione o tipo **App da Web** e configure **Executar como: Eu** e **Quem pode acessar: Qualquer pessoa**.
4. Copie a URL gerada pelo Google Apps Script (que termina em `/exec`) e cole-a na constante `URL_SCRIPT_LOGIN`, localizada no topo do arquivo `login/login.js`.


4. Executar a aplicação
No VS Code, acesse a pasta projeto_int1/login.
Abra o arquivo login.html.
Use a extensão Live Server do VS Code para iniciar o servidor local, clicando em Go Live.
O navegador abrirá automaticamente na página de login, permitindo realizar o acesso, assistir ao vídeo de abertura integrado e navegar pelo livro interativo, pelos reinos e pelo mapa da jornada.
   
Pronto: a aplicação estará rodando e a planilha registrará os acessos.

> **Observações:**
>  Não abra os arquivos com duplo clique. O site usa módulos JavaScript (`import`), que os navegadores bloqueiam quando a página não está hospedada em um servidor.
>  sempre que alterar o `login.gs`, publique uma **nova versão** da implantação no Apps Script para a mudança valer na URL, ou então a aplicação continuará usando o script antigo.

## Requisitos Funcionais

| ID | Requisito | Prioridade | Estado |
|---|---|---|---|
| RF01 | O sistema deve ter tela de login em que o aluno entra com a matrícula ou escolhe "Entrar como visitante". | Alta | Implementado |
| RF02 | O sistema deve validar automaticamente a matrícula digitada com a lista de alunos da planilha do professor. | Alta | Implementado |
| RF03 | O sistema deve registrar automaticamente na planilha cada acesso (nome, matrícula, tipo, data e horário), tanto de alunos quanto de visitantes. | Alta | Implementado |
| RF04 | O sistema deve permitir que visitantes acessem o conteúdo sem cadastro. | Alta | Implementado |
| RF05 | O sistema deve exibir uma mensagem de erro quando a matrícula não é encontrada na planilha | Alta | Implementado |
| RF06 | O sistema deve ter uma página "Sobre", que apresenta o projeto. | Baixa | Implementado |
| RF07 | O sistema deve exibir um vídeo de abertura como transição entre o login e o livro interativo. | Baixa | Implementado |
| RF08 | O sistema deve possuir um livro interativo com conteúdos da matéria | Alta | Implementado |
| RF09 | O sistema deve exibir o Mapa da Jornada com quatro destinos clicáveis: Walden II, Pragnanz, Orsha e Missão Linha do Tempo. | Alta | Implementado |
| RF10 | O sistema deve permitir voltar ao Mapa da Jornada a partir de qualquer reino ou missão. | Alta | Em andamento |
| RF11 | O sistema deve ter a Missão Linha do Tempo, com texto-base, vídeos de apoio, orientação de pesquisa e checklist de etapas. | Alta | Implementado |
| RF12 | O Reino Walden II deve apresentar o conteúdo em capítulos sequenciais, com navegação Voltar e Continuar. | Alta | Implementado |
| RF13 | Os reinos devem apresentar conteúdo teórico em texto e imagens. | Alta | Em andamento |
| RF14 | Os reinos devem incorporar vídeos do YouTube em carrossel ou em abas temáticas. | Média | Em andamento |
| RF15 | Os reinos devem exibir exemplos de postagens do perfil do Cognosis no Instagram, com link para o perfil. | Baixa | Implementado |
| RF16 | Imagens em órbita na tela de login com links externos (ex: Instagram do Cognosis e da equipe) | Baixa | Implementado |
| RF17 | O Reino Pragnanz deve seguir a estrutura do Walden II, com capítulos e conteúdos em HTML interativo. | Alta | Em andamento |
| RF18 | O Reino Orsha deve ter uma lista de conversas com personagens, uma por tema. | Alta | A fazer |
| RF19 | Cada conversa de Orsha deve ser exibida em formato de chat, com histórico de mensagens e mídias. | Alta | A fazer |

## Link para o Relatório Final

Link para o relatório final será adicionado posteriormente

