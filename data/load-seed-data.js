const client = require('../lib/client');
// import our seed data:
const legends = require('./legends.js');
const usersData = require('./users.js');
const typesData = require('./special-types.js');
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

    const special_types_response = await Promise.all(
      typesData.map(type => {
        return client.query(`
                      INSERT INTO special_type (type)
                      VALUES ($1)
                      RETURNING *;
                  `,
        [type.type]);
      })
    );

    //we're mapping through the response array and pick out the first item from the array
    const types = special_types_response.map(response => {
      return response.rows[0];
    });

    console.log(types);

    await Promise.all(
      legends.map(legend => {

        const matchedType = types.find(item => {
          return item.type === legend.special_type;
        });

        return client.query(`
                    INSERT INTO legends (name, special_type_id, special_group, type_1, type_2, other_forms, owner_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);
                `,
        [legend.name, matchedType.id, legend.special_group, legend.type_1, legend.type_2, legend.other_forms, user.id]);
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
