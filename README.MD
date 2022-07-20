# Testes automatizados com Cypress - Básico

Estudos voltados para o Cypress

- Criação de cenários de testes
- Criação de comandos customizados
- Lidando com elementos de Aplicação WEB
- Testes de Upload de arquivos
- Testando links que abrem em outros navegadores
- Testes simulando as dimensões de um dispotisivo móvel

Curso: Talking About Test

## Pré-requisitos para rodar os testes
Para rodar os testes, você precisará ter o Node.js instalado na sua máquina.

### Node

* <b>Instalação do Node no Windows</b>
Acesse a página oficial do Node.js (https://nodejs.org) e baixe o instalador. Tenha certeza também que tem o git disponível no seu PATH, você também pode precisar do npm.

* <b>Instalação do Node no Ubuntu</b>
Você pode instalar facilmente o nodejs e o npm com um apt install, basta seguir os seguintes comandos. $ sudo apt install nodejs $ sudo apt install npm

* <b>Outros sistemas operacionais</b>
Você pode achar mais informações sobre a instalação no site oficial do Node.js (https://nodejs.org/) e no site oficial do NPM.

Para verificar que a instalação foi feita com sucesso, você pode seguir os seguintes comandos. 

   
bash
$ node --version

$ npm --version
  
  
## Clonando o projeto
Para clonar o projeto, basta criar uma pasta no seu computador, acessá-la pelo terminal e utilizar o seguinte comando.

   
bash
$ git clone 
  

## Instalando o projeto
Para instalar o projeto na sua máquina, basta instalar todas as dependências presentes no arquivo package.json usando o seguinte comando no seu terminal.

  
bash
$ npm install
  

## Rodando o projeto
Para rodar o projeto, basta utilizar os seguintes comandos.

1. Para rodar a etapa de testes em modo headless
  
bash
$ npm run test
  
2. Para rodar os testes simulando um dispositivo móvel em modo headless
  
bash
$ npm run test:mobile
  
3. Para rodar os testes em modo interativo do Cypress

bash
$ npm run cy:open
$ npm run cy:open:mobile