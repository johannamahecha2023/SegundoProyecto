var express = require('express');
var router = express.Router();
const {conexion} = require('../database/conexion')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hola' });
});

//enrutamiento para visualizar los medicos de la BD
router.get('/listado-pacientes',(req,res)=>{
  conexion.query(`SELECT * FROM pacientes;`,(error,resultado)=>{
  if(error){
    console.log('ocurrio un error en la ejecucion', error)
    res.status(500).send('error en la ejecucion')
  }else{
  
    res.status(200).render('pacientes',{resultado})
  }
  })
})


//enrutamiento para visualizar los medicos de la BD
router.get('/listado-medicos',(req,res)=>{
  conexion.query(`SELECT * FROM medicos;`,(error,resultado)=>{
  if(error){
    console.log('ocurrio un error en la ejecucion', error)
    res.status(500).send('error en la ejecucion')
  }else{
  
    res.status(200).render('medicos',{resultado})
  }
  })
})

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

  conexion.query(`INSERT INTO medicos (Nombres,Apellidos,TipoDocumento,Cedula,Consultorio,Celular,Correo,Especialidad) VALUES ('${Nombres}','${Apellidos}','${TipoDocumento}',${Cedula},'${Consultorio}','${Celular}','${Correo}','${Especialidad}')`,(error,resultado)=>{
    if(error){
      console.log('ocurrio un error en la ejecucion', error)
      res.status(500).send('error en la ejecucion')
    }
    else{
      res.status(200).redirect('/listado-medicos')
    }
  })
})
//enrutamiento para agregar un paciente a la BD desde nuestra aplicacion
router.post('/agregar-paciente',(req,res)=>{
  
  const Nombres=req.body.Nombres
  const Apellidos=req.body.Apellidos
  const TipoDocumento=req.body.TipoDocumento
  const Cedula=req.body.Cedula
  const Fecha_Nacimiento=req.body.Fecha_Nacimiento
  const Celular=req.body.Celular

  conexion.query(`INSERT INTO pacientes (Cedula,Nombres,Apellidos,TipoDocumento,Fecha_Nacimiento,Celular) VALUES (${Cedula},'${Nombres}','${Apellidos}','${TipoDocumento}','${Fecha_Nacimiento}',${Celular})`,(error,resultado)=>{
    if(error){
      console.log('ocurrio un error en la ejecucion', error)
      res.status(500).send('error en la ejecucion')
    }
    else{
      res.status(200).redirect('/listado-pacientes')
    }
  })
})

//enrutamiento para consultar los medicos de una especialidad y poder agendar la cita
router.post('/consulta-cita', (req,res)=>{
  const Especialidad =req.body.Especialidad
  conexion.query(`select * from medicos where Especialidad = '${Especialidad}';`,(error, resultado)=>{
    if(error){
      console.log(error)
      res.status(500).send('ocurrio un error en la consulta')
    }else{
      res.status(200).render('agendar-citas', {resultado})
    }
  })
})

//Enrutamiento para guardar una cita en la base de datos
router.post('/agregar-cita',(req,res)=> {
  
   const cedula_paciente =req.body.Cedula
   const fecha_cita =req.body.fecha_cita
   const cedula_medico =req.body.medico
   conexion.query(`INSERT INTO cita_medica (cedula_medico,cedula_paciente,fecha_cita) VALUES (${cedula_medico},${cedula_paciente},'${fecha_cita}')`, (error,resultado)=>{
     if(error){
      console.log(error)
      res.status(500).send('ocurrio un error en la consulta')
     }else{
      res.status(200).send('cita agendada con exito')
     }
   })
})

module.exports = router;
