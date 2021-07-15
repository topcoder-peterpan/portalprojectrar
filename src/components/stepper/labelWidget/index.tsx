import React, { useEffect, useState } from 'react'
import ExpandButton from '../expandButton'
import styles from './styles.module.scss'
import { Badge } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import CheckIcon from '@mui/icons-material/Check'

type Props = {
  data: IStepperData;
  expandState?: boolean;
  expandClick?: any;
  activeState?: number | null;
  activeNumber?: number;
}

const LabelWidget: React.FC<Props> = ({ data, expandClick, expandState = false, activeState, activeNumber }) => {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {data.parent_id === null ? (data.status === 'pending' ?
          <div className={styles.badgeDash}>
            {data.label_indicator}
          </div> : (data.status === 'complete' ?
            <div className={styles.badge}>
              <CheckIcon style={{ width: '15px', height: '15px' }} />
            </div>
            : <div className={styles.badge}>
              {data.label_indicator}
            </div>
          )
        ) : <div className={styles.badgeDot}>
          <CircleIcon style={{ color: '#2c6fb4', width: '8px', height: '8px' }} />
        </div>
        }
        {
          data.parent_id === null ? (
            data.label_indicator === '1' ?
              <div className={styles.label}>
                {data.label}
              </div> :
              (data.status === 'active' ?
                <div className={styles.labelActive}>
                  {data.label.toUpperCase()}
                </div> : (data.status === 'complete' ?
                  <div className={styles.labelComplete}>
                    {data.label.toUpperCase()}
                  </div> :
                  (data.label_indicator === '5' ?
                    <div className={styles.labelPendingEnd}>
                      {data.label.toUpperCase()}
                    </div>
                    : <div className={styles.labelPending}>
                      {data.label.toUpperCase()}
                    </div>)
                ))) :
            (data.status === 'complete' ?
              <div className={styles.labelWithLine}>
                {data.label}
              </div> :
              <div className={styles.labelWithDashLine}>
                {data.label}
              </div>)
        }
      </div>
      {
        data.parent_id === null ? (
          expandState === true ?
            <div className={styles.expandButtonActive} onClick={() => { expandClick() }}>
              <ExpandButton expanded={activeState === activeNumber} state={expandState} />
            </div> :
            <div className={styles.expandButtonActive}>
              <ExpandButton expanded={activeState === activeNumber} state={false} />
            </div>) :
          <div></div>
      }
    </div>
  )
}

export default LabelWidget

