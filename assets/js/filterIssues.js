let filterIssueForm = document.getElementById('filter-issue-form')
let issuesJson = document
  .getElementById('issue-data')
  .getAttribute('data-project-issues')
let issues = JSON.parse(issuesJson)

let issueList = document.getElementById('issues-list')

filterIssueForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let filteredIssues = []
  let checkboxList = filterIssueForm.querySelectorAll('input[type=checkbox]')
  let labelsElements = [...checkboxList].filter((el) => el.checked)
  let titleVal = filterIssueForm.querySelector(
    'input[name="filterBytitle"]'
  ).value
  let descriptionVal = filterIssueForm.querySelector(
    'input[name="filterBydescrption"]'
  ).value
  let authorVal = filterIssueForm.querySelector(
    'select[name="filterByAuthor"]'
  ).value
  // checkboxList.push()
  // let labelsElements = [...checkboxList]

  let [...labelsArr] = labelsElements.map((el) => el.value)

  issues.map((obj) => {
    if (
      obj.title == titleVal ||
      obj.author == authorVal ||
      obj.description == descriptionVal
    ) {
      if (!filteredIssues.includes(obj)) {
        filteredIssues.push(obj)
      }
    }

    labelsArr.map((label) => {
      if (obj.labels.includes(label)) {
        if (!filteredIssues.includes(obj)) {
          filteredIssues.push(obj)
        }
      }
    })
  })
  /** End of filtering */

  issueList.innerHTML = ''
  for (let issue of filteredIssues) {
    let listItem = document.createElement('li')
    listItem.innerHTML = `<table id="filter-issue-table">
    <tr>
      <td>Title : </td>
      <td><p> ${issue.title} </p></td>
    </tr>
    <tr>
      <td>Description : </td>
      <td><p>${issue.description}</p></td>
    </tr>
    <tr>
      <td>Author : </td>
      <td>${issue.author}</td>
    </tr>
  </table>
  `
    // listItem.innerHTML = issue.title
    issueList.appendChild(listItem)
  }
})
