const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tour_place', {
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tours',
        key: 'id'
      }
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'places',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tour_place',
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
        name: "place_id",
        using: "BTREE",
        fields: [
          { name: "place_id" },
        ]
      },
    ]
  });
};
