const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tour_voucher', {
    voucher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vouchers',
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
    tableName: 'tour_voucher',
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
        name: "voucher_id",
        using: "BTREE",
        fields: [
          { name: "voucher_id" },
        ]
      },
    ]
  });
};
