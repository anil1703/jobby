import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const TypesOfEmployment = props => {
  const {selecthingType, deselectingType} = props
  const handleChange = (event, typeId) => {
    if (event.target.checked === true) {
      selecthingType(typeId)
    } else if (event.target.checked === false) {
      deselectingType(typeId)
    }
  }
  return (
    <div className="typesOdSection">
      <h1 className="typesHead">Type of Employment</h1>
      <ul className="typeOful">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.label} className="typesLi">
            <input
              onChange={event => handleChange(event, eachItem.employmentTypeId)}
              id={eachItem.employmentTypeId}
              type="checkbox"
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TypesOfEmployment
