import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be string"),
  body("addressLine").isString().notEmpty().withMessage("Add must be string"),
  body("city").isString().notEmpty().withMessage("city must be string"),
  body("country").isString().notEmpty().withMessage("country must be string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("restaurantName must be required"),
  body("city").notEmpty().withMessage("City must be required"),
  body("country").notEmpty().withMessage("Country must be required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery Time must be a positive integer"),
  body("cuisines").isArray().withMessage("cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("menuItems must be array "),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("menuItems name is requrired"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("menuItems name is requrired and must be postive number"),
  handleValidationErrors,
];
