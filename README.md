# Prueba Técnica: Tyba

Proyecto que expone recurso API REST que permite la creación y login de usuario, además de consultar restaurantes cercanos a una coordenada y consultar el historial de transacciones por usuario.

## Detalles Técnicos

* NodeJS
* MongoDB

# Iniciar contenedor docker

* docker build --tag node-docker .
* docker run --publish 8080:8080 node-docker

## Uso API Rest

* Creación usuario
```
# URL

POST - localhost:8080/api/users/

# BODY

{
    "name": "Darwin",
    "lastname": "Salazar",
    "email": "darwinsalaz@gmail.com",
    "password": "123456",
    "role":"ADMIN"
}

# RESPONSE

- 200

{
    "user": {
        "name": "Darwin",
        "lastname": "Salazar",
        "email": "darwinsalaz@gmail.com",
        "role": "ADMIN",
        "active": true,
        "_id": "62c1cb324502fa1e36888938"
    }
}

- 400

{
    "errors": [
        {
            "msg": "El correo no es válido",
            "param": "email",
            "location": "body"
        }
    ]
}

```

* Inicio sesión

```
# URL

POST - localhost:8080/api/auth/login

# REQUEST

{
    "email": "darwinsalaz@gmail.com",
    "password": "123456"
}

# RESPONSE

- 200

{
    "user": {
        "_id": "62c1cb324502fa1e36888938",
        "name": "Darwin",
        "lastname": "Salazar",
        "email": "darwinsalaz@gmail.com",
        "role": "ADMIN",
        "active": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmMxY2IzMjQ1MDJmYTFlMzY4ODg5MzgiLCJpYXQiOjE2NTY4NjkxMzIsImV4cCI6MTY1Njg4MzUzMn0.7UcZGj6e8vRdcVlKHPXN992b__r5IC8bAR4UolCG5js"
}

- 400

{
    "errors": [
        {
            "msg": "El correo es obligatorio",
            "param": "email",
            "location": "body"
        }
    ]
}



```

* Consulta restaurantes

```
# URL

POST - localhost:8080/api/restaurants
HEADER - x-token

# REQUEST

{
    "lat": 6.2359,
    "lng": -75.5751
}

# RESPONSE

- 200

{
    "restaurants": [
        {
            "id": "514bd8237953e452c059246b30048ed41840f00103f901e015c6f800000000920307486f6f74657273",
            "name": "Hooters",
            "city": "Medellín",
            "address": "Hooters, Carrera 37A 8-44, Comuna 14 - El Poblado, 0500 Medellín, ANT, Colombia"
        }
    ]
}

- 400

{
    "errors": [
        {
            "msg": "El correo es obligatorio",
            "param": "email",
            "location": "body"
        }
    ]
}

- 401

{
    "msg": "Token no válido"
}



```

* Consulta transacciones

```
# URL

GET - localhost:8080/api/transactions
HEADER - x-token

# RESPONSE

- 200

{
    "count": 1,
    "transactions": [
        {
            "_id": "62c1e5fed511b23f55d732f0",
            "userId": "62c1cb324502fa1e36888938",
            "lat": 6.2359,
            "lng": -75.5751,
            "restaurants": [
                "Hooters",
                "paladar y corazon",
                "Federal Ribs",
                "Federal Ribs"
            ],
            "__v": 0
        }
    ]
}

- 401

{
    "msg": "Token no válido"
}


