//importing default app from './app.js';
const app = require('./app.js');
//const {sequelize} = require('./db/connect/database.js');

const PORT = 3000; // define the port to use

// an asyncronic function to test for errors during connection
async function main() {
  try {
    //await sequelize.sync({ force: true }); // { force: true } enables the re-creation of a existing table
    // API listen route, configurated to listen on the defined port
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Something happens");
  }
}

main();