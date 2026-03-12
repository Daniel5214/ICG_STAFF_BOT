const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

const firebaseKeyRaw = process.env.FIREBASE_KEY;

if (!firebaseKeyRaw) {
  console.error("CHYBA: V Renderu chybí proměnná FIREBASE_KEY!");
  process.exit(1); 
}

try {
  const serviceAccount = JSON.parse(firebaseKeyRaw);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log("Firebase úspěšně inicializováno.");
} catch (error) {
  console.error("CHYBA při parsování JSONu v FIREBASE_KEY:", error.message);
  process.exit(1);
}

const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('ICG STAFF BOT běží!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server naslouchá na portu ${PORT}`);
});
