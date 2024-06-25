const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('../legalease-34703-firebase-adminsdk-c8iwm-7abfa54524.json');
const lawyerRoutes = require('./services_api/lawyers'); // Adjust path as necessary




const app = express();
const PORT = process.env.PORT || 8081;


app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.use('/api', lawyerRoutes);
//console.log(lawyerRoutes);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "legalease-34703.appspot.com"
});
const bucket = admin.storage().bucket();
const upload = multer({
  storage: multer.memoryStorage()
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
// POST /signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  admin.auth().createUser({
      email: email,
      password: password,
  })
  .then(userRecord => {
      console.log('Successfully created new user:', userRecord.uid);
      res.status(201).send('User created successfully');
  })
  .catch(error => {
      console.error('Error creating new user:', error);
      res.status(500).send(error.message);
  });
});

// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // In practice, you'll use Firebase's client-side authentication to verify passwords
  admin.auth().getUserByEmail(email)
  .then(userRecord => {3
      // Password verification should be handled client-side
      console.log('User fetching successful:', userRecord.uid);
      res.status(200).send('User authenticated');
  })
  .catch(error => {
      console.error('User does not exist:', error);
      res.status(404).send(error.message);
  });
});

//Image storage and retirve firebase
app.post('/api/upload-profile-image', upload.single('profileImage'), async (req, res) => {
  const { lawyerId } = req.body;
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const blob = bucket.file(`lawyer-profiles/${lawyerId}.jpg`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send({ message: err.message });
  });

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    // Update lawyer record in MySQL database with image URL
    const query = 'UPDATE lawyers SET profilePictureUrl = ? WHERE id = ?';
    db.query(query, [publicUrl, lawyerId], (err, results) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'File uploaded successfully', url: publicUrl });
      }
    });
  });

  blobStream.end(req.file.buffer);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

