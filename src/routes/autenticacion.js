const express = require('express');
const router = express.Router();

const passport = require('passport');
const { EstaLogueado , noEstaLogueado} = require('../lib/auth');




router.get('/registro',EstaLogueado,(req,res)=>{

res.render('auth/registro');
});



router.post('/registro',EstaLogueado,passport.authenticate('local.registro',{
   
    succesRedirect:'/perfil',
    failureRedirect:'/registro',
    failureFlash:true


   }));
   router.post('/registro',EstaLogueado,passport.authenticate('local.registro',{
   
    succesRedirect:'/perfil',
    failureRedirect:'/registro',
    failureFlash:true


   }));
 

   router.get('/perfil',noEstaLogueado,(req,res)=>{
    res.render('perfil');
});
   router.get('/loggin',EstaLogueado,(req,res)=>{
    res.render('auth/loggin');

   });

      router.post('/loggin',EstaLogueado,(req,res,next)=>{
    passport.authenticate('local.loggin',{
        succesRedirect:'/perfil',
        failureRedirect:'/registro',
        failureFlash:true


    })(req,res,next);
   });
       
   router.post('/loggin',EstaLogueado,(req,res,next)=>{
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

