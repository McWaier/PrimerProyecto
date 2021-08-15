const express = require('express');
const router = express.Router();

const passport = require('passport');
const { estaLogueado , noEstaLogueado} = require('../lib/auth');




router.get('/registro',noEstaLogueado,(req,res)=>{

res.render('auth/registro');
});



router.post('/registro',noEstaLogueado,passport.authenticate('local.registro',{
   
    succesRedirect:'/perfil',
    failureRedirect:'/registro',
    failureFlash:true


   }));
   router.post('/registro',noEstaLogueado,passport.authenticate('local.registro',{
   
    succesRedirect:'/perfil',
    failureRedirect:'/registro',
    failureFlash:true


   }));
 

   router.get('/perfil',estaLogueado,(req,res)=>{
    res.render('perfil');
});
   router.get('/loggin',noEstaLogueado,(req,res)=>{
    res.render('auth/loggin');

   });

      router.post('/loggin',noEstaLogueado,(req,res,next)=>{
    passport.authenticate('local.loggin',{
        succesRedirect:'/perfil',
        failureRedirect:'/registro',
        failureFlash:true


    })(req,res,next);
   });
       
   router.post('/loggin',noEstaLogueado,(req,res,next)=>{
    passport.authenticate('local.loggin',{
        succesRedirect:'/perfil',
        failureRedirect:'/registro',
        failureFlash:true


    })(req,res,next);
   });
    









router.get('/cerrar',(req,res)=>{
req.logOut();
res.redirect('/loggin');
});




module.exports = router;

