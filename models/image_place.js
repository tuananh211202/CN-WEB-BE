const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('image_place', {
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'places',
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
    tableName: 'image_place',
    timestamps: false,
    indexes: [
      {
        name: "place_id",
        using: "BTREE",
        fields: [
          { name: "place_id" },
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
