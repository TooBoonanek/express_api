import express from "express";
import { ProductGetAll, ProductQuery } from "../controllers/ProductController.js";

const ProductRoute = express.Router();

// Create - POST

// ReadAll - GET
ProductRoute.get('/getall', ProductGetAll);
// ReadById - GET

// Update - PUT

// Delete - DELETE

// Query
ProductRoute.get('/query', ProductQuery);
export default ProductRoute;