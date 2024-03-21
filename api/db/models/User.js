import {DataTypes} from 'sequelize';
import {sequelize} from '../connect/database.js';

export const User = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'id',
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(20),
      field: 'name',
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING(20),
      field: 'surname',
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(60),
      field: 'address',
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(40),
      field: 'email',
    },
    phone: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'phone',
    }
  },
  {
    tableName: 'user',
    timeStamps: true, // to get columns of updateAt and createdAt
  }
);



/* 
module.exports = User;


const getAllUsers = async () => {
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM client ORDER BY id ASC'); // remember to change database tables
    await client.end();
    return res.rows;

  } catch (err) {
    console.error(err);
    res.status(500).send('Getting table rows failed');
  }
};

const getUserById = async () => {
  try {
    const { id } = req.params; // may consider parseInt
    const query = 'SELECT * FROM albums WHERE id = $1;';
    const { rows } = await client.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send('The user is not in the database');
    }
    return rows[0];

  } catch (err) {
    console.error(err);
    res.status(500).send('failed');
  }
};

// newUser is the structure of the atributes of the user table defined in userController.js
const addNewUser = async (newUser) => {
  try {
    await client.connect();
    const query = `INSERT INTO users (name, surname, id, address, city, department, email, phoneNumber)
         VALUES ($1, $2, $3);`;
         // this part probably will crashed
    const res = await client.query(query, newUser);
    console.log(res.rows); // result in screen
    await client.end();
    return newUser; // dont't know if this is correct to return

  } catch (err) {
    console.log(err);
    console.error('Getting table rows failed');
  }
};

const updateUserById = async () => {
  
};

const deleteUserById = async () => {
  
};

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUserById,
    deleteUserById
};

*/