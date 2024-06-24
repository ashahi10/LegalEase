//Implement a route to fetch a single lawyer's details or all lawyers depending on your requirement.

const express = require('express');
const router = express.Router();
const connection = require('./database'); // Adjust path if necessary

// Endpoint to get all lawyer profiles
router.get('/lawyers/random', (req, res) => {
  const sqlQuery = `
    SELECT 
      Lawyers.LawyerID, 
      Lawyers.FirstName, 
      Lawyers.LastName, 
      Lawyers.Email, 
      Lawyers.Phone, 
      Profiles.Education, 
      Profiles.Experience, 
      Profiles.Specialization, 
      Profiles.PhotoURL
    FROM Lawyers
    JOIN Profiles ON Lawyers.LawyerID = Profiles.LawyerID
    ORDER BY RAND() 
    LIMIT 2
  `;

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('SQL error:', error);
      return res.status(500).send('Error retrieving lawyers from the database');
    }
    res.json(results);
  });
});

console.log("Exporting router");
module.exports = router;
