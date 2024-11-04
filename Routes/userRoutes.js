const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUsePhoto,
} = require('../controllers/userController');
const {
  signup,
  login,
  protect,
  resetPassword,
  forgotPassword,
  updatePassword,
  logout,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updatePassword', updatePassword);
router.patch('/updateMe', uploadUserPhoto, resizeUsePhoto, updateMe);
router.delete('/deleteMe', deleteMe);
router.get('/me', getMe, getUser);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
