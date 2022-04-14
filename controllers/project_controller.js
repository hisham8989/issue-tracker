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

module.exports.project = async function (req, res) {
  try {
    let project = await Project.findById(req.params.projectId).populate({
      path: 'issues',
    })
    if (!project) {
      return res.redirect('back')
    }
    return res.render('project', {
      title: 'project',
      project,
    })
  } catch (err) {
    console.log('Error in finding project')
  }
}

module.exports.createIssue = async function (req, res) {
  try {
    let project = await Project.findById(req.params.projectId)
    if (project) {
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      })

      project.issues.push(issue)
      for (let issueLabel of req.body.labels) {
        let isMatch = project.labels.find(
          (projectLabel) => projectLabel == issueLabel
        )

        if (!isMatch) {
          project.labels.push(issueLabel)
        }
      }
      project.save()
      return res.redirect(`back`)
    } else {
      return res.redirect('back')
    }
  } catch (err) {
    console.log('Error is creating issue', err)
  }
}


module.exports.filter = function (req,res,next) {
  console.log(req.body);
  next()
}