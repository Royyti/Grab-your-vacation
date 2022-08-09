import { query } from 'express';
import { runQuery } from './../dal.mjs';
import { VacationModel } from '../models/vacation.model.mjs';



async function getAllVacations() {

  const sql = `SELECT * FROM vacation ORDER BY dateFrom`;

  return runQuery(sql)
    .then(res => res.map(v => new VacationModel(...Object.values(v))));
}

async function createVacation(vacationObject) {
  const sql = `INSERT INTO vacation(description, destination, picture, dateFrom, dateTo, price, followers) VALUES(?,?,?,?,?,?,0)`;
  return runQuery(sql, vacationObject)

}
function updateVacation(v_id, vacationObject) {
  vacationObject['_updateDate'] = new Date();
  const sql = `UPDATE vacation SET description=?, destination = ?, picture=?, dateFrom = ?, dateTo = ?, price = ? WHERE vacation.id = ${v_id};`;
  return runQuery(sql, vacationObject);
}
async function deleteVacation(v_id) {
  const sql = `DELETE FROM vacations_follwers WHERE vacations_follwers.v_id = ${v_id}`;
  const sql2 = `DELETE FROM vacation WHERE vacation.id = ${v_id}`;
  return runQuery(sql).then(runQuery(sql2))

}

async function followVacation(u_id, v_id) {
  const sql = `INSERT INTO vacations_follwers(u_id, v_id) VALUES(?, ?)`;
  const sql2 = `UPDATE vacation SET followers = (followers + 1) WHERE vacation.id = ${v_id}`;
  return runQuery(sql, [u_id, v_id])
    .then(runQuery(sql2))
    .then(res => res);
}


async function unFollowVacation(u_id, v_id) {
  const sql = `DELETE FROM vacations_follwers WHERE vacations_follwers.u_id = ? AND vacations_follwers.v_id = ?`;
  const sql2 = `UPDATE vacation SET followers = (followers - 1) WHERE vacation.id = ${v_id}`;
  return runQuery(sql, [u_id, v_id])
    .then(runQuery(sql2));

}

async function getVacationFollowers() {
  const sql = `SELECT vacation.*, vacations_follwers.v_id FROM vacation INNER JOIN vacations_follwers ON id = vacations_follwers.v_id GROUP BY vacations_follwers.v_id;`;
  return runQuery(sql)
  // .then(res => res.map(res => res.destenation, res.followers));
}

async function getUserVacationFollowers(u_id) {
  const sql = `SELECT * FROM vacation Left JOIN vacations_follwers ON id = vacations_follwers.v_id AND vacations_follwers.u_id = ? ORDER BY vacations_follwers.v_id DESC,vacation.dateFrom ;`;
  return runQuery(sql, [u_id]);
}
async function getUserVacationFollowersOnly(u_id) {
  const sql = `SELECT * FROM vacation INNER JOIN vacations_follwers ON id = vacations_follwers.v_id AND vacations_follwers.u_id = ? ORDER BY vacations_follwers.v_id DESC,vacation.dateFrom ;`;
  return runQuery(sql, [u_id]);
}

async function isAdmin(u_id) {
  const sql = `SELECT * FROM users WHERE id=?;`;
  return runQuery(sql, u_id)
    .then(res => res[0].isAdmin === "yes" ? true : false)
}

export {
  updateVacation,
  getAllVacations,
  createVacation,
  deleteVacation,
  followVacation,
  unFollowVacation,
  getVacationFollowers,
  getUserVacationFollowers,
  getUserVacationFollowersOnly,
  isAdmin
}
