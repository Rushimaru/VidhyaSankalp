const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");
const queryCtrl = require("../controllers/query.controller");

router.use(auth, rbac("STUDENT"));

router.post("/queries", queryCtrl.create);
router.get("/queries", queryCtrl.list);

module.exports = router;
