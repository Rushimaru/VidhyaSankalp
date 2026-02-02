const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");
const planGuard = require("../middlewares/planGuard.middleware");
const studentCtrl = require("../controllers/student.controller");

router.use(auth, rbac("ADMIN"));

router.post("/students", planGuard("attendance"), studentCtrl.create);
router.get("/students", studentCtrl.list);

module.exports = router;
