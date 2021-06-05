require('../../config.js');
const pgp = require('pg-promise')();

console.log(`process.env.DB_URL ${process.env.DB_URL}`);
db = pgp(process.env.DB_URL);

const schemaSql = `
-- Extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Drop (droppable only when no dependency)
DROP INDEX IF EXISTS complains_idx_text;
DROP INDEX IF EXISTS complains_idx_ts;
DROP TABLE IF EXISTS complains;
DROP INDEX IF EXISTS notifications_idx_ts;
DROP INDEX IF EXISTS notifications_idx_text;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS rooms;
DROP TYPE IF EXISTS state;

-- ENUM
CREATE TYPE state AS ENUM (
    'not home',
    'at home',
    'sleeping'
);

-- Create
CREATE TABLE rooms (
    id          serial PRIMARY KEY NOT NULL,
    name        text NOT NULL
);
CREATE TABLE users (
    id              serial PRIMARY KEY,
    name            text NOT NULL,
    email           text NOT NULL,
    password        text NOT NULL,
    room_id         INT NOT NULL DEFAULT 0,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    color           text NOT NULL,
    reminder        boolean,
    state           state NOT NULL,
    expect          text NOT NULL,
    photo           text
);
CREATE TABLE complains (
    id          serial PRIMARY KEY NOT NULL,
    from_user   INT NOT NULL,
    to_user     INT NOT NULL,
    problem     text NOT NULL,
    reason      text NOT NULL,
    expect      text NOT NULL,
    ts          bigint NOT NULL DEFAULT (extract(epoch from now()))
);
CREATE TABLE notifications (
    id          serial PRIMARY KEY NOT NULL,
    room_id     INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    text        text NOt NULL,
    ts          bigint NOT NULL DEFAULT (extract(epoch from now()))
);

CREATE INDEX complains_idx_ts ON complains USING btree(ts);
CREATE INDEX notifications_idx_ts ON notifications USING btree(ts);
CREATE INDEX notifications_idx_text ON notifications USING gin(text gin_trgm_ops);
`;

const dataSql = `
    -- Populate dummy posts
    INSERT INTO posts (mood, text)
    SELECT
        'Clear',
        'word' || i || ' word' || (i+1) || ' word' || (i+2)
    FROM generate_series(1, 100) AS s(i);

    -- Populate dummy todos
    INSERT INTO todos (mood, text)
    SELECT
        'Clear',
        'Lab' || (i-1) || ' todos' || (i+1)
    FROM generate_series(1, 100) AS s(i);
    INSERT INTO posts (mood, text)
    SELECT
        'Clear',
        'word' || i || ' word' || (i+1) || ' word' || (i+2)
    FROM generate_series(1, 100) AS s(i);
`;

db.none(schemaSql)
  .then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
      console.log('Data populated');
      pgp.end();
    });
  })
  .catch((err) => {
    console.log('Error creating schema', err);
  });
