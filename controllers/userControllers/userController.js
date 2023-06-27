const userService = require("../../services/userServices/userService");

const getUserInfo = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(200).json({
      message: "Missing required parameters",
    });
  }

  let user = await userService.getUserById(id);
  if (user) {
    return res.status(200).json({
      message: "OK",
      user: user,
    });
  } else {
    return res.status(200).json({
      message: "User not exist",
    });
  }
};

const updateUser = async (req, res) => {
  if (!req.body.email) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  let data = req.body;
  let result = await userService.updateUserByEmail(data);
  return res.status(200).json(result);
};

const createPost = async (req, res) => {
  const {
    title,
    content,
    user_id,
    short_description,
    full_description,
    topic,
  } = req.body;
  const image = req.file.path;
  if (
    !title ||
    !content ||
    !user_id ||
    !short_description ||
    !full_description ||
    !topic
  )
    return res.status(200).json({
      message: "Missing required parameter",
    });
  const data = {
    title,
    content,
    user_id,
    image,
    short_description,
    full_description,
    topic,
  };
  const result = await userService.handleCreatePost(data);
  return res.status(200).json(result);
};

const getPost = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleGetPost(req.query.id);
  return res.status(200).json(result);
};

const updatePost = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;

  if (!req.file) {
    const result = await userService.handleUpdatePost(
      Number(req.query.id),
      data
    );
    return res.status(200).json(result);
  } else {
    const result = await userService.handleUpdatePost(
      Number(req.query.id),
      data,
      req.file.path
    );
    return res.status(200).json(result);
  }
};

const deletePost = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const result = await userService.handleDeletePost(req.query.id);
  return res.status(200).json(result);
};

const createQAS = async (req, res) => {
  const { question, user_id } = req.body;
  if (!question || !user_id)
    return res.status(200).json({
      message: "Missing required parameter",
    });
  const data = { question, user_id };
  const result = await userService.handleAddQAS(data);
  return res.status(200).json(result);
};

const getQuestion = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleGetQuestion(req.query.id);
  return res.status(200).json(result);
};

const addComment = async (req, res) => {
  const { post_id, user_id, content } = req.body;
  if (!post_id || !user_id || !content)
    return res.status(200).json({
      message: "Missing required parameter",
    });
  const data = { content, user_id, post_id };
  const result = await userService.handleAddComment(data);
  return res.status(200).json(result);
};

const getCommentOfPost = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleGetCommentOfPost(req.query.id);
  return res.status(200).json(result);
};

const deleteComment = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const result = await userService.handleDeleteComment(req.query.id);
  return res.status(200).json(result);
};

const updateComment = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;
  const result = await userService.handleUpdateComment(
    Number(req.query.id),
    data
  );

  return res.status(200).json(result);
};

const addRateTOur = async (req, res) => {
  const {
    user_id,
    tour_id,
    location_rate,
    service_rate,
    price_rate,
    infrastructure_rate,
  } = req.body;
  if (
    !tour_id ||
    !user_id ||
    !location_rate ||
    !service_rate ||
    !price_rate ||
    !infrastructure_rate
  )
    return res.status(200).json({
      message: "Missing required parameter",
    });
  const data = {
    user_id,
    tour_id,
    location_rate,
    service_rate,
    price_rate,
    infrastructure_rate,
  };
  const result = await userService.handleRateTour(data);
  return res.status(200).json(result);
};

const getRateByTour = async (req, res) => {
  if (!req.query.idTour) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleGetRateByTour(req.query.idTour);
  return res.status(200).json(result);
};

const deleteRate = async (req, res) => {
  if (!req.query.idTour || !req.query.idUser) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleDeleteRate(
    req.query.idTour,
    req.query.idUser
  );
  return res.status(200).json(result);
};

const editRate = async (req, res) => {
  if (!req.query.idUser || !req.query.idTour) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;
  const result = await userService.handleUpdateRate(
    Number(req.query.idUser),
    Number(req.query.idTour),
    data
  );

  return res.status(200).json(result);
};

const addFavTour = async (req, res) => {
  const { user_id, tour_id } = req.body;
  if (!user_id || !tour_id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const data = { user_id, tour_id };
  const result = await userService.handleAddFavTour(data);
  return res.status(200).json(result);
};

const getFavTourOfUser = async (req, res) => {
  if (!req.query.idUser) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleGetFavTourOfUser(req.query.idUser);
  return res.status(200).json(result);
};

const deleteFavTour = async (req, res) => {
  if (!req.query.idTour || !req.query.idUser) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleDeleteFavTour(
    req.query.idTour,
    req.query.idUser
  );
  return res.status(200).json(result);
};

const bookTour = async (req, res) => {
  const { user_id, tour_id, arrival_day, arrival_time, num_people, price } =
    req.body;
  if (
    !user_id ||
    !tour_id ||
    !arrival_day ||
    !arrival_time ||
    !price ||
    !num_people
  ) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const data = {
    user_id,
    tour_id,
    arrival_day,
    arrival_time,
    num_people,
    price,
  };
  const result = await userService.handleBookTour(data);
  return res.status(200).json(result);
};

const cancelBookTour = async (req, res) => {
  if (!req.query.idBooking) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await userService.handleCancleTour(req.query.idBooking);
  return res.status(200).json(result);
};

const reactPost = async (req, res) => {
  const { post_id, action } = req.body;
  if (!post_id || !action) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const data = { post_id, action };
  const result = await userService.handleReactPost(data);
  return res.status(200).json(result);
};

const getBookingUser = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  const result = await userService.handleGetBooking(req.query.id);
  return res.status(200).json(result);
};

module.exports = {
  getUserInfo,
  updateUser,
  createPost,
  getPost,
  updatePost,
  deletePost,
  createQAS,
  getQuestion,
  addComment,
  getCommentOfPost,
  deleteComment,
  updateComment,
  addRateTOur,
  getRateByTour,
  deleteRate,
  editRate,
  addFavTour,
  getFavTourOfUser,
  deleteFavTour,
  bookTour,
  cancelBookTour,
  reactPost,
  getBookingUser,
};
