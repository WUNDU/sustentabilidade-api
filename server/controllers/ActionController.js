const Action = require('../models/Action');
const User = require('../models/User');

const createAction = async (req, res) => {
  const { title, description, category, points } = req.body;
  try {
    const newAction = new Action({ title, description, category, points, userId: req.userId });
    const action = await newAction.save();

    
    await User.findByIdAndUpdate(req.userId, { $inc: { points } });

    res.status(201).json(action);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const updateAction = async (req, res) => {
  const { title, description, category, points } = req.body;
  try {
    let action = await Action.findById(req.params.id);
    if (!action) return res.status(404).json({ msg: 'Action not found' });

  
    if (action.userId.toString() !== req.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    action = await Action.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, category, points } },
      { new: true }
    );

    if (!action) {
      return res.status(404).json({ msg: 'Action not found after update' });
    }

    res.json(action);
  } catch (err) {
    console.error(err);
    res.status(400).send('Server error');
  }
}

const deleteAction = async (req, res) => {
  try {

    if (!req.userId) {
      return res.status(401).json({ msg: 'Not authorized: Missing user ID' });
    }

    const action = await Action.findById(req.params.id);
    if (!action) return res.status(404).json({ msg: 'Action not found' });

    if (action.userId.toString() !== req.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Action.findByIdAndRemove(req.params.id);

    await User.findByIdAndUpdate(req.userId, { $inc: { points: -action.points } });

    res.json({ msg: 'Action removed' });
  } catch (err) {
    res.status(400).send('Server error');
  }
}

const getActions = async (req, res) => {
  try {
    const actions = await Action.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(actions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const getActionById = async (req, res) => {

  try {
    const action = await Action.findById(req.params.id);
    
    if (!action) {
      return res.status(404).json({ error: 'Action not found' });
    }

    res.json(action);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching the Action' });
  }
}


module.exports = { createAction, getActions, deleteAction, updateAction, getActionById };