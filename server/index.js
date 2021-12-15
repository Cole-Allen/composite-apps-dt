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
  `;
  db.query(sql)
  .then(result => {
    res.status(200).json(result.rows);
  });

});

app.get('/employees/id/:id', (req,res,next) => {
  const sql = `
  SELECT *
  FROM "employees"
  WHERE "employeeId" = $1
  `;
  const params = [req.params.id];

  db.query(sql, params)
  .then(result => {
    res.status(200).json(result.rows);
  })
})

app.get('/employees/name', (req,res,next) => {
  console.log(req.query);
  let sql;
  let params;

  if (req.query.name) {
    sql =`
    SELECT *
    FROM "employees"
    WHERE lower("firstName") = lower($1)
    OR lower("lastName") = lower($1)
    `;
    params = [req.query.name];
  } else if (req.query.firstName && req.query.lastName) {
    sql = `
  SELECT *
  FROM "employees"
  WHERE lower("firstName") = lower($1) and lower("lastName") = lower($2)
  `;
    params = [req.query.firstName, req.query.lastName];
  } else if (!req.query.lastName) {
    sql = `
  SELECT *
  FROM "employees"
  WHERE lower("firstName") = lower($1)
  `;
    params = [req.query.firstName]
  } else if (!req.query.firstName) {
    sql = `
  SELECT *
  FROM "employees"
  WHERE  lower("lastName") = lower($1)
  `;
  params = [req.query.lastName];
  }

  db.query(sql, params)
  .then(result => {
    res.status(200).json(result.rows);
  })
  .catch(err => console.log(err));
});

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
