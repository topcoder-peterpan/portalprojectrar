import React from 'react'
import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputBase from '@material-ui/core/InputBase'
import styles from './styles.module.scss'

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase)

type Props = {
  items: Array<any>;
  onSelectChange?: (value: any) => void;
  value?: string;
};

const SelectDropdown: React.FC<Props> = ({ items, onSelectChange, value }) => {

  return (
    <div className={styles.title}>
      <NativeSelect
        id="demo-customized-select-native"
        value={value}
        onChange={onSelectChange}
        input={<BootstrapInput />}
        className={styles.nativeSelect}
      >
        {items.map((item: any, index: number) => (
          <option value={item.value.replace(/\s/g, '')} key={index}>
            {item.value.toUpperCase()}
          </option>
        ))}
      </NativeSelect>
    </div>
  )
}

export default SelectDropdown