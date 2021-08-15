const passport=require('passport');

const coneccion = require('../database');
const helpers = require('../lib/helpers');
const LocalStrategy=require('passport-local').Strategy;



passport.use('local.loggin', new LocalStrategy({
    usernameField:'nombre',
    passwordFIeld:'password',
    passReqToCallback:true
},async(req,nombre,password,done)=>{

     
    const filas =await coneccion.query('SELECT * FROM usuarios WHERE nombre =?',[nombre]);
    if (filas.length>0){
const user=filas[0];
const pasValidada = await helpers.loggin(password,user.password);
if(pasValidada){

    done(null,user, req.flash('correcto','Bienvenido ' + user.nombre));
}
else{
    done(null,false, req.flash('message','Contraseña invalida'));
}
    }
    else{
        return done(null,false,req.flash('message','EL nombre de Usuario no existe'));
    }
    
}));







passport.use('local.registro',new LocalStrategy({
usernameField:'nombre',
passwordFIeld:'password',
passReqToCallback:true


},async(req,nombre,password,done)=>{
const{nombre_completo} =req.body;
const newUser={
    nombre,
    password,
    nombre_completo

};
newUser.password = await helpers.encriptarPass(password);

const resultado = await coneccion.query('INSERT INTO usuarios SET ?',[newUser]);
//console.log(resultado);
newUser.id=resultado.insertId;
return done(null,newUser);

}));

passport.serializeUser((usr,done)=>{

    done(null,usr.id);

});

passport.deserializeUser(async (id,done) =>{

 const filas= await coneccion.query('SELECT * FROM usuarios WHERE id =?',[id]);

 done(null,filas[0]);
});
