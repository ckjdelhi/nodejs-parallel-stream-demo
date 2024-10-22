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

// Function to process data (convert to JSON and save to file)
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
    // Fetch and save data sequentially (one after the other)
    const posts = await fetchData(urls[0]);
    await processAndSaveData(posts, 'posts_sequential.json');

    const comments = await fetchData(urls[1]);
    await processAndSaveData(comments, 'comments_sequential.json');

    const todos = await fetchData(urls[2]);
    await processAndSaveData(todos, 'todos_sequential.json');

    console.log('All data fetched and saved sequentially.');
  } catch (error) {
    console.error('Error in processing:', error);
  }
})();

