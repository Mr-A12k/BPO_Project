module.exports = (sequelize, DataTypes) => {
    const Payroll = sequelize.define('Payroll', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payPeriodStart: {
        type: DataTypes.DATE,
        allowNull: false
      },
      payPeriodEnd: {
        type: DataTypes.DATE,
        allowNull: false
      },
      hoursWorked: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      baseSalary: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      bonuses: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      deductions: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      netPay: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'processed', 'paid'),
        defaultValue: 'pending'
      }
    });
  
    Payroll.associate = models => {
      Payroll.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    };
  
    return Payroll;
  };