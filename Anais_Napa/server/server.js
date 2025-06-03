import express from 'express';
import cors from 'cors';
import indexRouter from '../routes/index.routes.js';
import * as db from '../db/cnn_mongoDB.js'

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        if(!db.isconnection){
            await db.conecionaMongo();
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, indexRouter);
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Puero correctamente abierto en el puerto ' + this.port);
        });
    }
}