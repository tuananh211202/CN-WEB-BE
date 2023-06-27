const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('image_tour', {
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tours',
        key: 'id'
      }
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'images',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'image_tour',
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
        name: "image_id",
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
    ]
  });
};
