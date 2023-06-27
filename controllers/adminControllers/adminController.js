const { json } = require("body-parser");
const adminService = require("../../services/adminServices/adminService");

const addTypeTour = async (req, res) => {
  const nameType = req.body.name;
  const result = await adminService.creatTypeTour(nameType);
  return res.status(200).json(result);
};

const updateType = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;
  const result = await adminService.updateType(Number(req.query.id), data);

  return res.status(200).json(result);
};

const getTypeTour = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await adminService.getTypeTourById(req.query.id);
  return res.status(200).json(result);
};

const addService = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(500).json("Missing required parameter");
  }
  const result = await adminService.addServiceTour(name, description);
  return res.status(200).json(result);
};

const getService = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  const result = await adminService.getServiceAdmin(req.query.id);
  return res.status(200).json(result);
};

const editService = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }

  const data = req.body;
  const result = await adminService.editServiceAdmin(req.query.id, data);

  return res.status(200).json(result);
};

const addVoucher = async (req, res) => {
  const { name, discount } = req.body;
  if (!name || !discount)
    return res.status(200).json("Missing required parameter");
  const result = await adminService.addVoucerAdmin(name, discount);
  return res.status(200).json(result);
};

const getVoucher = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  const result = await adminService.getVoucherAdmin(req.query.id);
  return res.status(200).json(result);
};

const editVoucher = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }

  const data = req.body;
  const result = await adminService.editVoucherAdmin(req.query.id, data);

  return res.status(200).json(result);
};

const disableVoucher = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }

  const result = await adminService.handleDisableVoucher(req.query.id);

  return res.status(200).json(result);
};

const addTour = async (req, res) => {
  const {
    type_id,
    name,
    overview,
    highlight,
    start_date,
    duration,
    slots,
    price,
    status,
    booking_deadline,
    placeId,
    serviceId,
    voucherId,
    arrivalId1,
    arrivalId2,
    arrivalId3,
  } = req.body;
  const image = req.file.path;
  if (
    !type_id ||
    !name ||
    !overview ||
    !highlight ||
    !start_date ||
    !duration ||
    !slots ||
    !price ||
    !status ||
    !booking_deadline ||
    !placeId ||
    !serviceId ||
    !voucherId ||
    !arrivalId1 ||
    !arrivalId2 ||
    !arrivalId3 ||
    !image
  ) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  const result = await adminService.handleAddTour({
    type_id,
    name,
    overview,
    highlight,
    start_date,
    duration,
    slots,
    price,
    status,
    booking_deadline,
    placeId,
    serviceId,
    voucherId,
    arrivalId1,
    arrivalId2,
    arrivalId3,
    image,
  });
  return res.status(200).json(result);
};

const getTour = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  const result = await adminService.handleGetTour(req.query.id);
  return res.status(200).json(result);
};

const editTour = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;

  if (!req.file) {
    const result = await adminService.handleEditTour(req.query.id, data);
    return res.status(200).json(result);
  } else {
    const result = await adminService.handleEditTour(
      req.query.id,
      data,
      req.file.path
    );
    return res.status(200).json(result);
  }
};

const deleteTour = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const result = await adminService.handleDeleteTour(req.query.id);
  return res.status(200).json(result);
};

const answerQuestion = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;
  const result = await adminService.handleAnswerQAS(req.query.id, data);
  return res.status(200).json(result);
};

const deleteQAS = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const result = await adminService.handleDeleteQAS(req.query.id);
  return res.status(200).json(result);
};

const handleRequestPost = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;
  const result = await adminService.adminHandleReqPost(req.query.id, data);
  return res.status(200).json(result);
};

const addPlace = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file.path;
  if (!name || !description) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const data = { name, description, image };
  const result = await adminService.handleAddPlace(data);
  return res.status(200).json(result);
};

const getPlace = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  const result = await adminService.handleGetPlace(req.query.id);
  return res.status(200).json(result);
};

const updatePlace = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required paramter",
    });
  }
  const data = req.body;
  if (!req.file) {
    const result = await adminService.handleEditPlace(req.query.id, data);
    return res.status(200).json(result);
  } else {
    const result = await adminService.handleEditPlace(
      req.query.id,
      data,
      req.file.path
    );
    return res.status(200).json(result);
  }
};

const addArrival = async (req, res) => {
  const { arrival_at } = req.body;
  if (!arrival_at) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await adminService.handleAddArrival(arrival_at);
  return res.status(200).json(result);
};

const getArrival = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }
  const result = await adminService.handleGetArrival(req.query.id);
  return res.status(200).json(result);
};

const getAllBooking = async (req, res) => {
  const result = await adminService.handleGetAllBooking();
  return res.status(200).json(result);
};

const countTours = async (req, res) => {
  const result = await adminService.handleCountTours();
  return res.status(200).json(result);
};

const countBookingTours = async (req, res) => {
  const result = await adminService.handleCountBookingTours();
  return res.status(200).json(result);
};

const countProfits = async (req, res) => {
  const result = await adminService.handleCountProfits();
  return res.status(200).json(result);
};

module.exports = {
  addTypeTour,
  updateType,
  getTypeTour,
  addService,
  getService,
  editService,
  addVoucher,
  getVoucher,
  editVoucher,
  disableVoucher,
  addTour,
  getTour,
  editTour,
  deleteTour,
  answerQuestion,
  deleteQAS,
  handleRequestPost,
  addPlace,
  getPlace,
  updatePlace,
  addArrival,
  getArrival,
  getAllBooking,
  countTours,
  countBookingTours,
  countProfits,
};
