//importing customized express-app from './app.js';
const app = require('./app.js');
const {createAdminUser} = require('./config/createAdmin')

const PORT = process.env.PORT || process.env.SERVER_PORT;  // define the port to use, first the production

// an asyncronic function to test for errors during connection
async function main() {
  try {
    await createAdminUser();
    // Initializing the server, configurated to listen on the defined port
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();