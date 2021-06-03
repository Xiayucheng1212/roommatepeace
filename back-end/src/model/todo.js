if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  //getTodos
  function getTodos(unaccomplishedOnly = 1,searchText = '') {
    const where = [];
    if (searchText) where.push(`text ILIKE '%$1:value%'`);
    if (unaccomplishedOnly == 1) where.push(`"doneTs" = 0`);
    const sql = `
          SELECT *
          FROM todos
          ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
          ORDER BY id DESC
          LIMIT 10
      `;
    console.log(sql);
    return db.any(sql, [searchText]);
  }
  //createTodos
  function createTodo(mood, text) {
    const sql = `
          INSERT INTO todos ($<this:name>)
          VALUES ($<mood>, $<text>)
          RETURNING *
      `;
    return db.one(sql, { mood, text });
  }
  //accomplishTodos
  function accomplishTodo(id) {
    const sql = `
          UPDATE todos 
          SET "doneTs" = 1
          WHERE id= $<id>
          RETURNING *
      `;
    return db.one(sql, { id});
  }
  

module.exports = {
  getTodos,
  createTodo,
  accomplishTodo
};