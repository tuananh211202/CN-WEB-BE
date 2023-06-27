var express = require("express");
const userController = require("../controllers/userControllers/userController");
const mockController = require("../controllers/mockDataController");
const multer = require("multer");
const { checkToken } = require("../middleware/middleware");
const upload = multer({ dest: "uploads/" });

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// mock user
router.post("/add-mul-user", mockController.bulkUser);

router.get("/get-user", userController.getUserInfo);
router.put("/update-user", checkToken, userController.updateUser);

// mock post
router.post("/add-mul-post", mockController.bulkPost);

// post
router.post(
  "/add-post",
  checkToken,
  upload.single("image"),
  userController.createPost
);
router.get("/get-post", checkToken, userController.getPost);
router.put(
  "/update-post",
  checkToken,
  upload.single("image"),
  userController.updatePost
);
router.delete("/delete-post", checkToken, userController.deletePost);

// mock qas
router.post("/add-mul-qas", mockController.bulkQAS);

// qas
router.post("/add-qas", checkToken, userController.createQAS);
router.get("/get-question", checkToken, userController.getQuestion);

// mock comment
router.post("/add-mul-cmt", mockController.bulkComment);

// comment
router.post("/add-comment", checkToken, userController.addComment);
router.get("/get-comment", checkToken, userController.getCommentOfPost);
router.delete("/delete-comment", checkToken, userController.deleteComment);
router.put("/edit-comment", checkToken, userController.updateComment);

// rate
router.post("/add-rate", checkToken, userController.addRateTOur);
router.get("/get-rate", checkToken, userController.getRateByTour);
router.delete("/delete-rate", checkToken, userController.deleteRate);
router.put("/edit-rate", checkToken, userController.editRate);

// favorite tour
router.post("/add-fav-tour", checkToken, userController.addFavTour);
router.get("/get-fav-tour", checkToken, userController.getFavTourOfUser);
router.delete("/delete-fav-tour", checkToken, userController.deleteFavTour);

// booking tour
router.get("/get-book-tour", checkToken, userController.getBookingUser);
router.post("/book-tour", checkToken, userController.bookTour);
router.delete("/cancel-book-tour", checkToken, userController.cancelBookTour);

// like - dislike post
router.put("/react-post", checkToken, userController.reactPost);

module.exports = router;
