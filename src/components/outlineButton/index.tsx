import { Button } from '@material-ui/core'
import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import styles from './styles.module.scss'

interface Props {
  item: string;
  onClick?: () => void;
}
const OutlineButton: React.FC<Props> = ({ item, onClick }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      className={styles.root}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.iconFlap}>
          <AddCircleOutlineIcon />
        </div>
        <div className={styles.labelFlap}>
          {item.toUpperCase()}
        </div>
      </div>
    </Button>
  )
}

export default OutlineButton
