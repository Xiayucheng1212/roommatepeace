if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  //checklogin
  function checklogin(user) {
    const sql = `
          SELECT *
          FROM users
          WHERE email = \'${user.email}\' AND password = \'${user.password}\'
      `;
    console.log(sql);
    return db.any(sql);
  }
  
  module.exports = {
      checklogin,
  };