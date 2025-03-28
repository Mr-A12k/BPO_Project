module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      dueDate: {
        type: DataTypes.DATE
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
      },
      status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'overdue'),
        defaultValue: 'pending'
      }
    });
  
    Task.associate = models => {
      Task.belongsTo(models.Client, { foreignKey: 'clientId' });
      Task.belongsTo(models.Employee, { foreignKey: 'assignedTo' });
    };
  
    return Task;
  };