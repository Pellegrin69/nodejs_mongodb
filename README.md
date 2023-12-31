# TP final Nodejs Mongodb

Retrouvez l'énoncé [ici](./TP.md) ainsi que mes notes de cours [ici](./notes.md).

## Préparatifs

Pour mettre en place le projet, il suffit d'ajouter un fichier `.env` avec les variables suivantes :

```text
JWT_SECRET_KEY="votre_clé_jwt_secrète"
MONGO_CONNECTION_STRING="votre_chaîne_de_connexion_mongodb"
PORT=3000 (par exemple)
```

Pour démarrer le projet normalement, utiliser `npm run start`.

Pour démarrer le projet en mode dev, utiliser `npm run dev`. Cela permet de lancer le projet
avec [nodemon](https://www.npmjs.com/package/nodemon).

## Présentation de l'API RESTful

Une API RESTful (Representational State Transfer) est une API qui suit les principes et conventions de l'architecture
REST. Les principes REST sont conçus pour rendre les API simples, évolutives et faciles à maintenir.

Voici les cinq grands principes REST et comment ils sont mis en œuvre dans mon projet :

1. Utilisation des méthodes HTTP : Les API REST utilisent les méthodes HTTP pour définir l'action à effectuer sur les
   ressources. Les principales méthodes HTTP utilisées sont GET, POST, PUT et DELETE.

Exemple de code ([routeur du modèle User](src/routes/user.js)) :

```javascript
// Routes publiques
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Routes protégées
userRouter.get('/', authMiddleware, getAllUsers);
userRouter.get('/:id', authMiddleware, getOneUser);
userRouter.put('/:id', authMiddleware, updateUser);
userRouter.delete('/:id', authMiddleware, deleteUser);
```

2. Utilisation des URI (Uniform Resource Identifier) : Les ressources sont identifiées de manière unique à l'aide d'URI.
   Les URI sont utilisés pour accéder aux ressources et effectuer des opérations sur elles.

Exemple :
Les URI sont définis dans les routes (présentées au-dessus, dans le routeur).
Par exemple, ```/api/users``` permet d'accéder aux utilisateurs et ```/api/users/:id``` pour accéder à un utilisateur
spécifique par son ID.

Je définis le début des URI dans le fichier [app.js](src/app.js) :

```javascript
// Import des routeurs
import userRouter from './routes/user.js';

app.use('/api/users', userRouter);
```

3. Utilisation des codes d'état HTTP : Les codes d'état HTTP indiquent le résultat d'une requête. Les principaux codes
   d'état utilisés dans les API REST sont 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (
   Unauthorized), 404 (Not Found), 500 (Internal Server Error), etc.

Exemple :
Dans les contrôleurs, nous utilisons les codes d'état HTTP pour indiquer le résultat de chaque requête.
Le code ci-dessous renvoie un statut 404 si aucun utilisateur n'a été trouvé avec l'ID fourni :

```javascript
const existingUser = await User.findById(userId);
if (!existingUser) {
    return res.status(404).json({message: 'Utilisateur non trouvé.'});
}
```

4. Utilisation des représentations des ressources : Les API REST utilisent différentes représentations (par exemple,
   JSON, XML) pour représenter les ressources. Le format de représentation est spécifié dans l'en-tête Content-Type de
   la requête et de la réponse.

Exemple :
Dans les réponses, nous utilisons res.json() pour envoyer des réponses au format JSON, ce qui est couramment utilisé
dans les API REST.

5. *Stateless* (Sans état) : Chaque requête vers le serveur doit contenir toutes les informations nécessaires pour
   comprendre et traiter la requête. Le serveur ne conserve pas d'informations d'état sur le client entre les requêtes.

Exemple :
Les API REST sont sans état par nature, et mon projet suit cette approche car chaque requête contient toutes les
informations nécessaires pour traiter la requête sans avoir besoin de conserver un état de session.

## CI/CD

### Intégration Continue

Ce projet utilise GitHub Actions pour automatiser le processus d'intégration continue (CI).
Le workflow CI est déclenché automatiquement sur chaque pull request.

#### Étapes pour la CI

Voici comment reproduire les étapes du CI localement :

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Pellegrin69/nodejs_mongodb.git
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Linter le code**
   ```bash
   npm run lint
   ```

4. **Lancer le test**
   ```bash
   npm test
   ```

### Déploiement Continu (CD)

Le déploiement continu permet de créer une nouvelle image Docker et de la pousser sur Docker Hub.
Le workflow est déclenché si une Pull Request est faite sur GitHub vers la branche *main* et si le job *build* du CI a
réussi.

### Livraison Continue (CD)

#### Étapes de Déploiement

1. **Créer une Nouvelle Branche de Fonctionnalité**
    - Si vous travaillez sur une nouvelle fonctionnalité, créez une nouvelle branche de fonctionnalité en utilisant la
      commande `git checkout -b ma-nouvelle-fonctionnalite`.


2. **Effectuer les Modifications Nécessaires**
    - Apportez les modifications nécessaires à l'application.


3. **Commit et Push des Modifications**
    - Effectuez un commit de vos modifications avec `git commit -m "Description du changement"`.
    - Poussez les modifications vers le dépôt distant avec `git push origin ma-nouvelle-branche` (si vous travaillez sur
      une nouvelle branche).


4. **Créer une Pull Request (PR)**
    - Créez une Pull Request pour fusionner vos modifications dans la branche principale.


5. **Attente des Résultats du CI/CD**
    - Attendez que le processus CI/CD s'exécute automatiquement sur votre Pull Request.
    - Vérifiez que le CI est réussi avant de poursuivre.


6. **Fusionner la Pull Request**
    - Une fois le CI réussi, demandez à un collègue de confiance de revoir votre PR.
    - Fusionnez la PR dans la branche principale.


7. **Créer un Tag pour la Nouvelle Version**
    - Utilisez la commande `git tag -a v1.2.3 -m "Description de la version"` pour créer un nouveau tag.
      Remplacez `v1.2.3` par la version appropriée.


8. **Pousser le Tag vers GitHub**
    - Poussez le tag vers GitHub avec `git push origin v1.2.3`.


9. **Attente du Déploiement Automatique (CD)**
    - Attendez que le processus de déploiement continu (CD) soit déclenché automatiquement pour le tag que vous avez
      créé.


10. **Vérifier le Déploiement**
    - Une fois le CD réussi, vérifiez que la nouvelle version de l'application est déployée conformément aux modalités
      spécifiées dans le README.


11. **Célébrer le Succès !**
    - Félicitations ! Vous avez déployé avec succès la nouvelle version de l'application.
