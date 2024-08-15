import express from 'express';
import CategoryRoute from './CategoryRoute.js';
import ProductRoute from './ProductRoute.js';
import UserRoute from './UserRoute.js';
import passport from 'passport';

const AppRoute = express.Router();

AppRoute.use(passport.initialize());

AppRoute.get('/', (req, res) => {
    
    res.json({ 'message': 'Hello API' });
});

// another routes
// category router CRUD
AppRoute.use('/category', CategoryRoute);
AppRoute.use('/product', ProductRoute);
AppRoute.use('/auth', UserRoute);
// product router CRUD
// user router  // authentication  signup(register), signin(login), signout(logout)

AppRoute.get('*', (req, res) => {
    const error = new Error('Not Found');
    res.json({ 'message': error.message });
});

export default AppRoute;
