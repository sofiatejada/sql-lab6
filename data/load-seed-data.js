const client = require('../lib/client');
// import our seed data:
const legends = require('./legends.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      legends.map(legend => {
        return client.query(`
                    INSERT INTO legends (name, special_group, type_1, type_2, other_forms, owner_id)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
        [legend.name, legend.special_group, legend.type_1, legend.type_2, legend.other_forms, user.id]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
