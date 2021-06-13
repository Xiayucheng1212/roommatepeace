if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    console.log("12311111111111111111111111");
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
          SELECT users.name AS user_name, users.email, users.room_id, users.password, users.color, users.reminder, users.state,users.expect, users.photo, rooms.name AS room_name
          FROM users
          INNER JOIN rooms
          ON users.room_id = rooms.id
          WHERE rooms.id = ${room_id}
      `;
    //console.log(sql);
    return db.any(sql);
  }
  //createuser
  function createuser(user) {
    const sql = `
          INSERT INTO users (name,email,password,color,reminder,state,expect,photo)
          VALUES (\'${user.name}\',\'${user.email}\',\'${user.password}\',\'${user.color}\',\'${user.reminder}\',\'at home\',\'nothing\',\'${user.photo}\')
          RETURNING *
      `;
      console.log(sql);
    return db.one(sql);
  }
  //updateuser
  function updateuser(user) {
    const sql = `
          UPDATE users
          SET name = \'${user.name}\', email = \'${user.email}\', password=\'${user.password}\', color = \'${user.color}\', reminder = \'${user.reminder}\', state = \'${user.state}\', expect = \'${user.expect}\', photo = \'${user.photo}\'
          WHERE id = ${user.id}
          RETURNING *
      `;
    console.log(sql);
    return db.one(sql);
  }
  
  //update user room
  function updateuserroom(user) {
    const sql = `
          UPDATE users
          SET room_id = \'${user.room_id}\'
          WHERE id = ${user.id}
          RETURNING *
      `;
    console.log(sql);
    return db.one(sql);
  }
  

module.exports = {
  getsingleuser,
  getroomusers,
  createuser,
  updateuser,
  updateuserroom
};