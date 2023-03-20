const { Router } = require("express");

const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");

const router = Router();

router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
