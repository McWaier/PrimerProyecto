module.exports = {

    estaLogueado(req,res,next){
        if(req.isAuthenticated()){
            return next();

        }
        return res.redirect('/loggin')

    },

noEstaLogueado(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/perfil');
}

}