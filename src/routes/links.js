const express = require('express');
const router = express.Router();
const coneccion = require('../database');
const  {estaLogueado} =  require('../lib/auth');



router.get('/agregar',estaLogueado,(req,res)=>{

    res.render('links/agregar');
});


router.post('/agregar',estaLogueado, async(req,res)=>{
    const{titulo , url ,descripcion } =req.body;
    const newData = {
        titulo,
        url,
        usuario_id : req.user.id,
        descripcion
    };
    await coneccion.query('INSERT INTO links set ?',[newData]);
    req.flash('correcto','Nota Agregada!!');
    res.redirect('/links')


});

router.get('/',async(req,res)=>{

   const link = await coneccion.query('SELECT * FROM links WHERE usuario_id = ?',[req.user.id]);
   console.log(link);
   res.render('links/lista',{link});

})

router.get('/delete/:id',estaLogueado,async(req,res)=>{
    const {id} = req.params;
   // console.log(req.param.id);
    await coneccion.query('DELETE  FROM links WHERE ID =?',[id]);
    req.flash('correcto','Nota borrada!!');
    res.redirect('/links');
});

router.get('/editar/:id',estaLogueado,async(req,res)=>{
    const {id} = req.params;
     const links =await coneccion.query('SELECT * FROM links WHERE id=?',[id]);
    
    res.render('links/editar',{links : links[0]});
  
});


router.post('/editar/:id',estaLogueado,async(req,res)=>{

const{id} = req.params;
const{titulo,descripcion,url,usuario_id}=req.body;
const nuevoLink={
    titulo,
    descripcion,
    url
};
await coneccion.query('UPDATE  links set? WHERE id=?',[nuevoLink,id]);
req.flash('correcto','Nota modificada!!');
res.redirect('/links');
});
module.exports =router;