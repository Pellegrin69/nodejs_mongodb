# Mongodb

## Docker

Pour utiliser le fichier docker-compose.yml: 
``` sh
docker-compose up -d
```




### La notation JSON 

MongoDB stocke une représentation binaire du format JSON dans un format spécialement créé par ses concepteurs : le BSON (pour binary JSON). Lorsque vous interagissez avec la base de données, MongoDB transforme le code JSON que vous lui fournissez en BSON, comme il transformera le BSON qu’il a stocké en JSON avant de vous le présenter. La taille maximale d’un document au format BSON est fixée à 16 Mo

Les types de données pris en charge de façon native par JSON sont au nombre de six :

    booléen

    numérique

    chaîne de caractères

    tableau

    objet

    null (le marqueur d’absence de valeur)


À ces types prédéfinis dans JSON, MongoDB vient ajouter les siens :

`le type Date` : stocké sous la forme d’un entier signé de 8 octets représentant le nombre de secondes écoulées depuis l’époque Unix (01/01/1970 à minuit). Attention, le fuseau horaire (timezone) n’est pas stocké !

Le type `ObjectId` : stocké sur 12 octets, ce type est utilisé en interne pour garantir l’unicité des identifiants générés par la base de données, son importance est donc capitale !

Les types entiers `NumberLong et NumberInt` : par défaut, MongoDB considère tout numérique comme étant un nombre à virgule codé sur 8 octets. Ces types servent à représenter des nombres entiers signés dont la représentation interne se fait respectivement sur 8 et 4 octets.

Le type `flottant NumberDecimal` : codé sur 16 octets, ce type décimal d’une grande précision est en général privilégié pour des applications effectuant des calculs mathématiques requérant une très grande exactitude.

Le type `BinData` : pour stocker des chaînes de caractères ne pouvant pas être représentées en codage UTF-8 ou n’importe quel contenu binaire (nous le retrouverons dans la partie consacrée à GridFS).

D’autres types sont disponibles, nous avons listé ici les plus fréquemment utilisés, mais vous trouverez une liste bien plus exhaustive à l’URL suivante : https://docs.mongodb.com/manual/reference/bson-types/


### MongoDB en ligne de commande

Pour lancer mongoDB : 

``` sh
mongod
```

Pour se connecter a mongodb: 
``` sh
mongo --port 27777 
```


Pour savoir sur quelle db on se trouve : 
```
db
```

Pour changer de base de donnnees : 
```
use dbName
```

Concernant les bases installees par defaut :

    Ces bases de données servent à gérer les rôles et autorisations, la gestion interne de MongoDB ou des informations sur le démarrage de vos instances. À de très rares exceptions près, vous n’aurez pas l’occasion d’y faire quelque modification que ce soit, ce sont généralement les administrateurs qui y effectuent des opérations.


On peut par exemple : 

``` js
use admin 
db.createUser( 
 { 
   "user": "mongosensei", 
   "pwd": "M0ng0d3!", 
   "roles":[ 
       {"role":"userAdminAnyDatabase","db":"admin"}, 
       "readWriteAnyDatabase" 
   ] 
 } 
) 

```




## La gestion des collections 

Les collations servent à définir des règles pour la comparaison des chaînes de caractères, notamment en ce qui concerne l’accentuation des caractères ou leur casse dans un langage donné. Les collations peuvent être utilisées avec les collections, les vues ou encore les index.

Voici la forme d’un document contenant les informations liées à une collation: 

```
{ 
  locale: < chaîne de caractères >, 
  caseLevel: < booléen >, 
  caseFirst: < chaîne de caractères >, 
  strength: < entier >, 
  numericOrdering: < booléen >, 
  alternate: < chaîne de caractères >, 
  maxVariable: < chaîne de caractères >, 
  backwards: < booléen > 
} 
```

Seul le champ locale est obligatoire, et c'est le seul que nous allons utilise cet apres-midi,

Pour creer une collection : 

```
use madB
db.createCollection('maCollection', {"collation": { "locale": "fr" }})

db.maCollection.drop()
```


### Gestion des documents : 

Pour creer un document : 
```
db.collection.insert(< document OU tableau de documents >) 
```

Exemple de donnees a inserer : 
``` json
[ 
 {"nom": "COBLENTZ", "prenom": "Robin"}, 
 {"nom": "FAUVET", "prenom": "Laura"} 
] 
```

A vous d'essayer: 

``` js
use test;

db.etudiants.insertMany([ 
 {"nom": "COBLENTZ", "prenom": "Robin"}, 
 {"nom": "FAUVET", "prenom": "Laura"} 
])
```

Les methodes insertMany et insertOne gerent les insertions non ordonnees : ce type d’insertion garantit que si une erreur se produit durant l’insertion de plusieurs documents, l’opération n’est pas interrompue et les documents restants sont insérés. L’insertion non ordonnée est réalisée en passant en paramètre un second document contenant le booléen false à la clé ordered, comme suit :

``` js
db.etudiants.insertMany([
     {"nom": "HALLOULI", "prenom": "Walid"}, 
 {"nom": "LATTIER", "prenom": "Innocent"} 
], {"ordered": false})
```



### Modifiaction de document 

Syntaxe generale : 
```
db.collection.updateOne(< filtre >, < modifications >) 
```

Les paramètres filtre et modification sont des documents : le premier sert à cibler les enregistrements qui seront modifiés et le second décrit les modifications à appliquer aux documents ciblés par le filtre avec l’aide d’opérateurs de mise à jour ($set dans le cas qui nous intéresse, mais il en existe bien d’autres).

En pratique : 
```
db.etudiants.updateOne({
"nom":"FAUVET"
}, {
    $set: {"nom": "FAUVETT"}
})
```







## Effectuer des requetes avec `find` et  `findOne`


