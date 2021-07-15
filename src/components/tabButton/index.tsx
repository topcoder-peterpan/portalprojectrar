import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styles from './styles.module.scss'

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

type Props = {
  items: Array<string>;
  value?: number;
  handleChange?: (event: React.ChangeEvent<{}>, value: any) => void;
}

const TabButton: React.FC<Props> = ({ value, handleChange, items }) => {

  return (
    <div className={styles.root}>
      <Tabs
        className={styles.tabs}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        scrollButtons="on"
        variant="scrollable"
      >
        {items.map((item: any, index: number) => (
          <Tab className={styles.tab} label={item.toUpperCase()} key={index}  {...a11yProps(index)} />
        ))}
      </Tabs>
    </div>
  )
}

export default TabButton