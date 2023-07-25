# Note de cours Mongodb

mongodb+srv://<username>:<password>@cluster0.lzuyrh0.mongodb.net/?retryWrites=true&w=majority

Pour supprimer une collection :

```shell
db.personnes.drop(); 
```

DBQuery.shellBatchSize = 40 (temporaire, pouir augmenter la taille du "curseur" (=20 de base))

```shell
db.personne.find().limit(1) (.pretty() -> inutile sur Compass)

db.personne.find({"age": 76})
db.personne.find({"age": {$eq: 76}}, {"_id": false, prenom": true}) -> false = 0 et true = 1
```

Pour avoir le prénom des gens dont l’âge n’est pas (est différent de) 76 ans :

```shell
db.personnes.find({"age": {$eq: 76}}, {"_id": false, "prenom": true})
```

entre 70 et 80 inclus

```shell
db.personnes.find({"age": {$gte: 70, $lte: 80}}, {"_id": false, "prenom": true})
```

Opérateur logique ET :

```shell
db.personnes.find({ 
 $and: [{ 
   "age": { 
     $exists: 1 
   } 
 }, { 
   "age": { 
     $nin: [70, 80] 
   } 
 }] 
}, { 
 "_id": 0, 
 "prenom": 1, 
 "nom": 1 
}) 
```

OU ALORS :

```shell
db.personnes.find({ 
 "age": { 
   $exists: 1, 
   $nin: [70, 80] 
 } 
}, { 
 "_id": 0, 
 "prenom": 1, 
 "nom": 1 
}) 
```

Opérateur logique OU :

```shell
db.personnes.find({   $or: [{ 
    "age": { 
      $exists: 0 
    } 
 }, { 
    "age": 76
 }]  
}, { 
 "_id": 0, 
 "prenom": 1, 
 "nom": 1 
}) 
```

$where : éxectuer du js sous la forme d'un string ou d'une fonction
interdit sur mongodb atlas car très dangereux, le temps d'éxécution peut devenir montrueux
il parcourt tous les documents de personnes

this ou obj designe le document d'éxécution en cours d'étude dans la fonction ou la string de $where

$expr pour remplacer $where askip

Mongodb stock en bson
Comme le json, un type pour stocker tous les nombres
le schéma des documents (équivalent des tuples) en mongo est dynamique

mongoose (dépendance js qui permet de communiquer avec mongodb) est un ODM (Objet Document Mappeur)
il existe aussi la dépendance mongodb, la dep officielle, mais mongoose permet plus de chose
ORM (Object Relational Mapper)