const { Router } = require('express');
const router = Router();
const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');
const verifyJWT = require('../middleware/verifyJWT');
router.use(verifyJWT);
router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
