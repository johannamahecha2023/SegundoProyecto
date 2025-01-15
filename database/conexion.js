//archivo de configuracion para la BD 



//importar el modulo mysql
const mysql= require('mysql')
//creamos la conexion con mysql
const conexion= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Leidy.0331',
    database: 'centro_medico'
})
conexion.connect(function(error){
    if(error){
        console.log(`ocurrio un error en la coneccion ${error}`)
        return;
    }else {
        console.log('conexion exitosa')
    }
})

module.exports ={conexion}