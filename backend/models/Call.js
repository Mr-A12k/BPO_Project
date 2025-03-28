module.exports = (sequelize, DataTypes) => {
    const Call = sequelize.define('Call', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE
      },
      duration: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.ENUM('inbound', 'outbound'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('completed', 'missed', 'voicemail', 'transferred'),
        defaultValue: 'completed'
      },
      notes: {
        type: DataTypes.TEXT
      },
      sentimentScore: {
        type: DataTypes.FLOAT
      }
    });
  
    Call.associate = models => {
      Call.belongsTo(models.Client, { foreignKey: 'clientId' });
      Call.belongsTo(models.Employee, { foreignKey: 'agentId' });
    };
  
    return Call;
  };