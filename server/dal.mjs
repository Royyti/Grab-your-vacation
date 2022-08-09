// data-access-layer
import { createConnection } from 'mysql';
import { promisify } from 'util';

var con = createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: 'vacation-student_id'
})

con.connect(function (err) {
    if (err) throw err;
    console.log("SQL Connected!");
});

const queryAsync = promisify(con.query).bind(con);

async function runQuery(sql, values) {
    return queryAsync(sql, values);
}

export { runQuery }
