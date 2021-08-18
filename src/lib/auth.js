module.exports = {

    noEstaLogueado(req,res,next){
        if(req.isAuthenticated()){
            return next();

        }
        return res.redirect('/loggin')

    },

EstaLogueado(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/perfil');
},
esusuarioPrincipal(req,res,next){
if(req.user.nombre ==="mariano"){
    return next();
}
else{
    return res.redirect('/perfil');
}
return res.redirect('/productos');
}
}