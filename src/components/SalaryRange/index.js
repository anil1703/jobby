import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const SalaryRange = props => {
  const {selectingRange} = props
  const clickSalary = (event, range) => {
    if (event.target.checked) {
      selectingRange(range)
    }
  }
  return (
    <div className="typesOdSection">
      <h1 className="typesHead">Salary Range</h1>
      <ul className="typeOful">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId} className="typesLi">
            <input
              onChange={event => clickSalary(event, eachItem.salaryRangeId)}
              id={eachItem.salaryRangeId}
              type="radio"
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalaryRange
