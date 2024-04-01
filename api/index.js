//importing default app from './app.js';
const app = require('./app.js');

const PORT = 3000; // define the port to use

// an asyncronic function to test for errors during connection
async function main() {
  try {
    // API listen route, configurated to listen on the defined port
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Something happens");
  }
}

main();