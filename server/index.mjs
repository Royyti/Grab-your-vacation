import express from 'express';
import jwt from 'jsonwebtoken';
import { vacationRouter, authRouter, reportRauter } from './routers/index.mjs'

const app = express();

const PORT = 8888;

process.env.jwtsecret = 'aasdj23iodj23dcj23podfjk23pfj23p';




app.use('/', express.static('static'));
app.use('/images', express.static('uploads'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use('/api/auth', authRouter);

app.use('*', function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(400).send("No Token");

    const [tokenType, jwtToken] = token.split(' ');
    try {
        jwt.verify(jwtToken, process.env.jwtsecret);
    } catch (ex) {
        return res.status(400).send(ex);
    }
    const { user } = jwt.decode(jwtToken);
    req.body.user = user;
    next();


})

app.use(`/api/vacation`, vacationRouter);
app.use('/api/report', reportRauter);

app.listen(PORT, () => console.log(`server started at port ${PORT}`))

