// models/chatAndMessage.js
module.exports = (sequelize, DataTypes) => {
    // Define the 'Chat' model
    const Chat = sequelize.define('Chat', {
      sessionID: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      sessionName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userID: {
        type: DataTypes.INTEGER, // Assuming userID is an integer (can be DataTypes.STRING based on your needs)
        allowNull: false,
      },
    }, {
      timestamps: true,
    });
  
    // Define the 'Message' model
    const Message = sequelize.define('Message', {
      sender: {
        type: DataTypes.ENUM('user', 'bot'),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      chatId: {
        type: DataTypes.INTEGER, // Assuming chatId is an integer
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
  
    // Associations
    // A chat can have many messages
    Chat.hasMany(Message, { foreignKey: 'chatId', as: 'messages' });
    // A message belongs to one chat
    Message.belongsTo(Chat, { foreignKey: 'chatId', as:'chat' });
  
    return { Chat, Message };
  };
  