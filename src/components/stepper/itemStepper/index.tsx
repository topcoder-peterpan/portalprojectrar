import React from 'react'
import styles from './styles.module.scss'

type Props = {
  visitType?: string;
  visitNumber: string;
  completedDate: string;
  visitStatus: string;
}

const ItemStepper: React.FC<Props> = ({ visitNumber, completedDate, visitStatus, visitType }) => {

  return (
    <div className={styles.root}>
      <div className={styles.circle}>
      </div>
      {visitStatus === 'complete' &&
        <>
          {visitType === 'followup' &&
            <div className={styles.labelBig}>
              {completedDate}-Follow up visit {visitNumber} complete
            </div>
          }
          {visitType !== 'followup' &&
            <div className={styles.labelBig}>
              {completedDate}-Treatment visit {visitNumber} complete
            </div>
          }
        </>
      }
      {visitStatus === 'scheduled' &&
        <>
          {visitType === 'followup' &&
            <div className={styles.labelBig}>
              Follow Up visit {visitNumber} scheduled for {completedDate}
            </div>
          }
          {visitType !== 'followup' &&
            <div className={styles.labelSmall}>
              Treatment visit {visitNumber} scheduled for {completedDate}
            </div>
          }
        </>
      }
    </div>
  )
}

export default ItemStepper
