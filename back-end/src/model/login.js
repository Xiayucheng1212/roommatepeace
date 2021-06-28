if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  //checklogin
  function checklogin(user) {
    const { email, password } = user;
    const sql = `
          SELECT *
          FROM users
          WHERE email = $<email> AND password = $<password>
      `;
    console.log(sql);
    return db.any(sql, { email, password });
  }
  
  module.exports = {
      checklogin,
  };