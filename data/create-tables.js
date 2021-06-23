const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );

                CREATE TABLE special_type (
                  id SERIAL PRIMARY KEY NOT NULL,
                  type VARCHAR(1024) NOT NULL

                );

                CREATE TABLE legends (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(512) NOT NULL,
                    special_type_id INTEGER NOT NULL REFERENCES special_type(id),
                    special_group VARCHAR(512) NOT NULL,
                    type_1 VARCHAR(512) NOT NULL,
                    type_2 VARCHAR(512) NOT NULL,
                    other_forms BOOLEAN NOT NULL,
                    image_url VARCHAR(512) NOT NULL,
                    description VARCHAR(512) NOT NULL,
                    owner_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
