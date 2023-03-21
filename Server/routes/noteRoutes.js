const { Router } = require('express');
const router = Router();

const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteControllers');

const verifyJWT = require('../middleware/verifyJWT');
router.use(verifyJWT);

router
  .route('/')
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
