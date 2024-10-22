const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

const urls = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/comments',
  'https://jsonplaceholder.typicode.com/todos',
];

// Function to fetch data from a URL
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// Function to process data (for simplicity, we’re just converting to JSON and writing to files)
const processAndSaveData = async (data, fileName) => {
  try {
    await writeFileAsync(fileName, JSON.stringify(data, null, 2));
    console.log(`Data successfully saved to ${fileName}`);
  } catch (error) {
    console.error(`Error writing file ${fileName}:`, error);
    throw error;
  }
};

(async () => {
  try {
    // Using Promise.all to fetch data from multiple URLs in parallel
    const allData = await Promise.all(urls.map(fetchData));

    // Save data to different files in parallel
    await Promise.all([
      processAndSaveData(allData[0], 'posts.json'),
      processAndSaveData(allData[1], 'comments.json'),
      processAndSaveData(allData[2], 'todos.json'),
    ]);

    console.log('All data fetched and saved successfully.');
  } catch (error) {
    console.error('Error in processing:', error);
  }
})();
