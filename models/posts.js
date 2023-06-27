const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "posts",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      full_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      short_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      num_like: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      num_dislike: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      topic: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "posts",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
