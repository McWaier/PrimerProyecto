const express = require('express');
const router = express.Router();
const coneccion = require('../database');
const  {estaLogueado} =  require('../lib/auth');



router.get('/agregarProd',estaLogueado,(req,res)=>{

    res.render('productos/agregarProd');
});


router.post('/productos/agregarProd',estaLogueado, async(req,res)=>{
    console.log(req.body);
    const{nombre , codigo_barras ,descripcion_prod,precio } =req.body;
   
    const newData = {
        nombre,
        codigo_barras,
        usuario_id : req.user.id,
       
        precio : parseFloat(precio),
        descripcion_prod
    };
    await coneccion.query('INSERT INTO productos set ?',[newData]);
    req.flash('correcto','Nota Agregada!!');
    res.render('productos/agregarProd');


});

router.get('/productos',async(req,res)=>{

   const link = await coneccion.query('SELECT * FROM productos WHERE usuario_id = ?',[req.user.id]);


  
   res.render('productos/agregarProd',{link});
  
})
router.get('/productos2',async(req,res)=>{

     link = await coneccion.query('SELECT * FROM productos WHERE usuario_id = ?',[req.user.id]);
 
     data =  JSON.stringify(link);
     res.send(data);
   

   
 })




router.get('/productos/delete/:id',estaLogueado,async(req,res)=>{
    const {id} = req.params;
   // console.log(req.param.id);
    await coneccion.query('DELETE  FROM productos WHERE ID =?',[id]);
    //req.flash('correcto','Nota borrada!!');
    res.redirect('/productos');
});

router.get('/productos/productosedit/:id',estaLogueado,async(req,res)=>{
    const {id} = req.params;
     const link =await coneccion.query('SELECT * FROM productos WHERE id=?',[id]);
     console.log(link)
    
    res.render('productos/productosedit',{link : link[0]});
  
});


router.post('/productos/productosedit/:id',estaLogueado,async(req,res)=>{

    console.log(req.body);
const{id} = req.params;
const{nombre , codigo_barras ,descripcion_prod,precio } =req.body;
   
const newData = {
    nombre,
    codigo_barras,

    descripcion_prod,
    precio : parseFloat(precio)
};
await coneccion.query('UPDATE  productos set? WHERE id=?',[newData,id]);
req.flash('correcto','Nota modificada!!');
res.redirect('/productos');
});




module.exports =router;