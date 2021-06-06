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

  module.exports = {
      create,
      update
  };