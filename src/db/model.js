const { Pool } = require('pg');
var pool;
pool = new Pool();


async function getCampus() {
    const query = {
        text: `SELECT * FROM campus OFFSET (SELECT FLOOR(random()*(COUNT(campus_id))) FROM campus) LIMIT 1`
    }

    try {
        var result = await pool.query(query)
        return result.rows[0];
    } catch {
        return false;
    }
}



module.exports = {
    getCampus
}