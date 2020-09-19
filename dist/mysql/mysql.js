"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MysQL {
    constructor() {
        this.conectado = false;
        console.log('class inicializada');
        this.cnn = mysql.createConnection({
            port: 3307,
            host: 'localhost',
            user: 'node_user2',
            password: '123456abcD@',
            database: 'node_db',
        });
        this.conectarDB();
    }
    // patron singleton - evitar multiples instancias
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    // ejecutar query
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (error, results, fields) => {
            if (error) {
                console.log('error en query', error);
                return callback(error);
            }
            if (results.length === 0) {
                return callback('el registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
        // this._instance.cnn.end();
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de Datos online');
        });
    }
}
exports.default = MysQL;
