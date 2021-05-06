import sequelize from '../config/database';

const { DataTypes } = require('sequelize')


export const Invites = sequelize.define('invites', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  dateTimeIn: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  dateTimeOut: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'invites',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "inviteId",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});

export const Vsers = sequelize.define('vsers', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  blockStreet: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  unitNo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  numberOccupants: {
    type: DataTypes.STRING(2),
    allowNull: false
  },

}, {
  sequelize,
  tableName: 'vsers',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "vserId",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});

export const InviteVsers = sequelize.define('invite-vser', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
});

Vsers.belongsToMany(Invites, { through: InviteVsers });
