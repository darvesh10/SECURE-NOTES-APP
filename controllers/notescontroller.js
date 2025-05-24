// controllers/notesController.js
const Note = require('../models/note');

exports.dashboard = async (req, res) => {
  const notes = await Note.find({ owner: req.session.userId }).sort({ createdAt: -1 });
  res.render('notes/dashboard', { notes });
};

exports.showCreate = (req, res) => {
  res.render('notes/create');
};

exports.createNote = async (req, res) => {
  const { title, body } = req.body;

  try {
    await Note.create({ title, body, owner: req.session.userId });
    res.redirect('/notes/dashboard');
  } catch (err) {
    console.log(err);
    res.send('Error creating note');
  }
};

exports.showEdit = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, owner: req.session.userId });
  if (!note) return res.send('Note not found or unauthorized');
  res.render('notes/edit', { note });
};

exports.updateNote = async (req, res) => {
  const { title, body } = req.body;

  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.session.userId },
      { title, body }
    );
    res.redirect('/notes/dashboard');
  } catch (err) {
    console.log(err);
    res.send('Error updating note');
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, owner: req.session.userId });
    res.redirect('/notes/dashboard');
  } catch (err) {
    console.log(err);
    res.send('Error deleting note');
  }
};
