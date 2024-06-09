const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./legalease-34703-firebase-adminsdk-c8iwm-7abfa54524.json');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
db.collection('test').add({ hello: 'world' })
  .then(docRef => console.log('Document written with ID: ', docRef.id))
  .catch(error => console.error('Error adding document: ', error));
  app.get('/test-firestore', (req, res) => {
    const db = admin.firestore();
    db.collection('test').add({ hello: 'world' })
        .then(docRef => {
            console.log('Document written with ID: ', docRef.id);
            res.send(`Document written with ID: ${docRef.id}`); // This line sends a response back to the browser
        })
        .catch(error => {
            console.error('Error adding document: ', error);
            res.status(500).send('Failed to write document'); // Sends an error message back to the browser
        });
});

