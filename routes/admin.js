const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers/adminController");
const mockController = require("../controllers/mockDataController");
const multer = require("multer");
const { checkAdmin, checkToken } = require("../middleware/middleware");
const upload = multer({ dest: "uploads/" });

// places
router.post(
  "/add-place",
  checkAdmin,
  upload.single("image"),
  adminController.addPlace
);
router.get("/get-place", adminController.getPlace);
router.put(
  "/edit-place",
  checkAdmin,
  upload.single("image"),
  adminController.updatePlace
);
router.post("/mock-place", mockController.bulkPlace);

// type tour
router.post("/add-type", checkAdmin, adminController.addTypeTour);
router.put("/edit-type", checkToken, adminController.updateType);
router.get("/get-type", checkToken, adminController.getTypeTour);

// service tour
router.post("/add-service", checkAdmin, adminController.addService);
router.get("/get-service", checkToken, adminController.getService);
router.put("/edit-service", checkAdmin, adminController.editService);
router.post("/mock-service", mockController.bulkService);

// voucher tour
router.post("/mock-voucher", mockController.bulkVoucher);
router.post("/add-voucher", checkAdmin, adminController.addVoucher);
router.get("/get-voucher", checkToken, adminController.getVoucher);
router.put("/edit-voucher", checkAdmin, adminController.editVoucher);
router.put("/disable-voucher", checkAdmin, adminController.disableVoucher);

// tour
router.post(
  "/add-tour",
  checkAdmin,
  upload.single("image"),
  adminController.addTour
);
router.get("/get-tour", adminController.getTour);
router.put(
  "/edit-tour",
  checkAdmin,
  upload.single("image"),
  adminController.editTour
);
router.delete("/delete-tour", checkAdmin, adminController.deleteTour);
router.post("/mock-tour", mockController.bulkTour);

// qas
router.put("/ans-qas", checkAdmin, adminController.answerQuestion);
router.delete("/delete-qas", checkAdmin, adminController.deleteQAS);

// post
router.put("/handle-post", checkToken, adminController.handleRequestPost);

// arrival
router.post("/add-arrival", adminController.addArrival);
router.get("/get-arrival", adminController.getArrival);

// get-all-booking
router.get("/get-all-booking", checkAdmin, adminController.getAllBooking);

router.get("/count-tours", checkAdmin, adminController.countTours);
router.get(
  "/count-booking-tours",
  checkAdmin,
  adminController.countBookingTours
);
router.get("/count-profits", checkAdmin, adminController.countProfits);

module.exports = router;
