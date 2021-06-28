if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
}
const imgur = require('imgur');
imgur.setClientId(process.env.imgur);
imgur.setAPIUrl("https://api.imgur.com/3/");
function setImage(user, file) {
  const { id } = user;
  imgur.uploadBase64(file).then(function (json) {
      console.log(`[ bot ] : ${json.link}`);
      const { link } = json;
      const sql = `
          UPDATE users SET photo = $<link>
            WHERE id = $<id>
      `;
      db.any(sql, { link, id });
  })
}

module.exports = {
  setImage
};