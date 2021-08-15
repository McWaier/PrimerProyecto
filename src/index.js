const express = require('express');
const morgan = require('morgan');
const exphbs=require('express-handlebars');
const path = require('path');
const session = require('express-session');
const mysqlStore=require('express-mysql-session');
const passport = require('passport')
const { database } = require('./keys');
const flash = require('connect-flash');
//Inicializaciones

const app = express();
require('./lib/passport');

//Configuraciones

app.set('port',process.env.PORT ||5000);

app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',exphbs({

    defaultLayout:'main',
    layoutsDir : path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers:require('./lib/handlebars')

}));

app.set('view engine' , '.hbs');

//Middlewares

app.use(session({
    secret:'McwaierDesa',
    resave:false,
    saveUninitialized:false,
    store:new mysqlStore(database)


}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Variables Globales



app.use((req,res,next)=>{
   app.locals.correcto= req.flash('correcto');
   app.locals.message= req.flash('message');
   app.locals.user=req.user;
    next();

});

//Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/links',require('./routes/links'));

//Publico
app.use(express.static(path.join(__dirname,'public')));

//Inicio de servidor

app.listen(app.get('port'), ()=>{
    console.log('Servidor en el puerto' , app.get('port'));
});