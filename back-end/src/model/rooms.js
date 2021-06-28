if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
}
  
  //createroom
  function create(room) {
    const sql = `
          INSERT INTO rooms (name)
          VALUES (\'${room.name}\')
          RETURNING *
      `;
        console.log(sql);
        return db.one(sql);
  }
  
  //updateuser
  function update(room) {
    const sql = `
          UPDATE rooms
          SET name = \'${room.name}\'
          WHERE id = ${room.id}
          RETURNING *
      `;
    console.log(sql);
    return db.one(sql);
  }

  function getRoomName(room_id){
    const sql = `SELECT * FROM rooms WHERE id = ${room_id}`;
    return db.any(sql);
  }

  module.exports = {
      create,
      update,
      getRoomName
  };