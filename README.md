<p align="center">
<img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_1.png" width="120">
</p>

# Simplewallet
Example of a web-App that provides virtual cryptocurrency wallets. The application allows the user to perform some operations such as: Sell/Buy currencies, view the balance and transactions extract. Everything is stored in browser localStorage.
<p>
The application works with three currencies: Real, Bitcoin and Brita. When registering, the user receives 100,000 Reais to use in the app. The quotation of the brita currency is the same as the dollar. To get the Bitcoin and Brita quotation, it was necessary to access the <a href="https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/aplicacao#!/CotacaoDolarDia#eyJmb3JtdWxhcmlvIjp7IiR0b3AiOjEwMCwiJGZvcm1hdCI6Impzb24ifX0=" target="_blank">BCB API</a> and <a href="https://www.mercadobitcoin.com.br/api-doc/" target="_blank"> Mercado Bitcoin</a>.
</p>

[![Build Status](https://travis-ci.org/lukascivil/simplewallet.svg?branch=master)](https://travis-ci.org/lukascivil/simplewallet)

### Example
[master](http://simplewallet.lukascivil.com.br/login)

## Images (Screenshot)
### On Desktop
<p align="center">
<img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_2.png" width="600">
</p>

### On Mobile
<p align="center">
  <img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_3.png" width="170">
  <img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_4.png" width="170">
  <img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_5.png" width="170">
  <img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_6.png" width="170">
  <img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_7.png" width="170">
</p>

---
### Prerequisites
- Nodejs, npm
- Angular v6.1
- [materializecss v1.0.0](https://materializecss.com/)
- [Font Awesome v4.7](https://fontawesome.com/v4.7.0/icons/)
- [ng2-currency-mask v5.3.1](https://github.com/cesarrew/ng2-currency-mask)

---
## Installation

Clone
- Clone this repo to your local machine using 
```
git clone https://github.com/lukascivil/simplewallet
```
Setup
>Install npm packages
```
- cd simplewallet
- npm install
```
Usage
>Run local server
```
- ng serve
```
>Build to run on Apache (for example)
```
- ng build --prod
```
>On your root project path add .htaccess file with
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
```
