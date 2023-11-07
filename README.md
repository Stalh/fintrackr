# Fintrackr

Fintrackr est une application de suivi des finances personnelles conçue pour offrir une expérience utilisateur moderne et intuitive. Elle permet aux utilisateurs de suivre leurs dépenses et revenus avec facilité.

## 🛠 Technologies utilisées

- **Backend** : 
  [<img src="https://nestjs.com/img/logo_text.svg" width="100"/>](https://nestjs.com/)
  - [NestJS](https://nestjs.com/)

- **Frontend** :
  [<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="30"/>](https://angular.io/)
  - [Angular](https://angular.io/)
  - PrimeNG : Une suite de composants d'interface utilisateur pour Angular.

- **Base de données** :
  [<img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" width="100"/>](https://www.mongodb.com/)
  - [MongoDB](https://www.mongodb.com/)

## 🚀 Installation et mise en route

### Installation des dépendances

Ouvrez trois terminaux, un pour le backend, un pour le frontend, et un pour Docker.

#### Backend

```
cd fintrackr-backend
yarn install
```

#### Frontend

```
cd fintrackr-frontend
yarn install
```

### Configuration de l'environnement

Créez un fichier `.env` à la racine du projet backend en vous basant sur le `default.env` fourni. Remplissez-le avec les informations suivantes :

```
DB_HOST=localhost
DB_PORT=27017
DB_NAME=fintrackr
JWT_SECRET="YOUR_SECRET_KEY"
JWT_EXPIRATION_TIME="1h"
```

### Lancement des services

#### Backend

Utilisez Docker pour démarrer le service de base de données :

```
cd scripts
docker-compose up
```

Puis, démarrez le serveur de développement :

```
yarn start:dev
```

#### Frontend

```
ng serve
```


### Peuplement de la base de données

Utilisez le script `populate.js` pour initialiser la base de données avec des données de test.


## 🧪 Utilisateurs de test

Pour tester l'application, utilisez les identifiants suivants :

- **Username** : Sam
- **Mot de passe** : hashed_password_123

## 🔗 Liens utiles

- **Application** : [http://localhost:4200/login](http://localhost:4200/login)
- **Swagger API** : [http://localhost:3000/api](http://localhost:3000/api)
