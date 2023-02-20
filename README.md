# Digitalno obrazovanje

# Rute
##  /user

#### Login:  POST  http://localhost:8080/users/login

```json
{
    "email": "prof@gmail.com",
    "password":"password" 
}
```

#### odgovor
```json
{
    "user_id": 1,
    "email": "prof@gmail.com",
    "password": "password",
    "class": "4b"
}
```

#### Dohvati po id:  GET  http://localhost:8080/users/:id
#### Odgovor isti kao i gore  

<br>

##  /game


#### Dohvati novi gameId: GET  http://localhost:8080/game/gameId
```json
{
   "gameId": 33212
}
```
<br>

#### Provjeri ispravnost gameId-ja: GET  http://localhost:8080/game/validate?gameId=33212

```json
{
    "valid": true
}
```
<br>

#### Obavijesti sve korisnike da igra može započeti: POST  http://localhost:8080/game/start

Svi korisnici će preko SocketIO primiti 
```json
{
	"start":"yes"
}
```
<br>

#### Predviđanje za 2. (drugi) pokušaj/igru (treba par sekundi dok se dobije odgovor): GET  http://localhost:8080/game/prediction?attempt=2
```json
{
    "predictionPoints": 303.6
}
```
<br><br>

##  /records

#### Dohvaćanje svih zapisa: GET  http://localhost:8080/records
```json
[
    {
        "record_id": 1,
        "game_id": 22,
        "name": "IVAN HORVAT",
        "class": "4b",
        "points": 312,
        "attempt": 1
    },
    {
        "record_id": 2,
        "game_id": 2,
        "name": "IVAN HORVAT",
        "class": "4b",
        "points": 312,
        "attempt": 2
    },
    {
        "record_id": 3,
        "game_id": 332,
        "name": "Ivan Horvat",
        "class": "4b",
        "points": 300,
        "attempt": 1
    }
]
```
<br>


#### Dohvaćanje zapisa o igri po `gameId`: GET  http://localhost:8080/records?gameId=2
```json
[
    {
        "record_id": 2,
        "game_id": 2,
        "name": "IVAN HORVAT",
        "class": "4b",
        "points": 312,
        "attempt": 2
    }
]
```
<br>

#### Dohvaćanje zapisa o igri po `class`: GET  http://localhost:8080/records?class=4b
```json
[
    {
        "record_id": 1,
        "game_id": 22,
        "name": "IVAN HORVAT",
        "class": "4b",
        "points": 312,
        "attempt": 1
    },
    {
        "record_id": 2,
        "game_id": 2,
        "name": "IVAN HORVAT",
        "class": "4b",
        "points": 312,
        "attempt": 2
    }
]
```
<br>

####  Spremanje zapisa o igri: POST  http://localhost:8080/records
```json
{   
    "gameId": 2222,
    "name": "Ivan Horvat",
    "class": "4b",
    "points": 350
}
```
<br><br>

