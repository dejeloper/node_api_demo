const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// Mysql 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_mysql'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// All Customers
app.get('/customers', (req, res) => {
  const sql = 'SELECT * FROM customers';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
  // res.send('List of customers');
});

app.get('/customers/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM customers WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send(`There are no customers with that id: ${id}`);
    }
  });

  //res.send('Get customers by id')
});

app.post('/customers', (req, res) => {
  const sql = 'INSERT INTO customers SET ?';

  const customerObj = {
    name: req.body.name,
    city: req.body.city
  }

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Customer created!');
  });

  //res.send('New Customer')
});

app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE customers set name = '${name}', city = '${city}' WHERE id = ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Customer Updated!');
  });

  //res.send('Update Customer')
});

app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customers WHERE id = ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Customer Deleted!');
  });

  //res.send('Delete Customer')
});


// Ckeck Connect
connection.connect(error => {
  if (error) throw error;
  console.log("Database server running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
