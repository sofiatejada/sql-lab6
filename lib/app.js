const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/legends', async(req, res) => {
  try {
    const data = await client.query('SELECT * from legends');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/legends/:id', async(req, res) => {
  try {
    const data = await client.query('SELECT * from legends where legends.id=$1', 
      [req.params.id]
    );
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.post('/legends', async (req, res) => {
  try {
    const data = await client.query(`
    INSERT INTO legends (name, special_type, special_group, type_1, type_2, other_forms, owner_id)
    VALUES ($1, $2, $3, $5, $6, 1)
    RETURNING *`, [req.body.name, req.body.special_type, req.body.special_group, req.body.type_1, req.body.type_2, req.body.other_forms]);

    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
