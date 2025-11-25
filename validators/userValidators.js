const { body, param, validationResult } = require("express-validator");

const createUserValidators = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const updateUserValidators = [
  param("id").isInt().withMessage("Invalid user id"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const idParamValidator = [param("id").isInt().withMessage("Invalid user id")];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }
  next();
};

module.exports = {
  createUserValidators,
  updateUserValidators,
  idParamValidator,
  validate,
};
