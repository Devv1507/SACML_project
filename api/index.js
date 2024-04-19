//importing customized express-app from './app.js';
const app = require('./app.js');

const PORT = process.env.PORT || 3000; // define the port to use

// an asyncronic function to test for errors during connection
async function main() {
  try {
    // Initializing the server, configurated to listen on the defined port
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();