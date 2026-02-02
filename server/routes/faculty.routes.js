const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");
const planGuard = require("../middlewares/planGuard.middleware");
const materialCtrl = require("../controllers/studyMaterial.controller");

router.use(auth, rbac("FACULTY"));

router.post("/materials", planGuard("studyMaterial"), materialCtrl.upload);

module.exports = router;
