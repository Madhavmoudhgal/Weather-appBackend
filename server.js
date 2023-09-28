const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001; 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/weather', async (req, res) => {
  const { city } = req.query;
  const apiKey = 'f1213f9083fcdb332b9234f0d9f4c0fa';

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
