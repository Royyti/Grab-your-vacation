import express from 'express';
import { getVacationFollowers, isAdmin } from '../bl/vacation.bl.mjs';

const reportRauter = express.Router();

reportRauter.use('/admin', function (req, res, next) {
    try {
        isAdmin(req.headers.id)
            .then(res => {
                if (res) return next();
                throw new Error("Not a valid user!")
            })


    } catch (error) {
        return res.status(401).send(error.message);
    }
})

reportRauter.get('/admin', function (req, res) {
    getVacationFollowers()
        .then(result => res.send(result))
})

export { reportRauter } 