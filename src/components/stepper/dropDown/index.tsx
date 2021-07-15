import Select from 'react-select'
import React, { useState } from 'react'
import styles from './styles.module.scss'

const data = {
  id: 'abc123',
  type: 'DROPDOWN',
  label: 'Great! Provide the Protocol Number',
  label_indicator: '1',
  status: '',
  parent_id: 'abc1234',
  data: ['Option1', 'Option2', 'Option3']
}


const DropDown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(null)

  const onSelectChange = (value: any) => {
    setSelectedOption(value)
  }

  return (
    <div className={styles.root}>
      <Select
        classNamePrefix="select"
        placeholder={''}
        onChange={onSelectChange}
        name="dropdown"
        value={selectedOption}
        options={data.data.map((item: any) => ({ label: item, value: item }))}
      />
    </div>
  )
}

export default DropDown
