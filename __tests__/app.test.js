require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });


    test('GET', async() => {
      const expectation = [
        {
          'id': 1,
          'name': 'Galarian Articuno',
          'special_type_id': 1,
          'special_group': 'Galarian Legendary Birds',
          'type_1': 'Psychic',
          'type_2': 'Flying',
          'other_forms': true,
          'owner_id': 1
        },
        {
          'id': 2,
          'name': 'Galarian Zapdos',
          'special_type_id': 1,
          'special_group': 'Glarian Legendary Birds',
          'type_1': 'Fighting',
          'type_2': 'Flying',
          'other_forms': true,
          'owner_id': 1
        },
        {
          'id': 3,
          'name': 'Galarian Moltres',
          'special_type_id': 1,
          'special_group': 'Galarian Legendary Birds',
          'type_1': 'Dark',
          'type_2': 'Flying',
          'other_forms': true,
          'owner_id': 1
        },
        {
          'id': 4,
          'name': 'Cosmog',
          'special_type_id': 2,
          'special_group': 'Other',
          'type_1': 'Psychic',
          'type_2': 'None',
          'other_forms': false,
          'owner_id': 1
        },
        {
          'id': 5,
          'name': 'Tapu Koko',
          'special_type_id': 1,
          'special_group': 'Guardian Dieties',
          'type_1': 'Electric',
          'type_2': 'Fairy',
          'other_forms': false,
          'owner_id': 1
        },
        {
          'id': 6,
          'name': 'Tapu Lele',
          'special_type_id': 1,
          'special_group': 'Guardian Dieties',
          'type_1': 'Psychic',
          'type_2': 'Fairy',
          'other_forms': false,
          'owner_id': 1
        },
        {
          'id': 7,
          'name': 'Tapu Bulu',
          'special_type_id': 1,
          'special_group': 'Guardian Dieties',
          'type_1': 'Grass',
          'type_2': 'Fairy',
          'other_forms': false,
          'owner_id': 1
        },
        {
          'id': 8,
          'name': 'Tapu Fini',
          'special_type_id': 1,
          'special_group': 'Guardian Dieties',
          'type_1': 'Water',
          'type_2': 'Fairy',
          'other_forms': false,
          'owner_id': 1
        },
        {
          'id': 9,
          'name': 'Celebi',
          'special_type_id': 3,
          'special_group': 'N/A',
          'type_1': 'Psychic',
          'type_2': 'Grass',
          'other_forms': false,
          'owner_id': 1
        },
        {
          'id': 10,
          'name': 'Mega Diancie',
          'special_type_id': 3,
          'special_group': 'N/A',
          'type_1': 'Rock',
          'type_2': 'Fairy',
          'other_forms': true,
          'owner_id': 1
        }
      ];

      const data = await fakeRequest(app)
        .get('/legends')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('POST', async() => {
      const data = await fakeRequest(app)
        .post('/legends')
        .send({
          name: 'Pikachu',
          special_type_id: 2,
          special_group: 'none',
          type_1: 'electric',
          type_2: 'none',
          other_forms: false
        })
        .expect('Content-Type', /json/)
        .expect(200);

      const dataLegends = await fakeRequest(app)
        .get('/legends')
        .expect('Content-Type', /json/)
        .expect(200);

      const postedLegend = {
        'id': 11,
        'name': 'Pikachu',
        'special_type_id': 2,
        'special_group': 'none',
        'type_1': 'electric',
        'type_2': 'none',
        'other_forms': false,
        'owner_id': 1
      };

      const newLegend = {
        'id': 11,
        'name': 'Pikachu',
        'special_type_id': 2,
        'special_group': 'none',
        'type_1': 'electric',
        'type_2': 'none',
        'other_forms': false,
        'owner_id': 1
      };

      expect(data.body).toEqual(postedLegend);
      expect(dataLegends.body).toContainEqual(newLegend);
    });

    test('PUT', async() => {
      const data = await fakeRequest(app)
        .put('/legends/10')
        .send({
          name: 'Cosmoem',
          special_type_id: 2,
          special_group: 'Other',
          type_1: 'Psychic',
          type_2: 'None',
          other_forms: false
        })
        .expect('Content-Type', /json/)
        .expect(200);

      const dataLegends = await fakeRequest(app)
        .get('/legends')
        .expect('Content-Type', /json/)
        .expect(200);

      const newLegend = {
        'id': 10,
        'name': 'Cosmoem',
        'special_type_id': 2,
        'special_group': 'Other',
        'type_1': 'Psychic',
        'type_2': 'None',
        'other_forms': false,
        'owner_id': 1
      };

      expect(data.body).toEqual(newLegend);
      expect(dataLegends.body).toContainEqual(newLegend);
    });

    test('DELETE', async() => {
      await fakeRequest(app)
        .delete('/legends/10')
        .expect('Content-Type', /json/)
        .expect(200);

      const dataLegends = await fakeRequest(app)
        .get('/legends')
        .expect('Content-Type', /json/)
        .expect(200);

      const newLegend = {
        'id': 10,
        'name': 'Cosmoem',
        'special_type': 'Legendary Pokemon',
        'special_group': 'Other',
        'type_1': 'Psychic',
        'type_2': 'None',
        'other_forms': false,
        'owner_id': 1
      };

      expect(dataLegends.body).not.toContainEqual(newLegend);
    });

    test('GET by ID', async() => {

      const dataLegends = await fakeRequest(app)
        .get('/legends/9')
        .expect('Content-Type', /json/)
        .expect(200);

      const newLegend = [{
        'id': 9,
        'name': 'Celebi',
        'special_type_id': 3,
        'special_group': 'N/A',
        'type_1': 'Psychic',
        'type_2': 'Grass',
        'other_forms': false,
        'owner_id': 1
      }];
      expect(dataLegends.body).toEqual(newLegend);
    });

  });
});
