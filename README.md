<img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_1.png" width="100">
# Simplewallet
Example of a web-App that provides virtual cryptocurrency wallets. The application allows the user to perform some operations such as: sell / buy currencies, view the balance and transactions extract.

### Example
[master](http://simplewallet.lukascivil.com.br/login)

<img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_2.png" width="400">

<img src="http://lukascivil.com.br/githubimages/simplewallet/Figure_3.png" width="200">

### Prerequisites
- Nodejs, npm
- Angular
- [materializecss](https://materializecss.com/)
- [Font Awesome](https://fontawesome.com/v4.7.0/icons/)

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
