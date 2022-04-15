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

    if (project) {
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      })
      project.issues.push(issue)

      // console.log(req.body.labels,);

      if (!(typeof req.body.labels === 'string')) {
        for (let issueLabel of req.body.labels) {
          let isMatch = project.labels.find(
            (projectLabel) => projectLabel == issueLabel
          )
          if (!isMatch) {
            project.labels.push(issueLabel)
          }
        }
      } else {
        let isMatch = project.labels.find(
          (projectLabel) => projectLabel == req.body.labels
        )
        if (!isMatch) {
          project.labels.push(req.body.labels)
        }
      }
      await project.save()
      return res.redirect(`back`)
    } else {
      return res.redirect('back')
    }
  } catch (err) {
    console.log('Error is creating issue', err)
  }
}

// module.exports.filter = async function (req, res) {
//   try {
//     let project = await Project.findById(req.params.projectId).populate({
//       path: 'issues',
//     })
//     if (!project) {
//       return res.redirect('back')
//     }
//     console.log(project);
//     console.log("i am from filter function from backend.,",req.data);
//     // console.log(project);
//     return res.render('project', {
//       title: 'project',
//       project,
//     })
//   } catch (err) {
//     console.log('Error in finding project')
//   }
// }
