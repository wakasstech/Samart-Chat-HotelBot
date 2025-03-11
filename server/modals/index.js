const { Sequelize, DataTypes, Op } = require('sequelize');

// Setup Sequelize connection to MySQL
const sequelize = new Sequelize('chatbot', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
  define: {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
  query: {
    raw: true, // Allows raw queries if needed
  },
});

const db = {};

// Import models and pass the `sequelize` instance to them
db.userModel = require('./userModel')(sequelize, DataTypes, Op);
db.chatModel = require('./chatModel')(sequelize, DataTypes, Op);
// Import other models in a similar manner if necessary

console.log(db, 'db');

// Add Sequelize and sequelize instances to the db object for later access
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Associate models if any associations exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

// Sync the database with `alter: true` to update schema without dropping tables
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Tables are synchronized');
  })
  .catch(err => {
    console.error('Error syncing tables:', err);
  });

module.exports = db;
