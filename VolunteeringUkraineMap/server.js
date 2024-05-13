// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/markers', (req, res) => {
    fs.readFile(path.join(__dirname, 'src/assets/markers.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Failed to read markers file'});
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/markers', (req, res) => {
    fs.writeFile(path.join(__dirname, 'src/assets/markers.json'), JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            return res.status(500).json({error: 'Failed to write markers file'});
        }
        res.json({message: 'Markers saved successfully'});
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
