const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tour_arrival', {
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tours',
        key: 'id'
      }
    },
    arrival_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'arrivals',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tour_arrival',
    timestamps: false,
    indexes: [
      {
        name: "tour_id",
        using: "BTREE",
        fields: [
          { name: "tour_id" },
        ]
      },
      {
        name: "arrival_id",
        using: "BTREE",
        fields: [
          { name: "arrival_id" },
        ]
      },
    ]
  });
};
