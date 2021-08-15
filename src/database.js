const mysql =  require('mysql');

const {promisify}=require('util');


const { database } =require('./keys');

const coneccion = mysql.createPool(database);
coneccion.getConnection((err,coneccion)=>{

    if(err){
        if(err.code == 'PROTOCOL_CONENECTION_LOST'){
            console.error('LA CONECCION DE LA BASE ESTA CERRADA');
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('DATA BASE TIENE TODAS LAS CONECCIONES OCUPADAS');
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('LA CONECCION NO SE PUDO REALIZAR')
        }

    }
    if(coneccion)coneccion.release();
    console.log("SE CONECTO DE MANERA CORRECTA")
    return;
});
coneccion.query = promisify(coneccion.query);
module.exports = coneccion;