// routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const {
  dashboard,
  showCreate,
  createNote,
  showEdit,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

const { ensureAuth } = require('../middleware/authmiddleware');

router.get('/dashboard', ensureAuth, dashboard);
router.get('/create', ensureAuth, showCreate);
router.post('/create', ensureAuth, createNote);
router.get('/edit/:id', ensureAuth, showEdit);
router.post('/edit/:id', ensureAuth, updateNote);
router.post('/delete/:id', ensureAuth, deleteNote);

module.exports = router;
