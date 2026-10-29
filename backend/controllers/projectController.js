const Project = require('../models/Project');

// @desc    Get all published projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, total: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create project (admin)
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: Object.values(err.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update project (admin)
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete project (admin)
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
