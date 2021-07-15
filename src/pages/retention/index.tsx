import React from 'react'

import ButtonBox from 'components/buttonBox'
import TypeGrid from 'components/typeGrid'

import styles from './styles.module.scss'

const Trial: React.FC = () => {

  return (
    <div className={styles.root}>
      <div>
        <ButtonBox />
      </div>
      <div className={styles.grid}>
        <TypeGrid />
      </div>
    </div>
  )
}


export default Trial


