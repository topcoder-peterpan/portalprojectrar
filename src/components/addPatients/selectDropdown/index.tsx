import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styles from './styles.module.scss'

type Props = {
  items: Array<string>;
  onSelectChange: (key: string, value: string) => void;
  value?: string;
  type: string;
  placeholder?: string;
};

const SelectDropdown: React.FC<Props> = ({ items, value, onSelectChange, type, placeholder }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelectChange(type, event.target.value)
  }

  return (
    <div className={styles.title} >
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        className={styles.select}
      >
        {placeholder && <MenuItem value="" disabled>
          <em>{placeholder}</em>
        </MenuItem>}
        {items.map((item: any, index: number) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default SelectDropdown
