const router = require('express').Router();

const thoughtRoutes = require('./thoughtsRoutes')
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes')

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);
router.use('/api', apiRoutes)

module.exports = router;