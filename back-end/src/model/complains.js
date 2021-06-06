if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  //getroomcomplains
  function getcomplains(to_user) {
    const sql = `
          SELECT *
          FROM complains
          WHERE to_user = \'${to_user}\'
      `;
    console.log(sql);
    return db.any(sql);
  }
  
  //createcomplain
  function create(complain) {
    const sql = `
          INSERT INTO complains (from_user,to_user,problem,reason,expect)
          VALUES (\'${complain.from_user}\',\'${complain.to_user}\',\'${complain.problem}\',\'${complain.reason}\',\'${complain.expect}\')
          RETURNING *
      `;
        console.log(sql);
        return db.one(sql);
  }
  //deletecomplains
  function deletecomplains(id) {
    const sql = `
        DELETE 
        FROM complains
        WHERE id = \'${id}\'
      `;
    console.log(sql);
    return db.any(sql);
  }
  
  module.exports = {
    getcomplains,
    create,
    deletecomplains
  };