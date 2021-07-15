import React from 'react'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { colorType } from 'constants/colors'

interface Props {
  progress: number;
  total: number;
  barBackGroundColor: string;
  className?: string;
}

const ProgressBar: React.FC<Props> = ({ progress = 0, barBackGroundColor = 'blue', className, total }) => {

  const setPercent = (value: number) => {
    const returnValue = (value / total) * 100
    return returnValue
  }

  const setColor = (value: string) => {
    let returnColor = ''
    switch (value) {
    case 'green':
      returnColor = colorType.Green
      break
    case 'blue':
      returnColor = colorType.Blue
      break
    default:
      break
    }
    return returnColor
  }

  return <>
    <div className={classNames(styles.root, className)}>
      <div style={{
        height: 12,
        width: `${setPercent(progress) * 70 / 100 + 1}%`,
        backgroundColor: setColor(barBackGroundColor),
      }}></div>
      <Typography className={styles.number} variant="subtitle2" >{progress}</Typography>
    </div>
  </>
}

export default ProgressBar