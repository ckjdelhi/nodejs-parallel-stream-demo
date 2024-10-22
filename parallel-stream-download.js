const fs = require('fs');
const axios = require('axios');

// Stream data from URL and write directly to file
const downloadFile = async (url, outputPath) => {
  const writer = fs.createWriteStream(outputPath);

  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading file from ${url}:`, error);
    throw error;
  }
};

(async () => {
  try {
    await Promise.all([
      downloadFile('https://jsonplaceholder.typicode.com/posts', 'posts_stream.json'),
      downloadFile('https://jsonplaceholder.typicode.com/comments', 'comments_stream.json'),
      downloadFile('https://jsonplaceholder.typicode.com/todos', 'todos_stream.json'),
    ]);

    console.log('Files downloaded successfully using streams.');
  } catch (error) {
    console.error('Error in downloading files:', error);
  }
})();
