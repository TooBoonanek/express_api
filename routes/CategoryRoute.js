import express from 'express';
import { CategoryCreate, CategoryDeleteById, CategoryGetAll, CategoryGetById, CategoryUpdateById } 
from '../controllers/CategoryController.js';
import { ProtectRoute, requireSignIn } from '../auth/ProtectRoute.js';

const CategoryRoute = express.Router();

//Create
CategoryRoute.post('/create', CategoryCreate);

//ReadAll
CategoryRoute.get('/getall', requireSignIn, CategoryGetAll);

//ReadById
CategoryRoute.get('/getbyid/:id', CategoryGetById);

//UpdateById
CategoryRoute.put('/updatebyid/:id', CategoryUpdateById);

//DeleteById
CategoryRoute.delete('/deletebyid/:id', CategoryDeleteById);

export default CategoryRoute;
