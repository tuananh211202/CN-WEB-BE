var DataTypes = require("sequelize").DataTypes;
var _arrivals = require("./arrivals");
var _comments = require("./comments");
var _image_place = require("./image_place");
var _image_post = require("./image_post");
var _image_tour = require("./image_tour");
var _images = require("./images");
var _places = require("./places");
var _posts = require("./posts");
var _qas = require("./qas");
var _rates = require("./rates");
var _services = require("./services");
var _tour_arrival = require("./tour_arrival");
var _tour_place = require("./tour_place");
var _tour_service = require("./tour_service");
var _tour_voucher = require("./tour_voucher");
var _tours = require("./tours");
var _types = require("./types");
var _user_booking_tour = require("./user_booking_tour");
var _user_favorite_tour = require("./user_favorite_tour");
var _users = require("./users");
var _vouchers = require("./vouchers");

function initModels(sequelize) {
  var arrivals = _arrivals(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var image_place = _image_place(sequelize, DataTypes);
  var image_post = _image_post(sequelize, DataTypes);
  var image_tour = _image_tour(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var places = _places(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var qas = _qas(sequelize, DataTypes);
  var rates = _rates(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var tour_arrival = _tour_arrival(sequelize, DataTypes);
  var tour_place = _tour_place(sequelize, DataTypes);
  var tour_service = _tour_service(sequelize, DataTypes);
  var tour_voucher = _tour_voucher(sequelize, DataTypes);
  var tours = _tours(sequelize, DataTypes);
  var types = _types(sequelize, DataTypes);
  var user_booking_tour = _user_booking_tour(sequelize, DataTypes);
  var user_favorite_tour = _user_favorite_tour(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vouchers = _vouchers(sequelize, DataTypes);

  tour_arrival.belongsTo(arrivals, { as: "arrival", foreignKey: "arrival_id"});
  arrivals.hasMany(tour_arrival, { as: "tour_arrivals", foreignKey: "arrival_id"});
  image_place.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(image_place, { as: "image_places", foreignKey: "image_id"});
  image_post.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(image_post, { as: "image_posts", foreignKey: "image_id"});
  image_tour.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(image_tour, { as: "image_tours", foreignKey: "image_id"});
  image_place.belongsTo(places, { as: "place", foreignKey: "place_id"});
  places.hasMany(image_place, { as: "image_places", foreignKey: "place_id"});
  tour_place.belongsTo(places, { as: "place", foreignKey: "place_id"});
  places.hasMany(tour_place, { as: "tour_places", foreignKey: "place_id"});
  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  image_post.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(image_post, { as: "image_posts", foreignKey: "post_id"});
  tour_service.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(tour_service, { as: "tour_services", foreignKey: "service_id"});
  image_tour.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(image_tour, { as: "image_tours", foreignKey: "tour_id"});
  rates.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(rates, { as: "rates", foreignKey: "tour_id"});
  tour_arrival.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(tour_arrival, { as: "tour_arrivals", foreignKey: "tour_id"});
  tour_place.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(tour_place, { as: "tour_places", foreignKey: "tour_id"});
  tour_service.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(tour_service, { as: "tour_services", foreignKey: "tour_id"});
  tour_voucher.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(tour_voucher, { as: "tour_vouchers", foreignKey: "tour_id"});
  user_booking_tour.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(user_booking_tour, { as: "user_booking_tours", foreignKey: "tour_id"});
  user_favorite_tour.belongsTo(tours, { as: "tour", foreignKey: "tour_id"});
  tours.hasMany(user_favorite_tour, { as: "user_favorite_tours", foreignKey: "tour_id"});
  tours.belongsTo(types, { as: "type", foreignKey: "type_id"});
  types.hasMany(tours, { as: "tours", foreignKey: "type_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  qas.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(qas, { as: "qas", foreignKey: "user_id"});
  rates.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rates, { as: "rates", foreignKey: "user_id"});
  user_booking_tour.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_booking_tour, { as: "user_booking_tours", foreignKey: "user_id"});
  user_favorite_tour.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_favorite_tour, { as: "user_favorite_tours", foreignKey: "user_id"});
  tour_voucher.belongsTo(vouchers, { as: "voucher", foreignKey: "voucher_id"});
  vouchers.hasMany(tour_voucher, { as: "tour_vouchers", foreignKey: "voucher_id"});

  return {
    arrivals,
    comments,
    image_place,
    image_post,
    image_tour,
    images,
    places,
    posts,
    qas,
    rates,
    services,
    tour_arrival,
    tour_place,
    tour_service,
    tour_voucher,
    tours,
    types,
    user_booking_tour,
    user_favorite_tour,
    users,
    vouchers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
