const { Pool } = require("pg");
var pool;
pool = new Pool();

async function getCampus() {
  const query = {
    text: `SELECT C.campus_name, U.university_name FROM campus C JOIN university U ON C.university_id=U.university_id ORDER BY random()`,
  };

  try {
    var result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
}

async function insertScore(userId, data) {
  const query = {
    text: `INSERT INTO game_session (user_id, score, duration, created_at) values ($1, $2, $3, $4) RETURNING *`,
    values: [userId, data.score, data.duration.toString(), data.created_at],
  };

  try {
    var result = await pool.query(query);
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}

async function registerUser(data) {
  const query = {
    text: `INSERT INTO "user" (username, password, country) VALUES($1, $2, $3) RETURNING *;`,
    values: [data.username, data.password, data.country],
  };

  try {
    var result = await pool.query(query);
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}

async function getUserByUsername(username) {
  const query = {
    text: `SELECT * FROM "user" WHERE username = $1`,
    values: [username],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }

  return null;
}

async function getUserData(id) {
  const query = {
    text: `SELECT * FROM "user" WHERE user_id = $1`,
    values: [id],
  };

  try {
    var result = await pool.query(query);
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}

async function getUniversities() {
  const query = {
    text: `SELECT * FROM university`,
  };

  try {
    var result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
}

async function getHighscores() {
  const query = {
    text: `select u.username,g.user_id, g.score, g.duration, g.created_at, u.country from "user" u JOIN game_session g ON u.user_id=g.user_id order by g.score DESC, g.duration ASC;`,
  };

  try {
    var result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
}

async function getHighscoresByCountry(country) {
  const query = {
    text: `
      select u.username, g.user_id, g.score, g.duration, g.created_at, u.country
      from "user" u JOIN game_session g
      ON u.user_id=g.user_id
      where u.country=$1
      order by g.score DESC, g.duration ASC;
    `,
    values: [country]
  };

  try {
    var result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
}

async function getUniversity(id) {
  const query = {
    text: `SELECT * FROM university WHERE university_id = $1`,
    values: [id],
  };

  try {
    var result = await pool.query(query);
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getCampus,
  insertScore,
  registerUser,
  getUserByUsername,
  getUserData,
  getUniversities,
  getUniversity,
  getHighscores,
  getHighscoresByCountry
};
