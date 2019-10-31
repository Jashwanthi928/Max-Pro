require('./config/db');
const express = require('express');
const app = express();
const port = process.env.port || 3000;
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const bodyparser = require('body-parser');
const passport = require('passport');
const introductioncontrollers = require('./controllers/introductioncontrollers')
const wholesalecontrollers = require('./controllers/wholesalecontrollers')
const demandcontrollers = require('./controllers/demandcontrollers')
const maxprofit = require('./controllers/promax')
app.use(express.static('public'));

app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(cors());
app.use(bodyparser.json());

app.set('views',path.join(__dirname,'./views'))
app.engine('hbs',exphbs({
    extname:'hbs',
    defaultLayout:'mainlayouts',
    layoutsDir:__dirname+'/views/layouts/defaultlayouts',
    partialsDir: __dirname+'/views/layouts/partiallayouts'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

app.set('view engine','hbs')
app.listen(port,() => console.log('server started on port 3000.....'))

app.use('/',introductioncontrollers)
app.use('/maxprofit',maxprofit)
app.use('/',wholesalecontrollers)
app.use('/',demandcontrollers)