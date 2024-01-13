const expense = require("express");
const router = expense.Router();

const userControllers = require("../controllers/userController");

router.post("/", userControllers.signup);

router.post("/", userControllers.login);

router.get("/", (req,res) => {
  res.send("dewhjvj")
});


module.exports = router;