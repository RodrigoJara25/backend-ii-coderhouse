import express from 'express';
import envs from './config/envs.config.js';
import { engine } from 'express-handlebars';
import { join, __dirname } from "./utils/index.js";
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { connectDb } from './config/db.config.js';
import authRouter from "./routes/session.router.js";
import viewsRouter from "./routes/views.router.js";
import initializePassport from './config/passport.config.js';

// settings
const app = express();
const PORT = envs.port || 3000;

const url = envs.mongodb_url;

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(cookieParser());

// passport
initializePassport();
app.use(passport.initialize());

// routes
app.get("/", (req, res) => {
    res.render("home");
})

app.use("/api/sessions", authRouter);
app.use("/", viewsRouter);

// nos conectamos a la base de datos
connectDb(url);

// server
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})