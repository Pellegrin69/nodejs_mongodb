Créez une base de données sample nommée "sample_db" et une collection appelée "employees".
Insérez les documents suivants dans la collection "employees":

```json
[
  {
    "name": "John Doe",
    "age": 35,
    "job": "Manager",
    "salary": 80000
  },
  {
    "name": "Jane Doe",
    "age": 32,
    "job": "Developer",
    "salary": 75000
  },
  {
    "name": "Jim Smith",
    "age": 40,
    "job": "Manager",
    "salary": 85000
  }
]
```

Écrivez une requête MongoDB pour trouver tous les documents dans la collection "employees".

```shell
db.employees.find()
```

Écrivez une requête pour trouver tous les documents où l'âge est supérieur à 33.

```shell
db.employees.find({"age": {$gt: 33}})
```

Écrivez une requête pour trier les documents dans la collection "employees" par salaire décroissant.

```shell
db.employees.find().sort({ salary: -1 })
```

Écrivez une requête pour sélectionner uniquement le nom et le job de chaque document.

```shell
db.employees.find({}, { _id: 0, name: 1, job: 1 })
```

Écrivez une requête pour compter le nombre d'employés par poste.

```shell
db.employees.aggregate([{ $group: { _id: "$job", count: { $sum: 1 } } }])
```

Écrivez une requête pour mettre à jour le salaire de tous les développeurs à 80000.

```shell
db.employees.updateMany({ "job": "Developer" }, { $set: { "salary": 80000 } })
```