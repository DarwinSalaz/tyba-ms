const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = 8080;
        this.usuariosPath = '/api/users';
        this.authPath     = '/api/auth';
        this.restaurantPath     = '/api/restaurants';
        this.transactionPath     = '/api/transactions';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.get('/', function (req, res) { res.send('Proyecto Tyba') })
        this.app.use( this.usuariosPath, require('../routes/users'));
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.restaurantPath, require('../routes/restaurant'));
        this.app.use( this.transactionPath, require('../routes/transaction'));
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

    async conectarDB() {
        await dbConnection();
    }

}

module.exports = Server;