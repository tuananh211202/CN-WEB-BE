const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_favorite_tour', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tours',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_favorite_tour',
    timestamps: false,
    indexes: [
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "tour_id",
        using: "BTREE",
        fields: [
          { name: "tour_id" },
        ]
      },
    ]
  });
};
