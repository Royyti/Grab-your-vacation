import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.mjs';
import { update, getUser, createUser, checkUser, getCreatedUser } from './../bl/users.bl.mjs';
import { promisify } from 'util';
import { env } from 'process';
import { isAdmin } from '../bl/vacation.bl.mjs';

const authRouter = express.Router();

process.env.jwtsecret = 'aasdj23iodj23dcj23podfjk23pfj23p';

authRouter.post(`/login`, function (req, res) {
    const { username, password } = req.body;

    getUser(username, password)
        .then(user => {
            if (user) {
                const token = jwt.sign({
                    user: user.username
                }, process.env.jwtsecret);
                const userObj = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    token: token
                }
                res.send(userObj);
            } else {
                res.status(400).send("bad username or password!");
            }
        });


})

authRouter.post(`/register`, function (req, res) {
    const { firstName, lastName, username, password } = req.body;
    checkUser(username)
        .then(user => {
            if (user) {
                res.status(400).send("Existing user in the system");
            }
            else {
                createUser([firstName, lastName, username, password])
                    .then(res => getCreatedUser(username))
                    .then(user => {
                        const token = jwt.sign({
                            user: username
                        }, process.env.jwtsecret);
                        const userObj = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            isAdmin: user.isAdmin,
                            token: token
                        }
                        res.send(userObj);
                    })



            }
        })
})
export { authRouter };