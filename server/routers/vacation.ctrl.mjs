import express from 'express';
import { createWriteStream, } from "fs"
import { v4 as uuidv4, v4 } from "uuid";
import fileUpload from "express-fileupload";
import { join } from "path";
import {
    getAllVacations,
    updateVacation,
    createVacation,
    deleteVacation,
    followVacation,
    unFollowVacation,
    getUserVacationFollowers,
    getUserVacationFollowersOnly,
    isAdmin
} from './../bl/vacation.bl.mjs';

const vacationRouter = express.Router();

vacationRouter.use(fileUpload({
    createParentPath: true,
}))



vacationRouter.get('/', function (req, res) {

    getAllVacations()
        .then(vacation => res.send(vacation))

})

vacationRouter.use('/follow', function (req, res, next) {
    try {
        isAdmin(req.headers.id)
            .then(res => {
                if (!res) return next();
                throw new Error("Not a valid user!")
            })


    } catch (error) {
        return res.status(401).send("errorMassage", error.message);
    }
})

vacationRouter.get('/follow/:u_id', function (req, res) {
    const userId = req.headers.id;
    getUserVacationFollowers(userId)
        .then(result => res.send(result))
}
)
vacationRouter.get('/follow/only/:u_id', function (req, res) {
    const userId = req.headers.id;
    getUserVacationFollowersOnly(userId)
        .then(result => res.send(result))
}
)

vacationRouter.post('/follow/:vacation_id', function (req, res) {
    const vacationId = req.params.vacation_id;
    const userId = req.headers.id;

    followVacation(userId, vacationId)
        .then(result => res.send(result))
})

vacationRouter.delete('/follow/:vacation_id', function (req, res) {
    const vacationId = req.params.vacation_id;
    const userId = req.headers.id;

    unFollowVacation(userId, vacationId)
        .then(result => res.send(result))
})

vacationRouter.use('/admin', function (req, res, next) {
    try {
        isAdmin(req.headers.id)
            .then(admin => {
                if (admin) return ("A valid user!");
                throw new Error("Not a valid user!")

            })


    } catch (error) {
        return res.status(401).send(error.message);
    }
    next()
})


vacationRouter.delete('/admin/:vacation_id', function (req, res) {
    const vacationId = req.params.vacation_id;
    deleteVacation(Number(vacationId))
        .then(result => res.send(result));

})


vacationRouter.post('/admin', function (req, res) {
    let newFileName;
    if (!req.files) return res.status(400).send("No Picture Uploud!");
    if (req.files) {
        const file = req.files.picture;
        newFileName = v4() + "." + file.name.split(".")[1];
        file.mv('./uploads/' + newFileName);

    }

    // Validations
    const requiredValidations = Object.entries(req.body).filter(e => !e[1]).map(e => e[0] + ' is required');

    if (requiredValidations.length > 0) {
        return res.status(400).send(requiredValidations)
    }
    const { description, destination, dateFrom, dateTo, price } = req.body;
    const picture = newFileName;

    createVacation([description, destination, picture, dateFrom, dateTo, Number(price)])
        .then(result => res.status(200).send(result))


})

vacationRouter.put('/admin/:vacation_id', function (req, res) {
    const vacationId = req.params.vacation_id;
    let newFileName;
    if (!req.files) return res.status(400).send("No Picture Uploud!");
    if (req.files) {
        const file = req.files.picture;
        newFileName = v4() + "." + file.name.split(".")[1];
        file.mv('./uploads/' + newFileName);

    }
    // Validations
    const requiredValidations = Object.entries(req.body).filter(e => !e[1]).map(e => e[0] + ' is required');

    if (requiredValidations.length > 0) {
        return res.status(400).send(requiredValidations)
    }

    const { description, destination, dateFrom, dateTo, price } = req.body;
    const picture = newFileName;

    updateVacation(Number(vacationId), [description, destination, picture, dateFrom, dateTo, Number(price)])
        .then(result => res.send(result))




});

export { vacationRouter }

