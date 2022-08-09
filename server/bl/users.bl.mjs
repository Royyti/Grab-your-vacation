import { query } from 'express';
import { runQuery } from './../dal.mjs';
import { UserModel } from '../models/user.model.mjs';

async function update(userObject) {
    userObject['_updateDate'] = new Date();
    delete userObject['is_admin'];

    const sql = `UPDATE`;
    runQuery(sql);
}
async function createUser(userObject) {
    userObject['_updateDate'] = new Date();
    const sql = `INSERT INTO users ( firstName, lastName, username, password, isAdmin)
         VALUES ( ?, ?, ?, MD5(?), 'no')`;
    return runQuery(sql, userObject)

}
async function getCreatedUser(username) {

    const sql = `SELECT * FROM users WHERE username="${username}"`;
    return runQuery(sql, username)
        .then(res => new UserModel(...Object.values(res[0])))

}


async function getUser(user, pass) {
    const sql = `SELECT * FROM users WHERE username=? AND password=MD5(?)`;
    return runQuery(sql, [user, pass])
        .then(res => res.length === 1 ? new UserModel(...Object.values(res[0])) : undefined)

}
async function checkUser(user) {
    const sql = `SELECT * FROM users WHERE username=?`;
    return runQuery(sql, [user])
        .then(res => res.length === 1 ? new UserModel(...Object.values(res[0])) : undefined)

}


export { update, getUser, createUser, checkUser, getCreatedUser }