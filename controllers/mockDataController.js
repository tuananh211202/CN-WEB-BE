const db = require("../models/index");

const bulkUser = async (req, res) => {
  try {
    const data = req.body.map((user) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth,
    }));

    await db.users.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const bulkPost = async (req, res) => {
  try {
    const data = req.body.map((post) => ({
      title: post.title,
      content: post.content,
      user_id: post.user_id,
      status: post.status,
    }));
    await db.posts.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const bulkQAS = async (req, res) => {
  try {
    const data = req.body.map((qas) => ({
      question: qas.question,
      answer: qas.answer,
      user_id: qas.user_id,
    }));
    await db.qas.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const bulkComment = async (req, res) => {
  try {
    const data = req.body.map((comment) => ({
      user_id: comment.user_id,
      post_id: comment.post_id,
      content: comment.content,
    }));
    await db.comments.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const bulkVoucher = async (req, res) => {
  try {
    const data = req.body.map((voucher) => ({
      name: voucher.name,
      discount: voucher.discount,
    }));
    await db.vouchers.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const bulkService = async (req, res) => {
  try {
    const data = req.body.map((service) => ({
      name: service.name,
      description: service.description,
    }));
    await db.services.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const bulkPlace = async (req, res) => {
  try {
    const data = req.body.map((place) => ({
      name: place.name,
      description: place.description,
    }));
    await db.places.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const bulkTour = async (req, res) => {
  try {
    const data = req.body.map((place) => ({
      type_id: place.type_id,
      name: place.name,
      overview: place.overview,
      highlight: place.highlight,
      start_date: place.start_date,
      duration: place.duration,
      slots: place.slots,
      price: place.price,
      status: place.status,
      booking_deadline: place.booking_deadline,
    }));
    await db.tours.bulkCreate(data);
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  bulkUser,
  bulkPost,
  bulkQAS,
  bulkComment,
  bulkVoucher,
  bulkService,
  bulkPlace,
  bulkTour,
};
