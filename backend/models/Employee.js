module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'supervisor', 'agent'),
        defaultValue: 'agent'
      },
      phone: {
        type: DataTypes.STRING
      },
      hireDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'on_leave'),
        defaultValue: 'active'
      }
    });
  
    Employee.associate = models => {
      Employee.hasMany(models.Call, { foreignKey: 'agentId' });
      Employee.hasMany(models.Task, { foreignKey: 'assignedTo' });
      Employee.hasMany(models.Payroll, { foreignKey: 'employeeId' });
    };
  
    return Employee;
  };