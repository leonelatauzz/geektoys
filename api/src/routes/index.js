const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const userRouter = require('./users.js');
const orderRouter = require('./order.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);

router.use('/user', userRouter);

router.use('/order', orderRouter);

module.exports = router;
