module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.TEXT
      },
      contractStart: {
        type: DataTypes.DATE
      },
      contractEnd: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'active'
      }
    });
  
    Client.associate = models => {
      Client.hasMany(models.Call, { foreignKey: 'clientId' });
      Client.hasMany(models.Task, { foreignKey: 'clientId' });
    };
  
    return Client;
  };