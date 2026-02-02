const Subscription = require("../models/Subscription");

module.exports = (feature = null) => {
  return async (req, res, next) => {
    const sub = await Subscription
      .findOne({ institutionId: req.user.institutionId, status: "ACTIVE" })
      .populate("planId");

    if (!sub) return res.status(403).json({ message: "No active plan" });

    if (feature && !sub.planId.features[feature]) {
      return res.status(403).json({ message: "Feature not allowed" });
    }

    next();
  };
};
