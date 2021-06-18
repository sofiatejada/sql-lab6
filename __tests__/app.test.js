require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

const legends = [
  {
    name: 'Galarian Articuno',
    special_type: 'Sub-Legendary',
    special_group: 'Galarian Legendary Birds',
    type_1: 'Psychic',
    type_2: 'Flying',
    other_forms: true,
  },
  {
    name: 'Galarian Zapdos',
    special_type: 'Sub-Legendary',
    special_group: 'Glarian Legendary Birds',
    type_1: 'Fighting',
    type_2: 'Flying',
    other_forms: true,
  },
  {
    name: 'Galarian Moltres',
    special_type: 'Sub-Legendary',
    special_group: 'Galarian Legendary Birds',
    type_1: 'Dark',
    type_2: 'Flying',
    other_forms: true,
  },
  {
    name: 'Cosmog',
    special_type: 'Legendary',
    special_group: 'Other',
    type_1: 'Psychic',
    type_2: 'None',
    other_forms: false,
  },
  {
    name: 'Tapu Koko',
    special_type: 'Sub-Legendary',
    special_group: 'Guardian Dieties',
    type_1: 'Electric',
    type_2: 'Fairy',
    other_forms: false,
  },
  {
    name: 'Tapu Lele',
    special_type: 'Sub-Legendary',
    special_group: 'Guardian Dieties',
    type_1: 'Psychic',
    type_2: 'Fairy',
    other_forms: false,
  },
  {
    name: 'Tapu Bulu',
    natid: 787,
    special_type: 'Sub-Legendary',
    special_group: 'Guardian Dieties',
    type_1: 'Grass',
    type_2: 'Fairy',
    other_forms: false,
  },
  {
    name: 'Tapu Fini',
    special_type: 'Sub-Legendary',
    special_group: 'Guardian Dieties',
    type_1: 'Water',
    type_2: 'Fairy',
    other_forms: false,
  },
  {
    name: 'Celebi',
    special_type: 'Mythical',
    special_group: 'N/A',
    type_1: 'Psychic',
    type_2: 'Grass',
    other_forms: false,
  },
  {
    name: 'Mega Diancie',
    special_type: 'Mythical',
    special_group: 'N/A',
    type_1: 'Rock',
    type_2: 'Fairy',
    other_forms: true,
  },
];


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

    // test('returns animals', async() => {

    //   const expectation = [
    //     {
    //       'id': 1,
    //       'name': 'bessie',
    //       'coolfactor': 3,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 2,
    //       'name': 'jumpy',
    //       'coolfactor': 4,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 3,
    //       'name': 'spot',
    //       'coolfactor': 10,
    //       'owner_id': 1
    //     }
    //   ];

    //   const data = await fakeRequest(app)
    //     .get('/animals')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });

    const legends = [
      {
        name: 'Galarian Articuno',
        special_type: 'Sub-Legendary',
        special_group: 'Galarian Legendary Birds',
        type_1: 'Psychic',
        type_2: 'Flying',
        other_forms: true,
      },
      {
        name: 'Galarian Zapdos',
        special_type: 'Sub-Legendary',
        special_group: 'Glarian Legendary Birds',
        type_1: 'Fighting',
        type_2: 'Flying',
        other_forms: true,
      },
      {
        name: 'Galarian Moltres',
        special_type: 'Sub-Legendary',
        special_group: 'Galarian Legendary Birds',
        type_1: 'Dark',
        type_2: 'Flying',
        other_forms: true,
      },
      {
        name: 'Cosmog',
        special_type: 'Legendary',
        special_group: 'Other',
        type_1: 'Psychic',
        type_2: 'None',
        other_forms: false,
      },
      {
        name: 'Tapu Koko',
        special_type: 'Sub-Legendary',
        special_group: 'Guardian Dieties',
        type_1: 'Electric',
        type_2: 'Fairy',
        other_forms: false,
      },
      {
        name: 'Tapu Lele',
        special_type: 'Sub-Legendary',
        special_group: 'Guardian Dieties',
        type_1: 'Psychic',
        type_2: 'Fairy',
        other_forms: false,
      },
      {
        name: 'Tapu Bulu',
        natid: 787,
        special_type: 'Sub-Legendary',
        special_group: 'Guardian Dieties',
        type_1: 'Grass',
        type_2: 'Fairy',
        other_forms: false,
      },
      {
        name: 'Tapu Fini',
        special_type: 'Sub-Legendary',
        special_group: 'Guardian Dieties',
        type_1: 'Water',
        type_2: 'Fairy',
        other_forms: false,
      },
      {
        name: 'Celebi',
        special_type: 'Mythical',
        special_group: 'N/A',
        type_1: 'Psychic',
        type_2: 'Grass',
        other_forms: false,
      },
      {
        name: 'Mega Diancie',
        special_type: 'Mythical',
        special_group: 'N/A',
        type_1: 'Rock',
        type_2: 'Fairy',
        other_forms: true,
      },
    ];

    test('stuff', async() => {
      const data = await fakeRequest(app)
        .post('/legends')
        .send({
          name: 'Pikachu',
          special_type: 'none',
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

      const newLegend = {
        'id': 11,
        'name': 'Pikachu',
        'special_type': 'none',
        'special_group': 'none',
        'type_1': 'electric',
        'type_2': 'none',
        'other_forms': false,
        'owner_id': 1
      };

      expect(data.body).toEqual(newLegend);
      expect(dataLegends.body).toContainEqual(newLegend);
    });



  });
});
