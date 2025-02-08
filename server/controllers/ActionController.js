const Action = require('../models/Action');
const User = require('../models/User');

const createAction = async (req, res) => {
  const { title, description, category, points } = req.body;
  try {
    const action = new Action({ title, description, category, points, userId: req.userId });
    await action.save();

    
    await User.findByIdAndUpdate(req.userId, { $inc: { points } });

    res.status(201).json(action);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getActions = async (req, res) => {
  try {
    const actions = await Action.find({ userId: req.userId });
    res.json(actions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createAction, getActions };