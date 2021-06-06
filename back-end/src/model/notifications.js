if (!global.db) {
  const pgp = require('pg-promise')();
  console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
  db = pgp(process.env.DB_URL);
}
//getroomnotifications
function getroomnotifications(room_id) {
  const sql = `
        SELECT *
        FROM notifications
        WHERE room_id = \'${room_id}\'
        ORDER BY ts DESC
        LIMIT 3
    `;
  console.log(sql);
  return db.any(sql);
}

//createnotification
function create(notification) {
  const sql = `
        INSERT INTO notifications (room_id,text)
        VALUES (\'${notification.room_id}\',\'${notification.text}\')
        RETURNING *
    `;
  	console.log(sql);
  	return db.one(sql);
}

module.exports = {
  	getroomnotifications,
	create,
};