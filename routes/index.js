var express = require('express');
var router = express.Router();
const {conexion} = require('../database/conexion')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hola' });
});

//enrutamiento para agregar un medico a la BD desde nuestra aplicacion
router.post('/agregar-medico',(req,res)=>{
  const Cedula=req.body.Cedula
  const Nombres=req.body.Nombres
  const Apellidos=req.body.Apellidos
  const TipoDocumento=req.body.TipoDocumento
  const Consultorio=req.body.Consultorio
  const Celular=req.body.Celular
  const Correo=req.body.Correo
  const Especialidad=req.body.Especialidad

  console.log(Especialidad)
  conexion.query(`INSERT INTO medicos (Nombres,Apellidos,TipoDocumento,Cedula,Consultorio,Celular,Correo,Especialidad) VALUES ('${Nombres}','${Apellidos}','${TipoDocumento}',${Cedula},'${Consultorio}','${Celular}','${Correo}','${Especialidad}')`,(error,resultado)=>{
    if(error){
      console.log('ocurrio un error en la ejecucion', error)
      res.status(500).send('error en la ejecucion')
    }
    else{
     res.status(200).send('datos insertados con exito')
    }
  })

  res.status(200).send('agregando medico')
})
module.exports = router;
