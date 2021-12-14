require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);

app.use(express.json());

app.get('/employees', (req,res,next) => {
  console.log('Get list');
  const sql = `
  SELECT
    *
  FROM
    "employees"
  ORDER BY "employeeId"
  `
  db.query(sql)
  .then(result => {
    res.status(200).json(result.rows);
  });

});

app.get('/employees/id/:id', (req,res,next) => {
  console.log(req.params.id);
  res.status(201).json({ Testing: req.params.id});
})

app.get('/employees/name/:name', (req, res, next) => {
  console.log(req.params.name);
  res.status(201).json({ Testing: req.params.name });
})

app.put('/employees/:id', (req,res,next) => {
  console.log(req.body.firstName);
  console.log(req.body.lastName);

  const sql = `
  UPDATE
    "employees"
  SET
    "firstName" = $1,
    "lastName" = $2
  WHERE
    "employeeId" = $3
  `;

  const params =[req.body.firstName, req.body.lastName, req.params.id];

  db.query(sql, params)
    .then(result => {
      res.status(200).json({Status: 'Success!'});
    });

});

app.post('/employees', (req,res,next) => {
  const sql = `
  INSERT INTO
    "employees" ("firstName", "lastName")
  VALUES
    ($1, $2)
  `;

  const params = [req.body.firstName, req.body.lastName];

  db.query(sql, params)
  .then(result => {
    res.status(200).json({Status: 'Complete'});
  });

});

app.delete('/employees/:id', (req,res,next) => {
  const sql = `
    DELETE FROM
      "employees"
    WHERE
      "employeeId" = $1
  `;

  const params = [req.params.id];

  db.query(sql, params)
  .then(result => {
    res.status(200).json({Status: 'Completed'});
  });

});

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
