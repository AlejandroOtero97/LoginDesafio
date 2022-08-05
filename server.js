import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { passportInitialize, passportSession } from './middlewares/passport.js';
import { faker } from '@faker-js/faker'
import { auth } from './middlewares/middlewares.js';

import MongoStore from 'connect-mongo';
import session from 'express-session';
import express from 'express';

import socketController from './controllers/socketController.js';

import apiControllers from './controllers/apiControllers.js';
import webControllers from './controllers/webController.js';
import authenticationController from './controllers/authenticationController.js';

import yargsParser from 'yargs/yargs';

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const yargs = yargsParser(process.argv.slice(2))

app.get("/api/productos-test", (req, res) => {
    faker.locale = "en";
    const productosFaker = [];

  for (let i = 0; i < 5; i++) {
    productosFaker.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(100, 3000, 0, '$'),
      thumbnail: faker.image.business()
    });
  }
  res.json(productosFaker);
}); 

const mongoStore = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Alejandro:otero@coderhouse.av1btb7.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'foo',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}

const sessionHandler = session(mongoStore); 
app.use(sessionHandler)
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passportInitialize)
app.use(passportSession)

const { loginController, succesLogin, failureLogin, registerController, failureSignup, successSignup, logout } = authenticationController;
const { getName, getInfo } = apiControllers;
const { inicio, login, logoutB, signup, error, info } = webControllers;

app.post('/api/login', loginController)
app.get('/api/successLogin', succesLogin)
app.get('/api/failureLogin', failureLogin)
app.post('/api/signup', registerController);
app.get('/api/failureSignup', failureSignup)
app.get('/api/successSignup', successSignup)
app.post('/api/logout', logout)
app.get('/api/login', getName);
app.get('/api/getInfo', getInfo);

app.get('/', auth, inicio)
app.get('/login', login)
app.get('/logout', logoutB)
app.get('/signup', signup)
app.get('/error', error)
app.get('/info', auth, info)

io.on('connection', socket => socketController(socket, io))

const { port } = yargs
    .alias({p: 'port'})
    .default({port: 8080})
.argv

const server = httpServer.listen(port, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})