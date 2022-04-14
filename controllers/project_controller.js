const Project = require('../models/project')
const Issue = require('../models/issue')

module.exports.createProject = function (req, res) {
  Project.create(
    {
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
    },
    function (err, project) {
      if (err) {
        console.log('Error in creating project', err)
        return res.send('<samp>Something went wrong with database</samp>')
      }

      return res.redirect('back')
    }
  )
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
    console.log(req.body);
    if (project) {
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      })
      console.log(issue);
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

module.exports.filter = function (req, res, next) {
  console.log(req.body)
  next()
}
