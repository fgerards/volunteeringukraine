const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const markers = JSON.parse(event.body);
    const filePath = path.resolve(__dirname, '../src/assets/markers.json');
    fs.writeFileSync(filePath, JSON.stringify({ words: markers }, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Markers saved successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save markers' }),
    };
  }
};
