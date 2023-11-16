const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Exchange = require('./models/Exchange');
const cron = require('node-cron');
var cors = require('cors')

const apiKey = "FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9";


mongoose.connect('mongodb://127.0.0.1:27017/cryptotrackerDB');
// Use CORS 

app.use(cors());
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Function to fetch data from CoinAPI and store it in MongoDB
const fetchDataAndStoreInDB = async () => {
  try {
    const apiUrl = `https://rest.coinapi.io/v1/exchanges?apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);

    const exchanges = response.data;

    // Store exchanges in the database
    await Exchange.deleteMany(); // Clear existing data
    await Exchange.insertMany(exchanges);
    console.log('Exchange data updated in the database.');
  } catch (error) {
    console.error('Error fetching and storing exchanges:', error);
  }
};

// Schedule a cron job to run fetchDataAndStoreInDB every 3 minute
cron.schedule('*/3 * * * *', async () => {
  try {
    await fetchDataAndStoreInDB();
  } catch (error) {
    console.error('Error running cron job:', error);
  }
});

// Endpoint to fetch all coins data from the database
app.get('/api/coins', async (req, res) => {
  try {
    const coinsData = await Exchange.find({});
    res.status(200).json(coinsData);
    console.log("Data Fetched")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
