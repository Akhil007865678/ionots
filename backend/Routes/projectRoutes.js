// routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const ProjectStatus = require('../models/status');
const auth = require('../middleware/authenticate');
const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post('/assign', auth, async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body)
  try {
    const project = new Project({ userId: req.user.id, title, description });
    await project.save();
    res.status(201).json({ message: 'Project assigned successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/accept', async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.acceptedUsers.includes(userId)) {
      return res.status(400).json({ message: 'User already accepted' });
    }
    project.acceptedUsers.push(userId);
    user.projects.push(projectId);
    await project.save();
    await user.save();
    res.status(200).json({ message: 'User accepted successfully', project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept user' });
  }
});

router.post('/status', async (req, res) => {
  const { projectId, userId, status } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    let projectStatus = await ProjectStatus.findOne({ projectId });
    if (!projectStatus) {
      projectStatus = new ProjectStatus({
        projectId: projectId,
        UserId: userId,
        title: project.title,
        description: project.description,
        status: status || 'pending',
      });
    } else {
      projectStatus.status = status || 'pending';
      projectStatus.updatedAt = Date.now();
    }
    await projectStatus.save();
    if (status === 'accepted') {
      project.acceptedUsers.push(userId);
      await project.save();
    }
    res.status(200).json({ message: 'Project status updated successfully', projectStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating project status', error });
  }
});

router.patch('/updatestatus', async (req, res) => {
  const { projectId } = req.body;
  const status = req.body.status || 'pending';
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.status = status;
    await project.save();

    res.status(200).json({ message: 'Project status updated successfully', project });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ error: 'Failed to update project status' });
  }
});

module.exports = router;
