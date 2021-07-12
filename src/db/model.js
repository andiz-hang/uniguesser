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

async function insertScore(data) {
    console.log((data.duration).toString())
    const query = {
        text: `INSERT INTO game_session (user_id, score, duration, created_at) values ($1, $2, $3, $4) RETURNING *`,
        values: [data.user_id, data.score, (data.duration).toString(), data.created_at]
    }

    try {
        var result = await pool.query(query)
        return result.rows[0];
    } catch (err) {
        console.error(err)
        return false;
    }
}

module.exports = {
    getCampus,
    insertScore
}