// userModel.js
module.exports = (sequelize, DataTypes) => {
    // Define the 'User' model
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING, // Cloudinary URL for avatar
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
        city: {
          type: DataTypes.STRING,
          trim: true,
        },
        state: {
          type: DataTypes.STRING,
          trim: true,
        },
        zipCode: {
          type: DataTypes.STRING,
          trim: true,
        },
        country: {
          type: DataTypes.STRING,
          trim: true,
        },
      
      phoneNumber: {
        type: DataTypes.STRING,
        trim: true,
      },
      otp: {
        type: DataTypes.STRING,
      },
      otpUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    });
  
    // Example of associations
    User.associate = models => {
      // Define associations if necessary (e.g., User.hasMany(Chat))
    };
  
    return User;
  };
  