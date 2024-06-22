//Implement a route to fetch a single lawyer's details or all lawyers depending on your requirement.

const express = require('express');
const router = express.Router();
const connection = require('./database'); // Adjust path if necessary

// Endpoint to get all lawyer profiles
router.get('/lawyers', (req, res) => {
  connection.query('SELECT * FROM Lawyers', (error, results) => {
    if (error) {
      return res.status(500).send('Error retrieving lawyers from the database');
    }
    res.json(results);
  });
});
console.log("Exporting router");
module.exports = router;
