const Project = require('../models/project')
const Issue = require('../models/issue')
module.exports.createProject = async function (req, res) {
  const project = await Project.create({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
  })
  return res.redirect('back')
}

module.exports.project = function (req, res) {
  Project.findById(req.params.projectId, function (err, project) {
    if (err) {
      console.log(err)
      return
    }

    if (!project) {
      return res.redirect('back')
    }
    return res.render('project', {
      title: 'project',
      project,
    })
  })
}

module.exports.createIssue = function (req, res) {
    console.log(req.body);
    return res.redirect('back')
}
