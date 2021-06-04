if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  //getsingleuser
  function getsingleuser(id) {
    
    const sql = `
          SELECT *
          FROM users
          WHERE id = ${id}
      `;
    console.log(sql);
    return db.any(sql);
  }
  //getroomusers
  function getroomusers(room_id) {
    const sql = `
          SELECT *
          FROM users
          WHERE room_id = ${room_id}
      `;
    console.log(sql);
    return db.any(sql);
  }
  //createuser
  function createuser(user) {
    const sql = `
          INSERT INTO users (name,email,password,color,reminder,state,expect,photo)
          VALUES (${user.name},${user.email},${user.password},${user.color},${user.reminder},${user.state},${user.expect},${user.photo})
          RETURNING *
      `;
    return db.one(sql);
  }
  //updateuser
  function updateuser(user) {
    const sql = `
          UPDATE users
          SET name = ${user.name}, email = ${user.email}, password=${user.passsword}, color = ${user.color}, remider = ${user.reminder}, state = ${user.state}, expect = ${user.expect}, photo = ${user.photo}
          WHERE id = ${user.id}
          RETURNING *
      `;
    return db.one(sql);
  }
  
  

module.exports = {
  getsingleuser,
  getroomusers,
  createuser,
  updateuser
};