const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");
const instCtrl = require("../controllers/institution.controller");

router.use(auth, rbac("SUPER_ADMIN"));

router.post("/institutions", instCtrl.create);
router.get("/institutions", instCtrl.list);

module.exports = router;
