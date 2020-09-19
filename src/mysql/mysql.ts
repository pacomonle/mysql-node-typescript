import mysql = require('mysql');



export default class MysQL {

private static _instance: MysQL;

cnn: mysql.Connection;
conectado: boolean = false;

constructor(){
    console.log('class inicializada');

    this.cnn = mysql.createConnection({
        port     : 3307,
        host     : 'localhost',
        user     : 'node_user2',
        password : '123456abcD@',
        database : 'node_db',
        
      });
 
    this.conectarDB();
     
}

// patron singleton - evitar multiples instancias
public static get instance(){
  return this._instance || (this._instance = new this())
}

// ejecutar query
public static ejecutarQuery(query: string, callback: Function){
    this.instance.cnn.query(query, (error, results: Object[], fields:any)=>{
        if (error) {
            console.log('error en query', error);
            return callback(error);
        }

        if(results.length === 0){
           return callback('el registro solicitado no existe');
        }else{
           callback(null, results);
        }

      
      
    });

   // this._instance.cnn.end();
}

private conectarDB(){
    this.cnn.connect((err: mysql.MysqlError)=>{
        if(err){
            console.log(err.message)
            return;
        }

        this.conectado = true;
        console.log('Base de Datos online');
    });
}

}














 