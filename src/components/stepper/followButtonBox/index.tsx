import React from 'react'
import RadioButtons from '../radioButtons'
import { useDispatch, useSelector } from 'react-redux'
import FollowToggleButtons from '../followToggleButtons'
import ToggleButtons from '../toggleButtons'
import styles from './styles.module.scss'
import Calendar from '../calendar'
import { Button } from '@material-ui/core'
import { setFollowStepToogleState } from 'store/actions/stepper.actions'


type Props = {
  comment: string;
}

const FollowButtonBox: React.FC<Props> = ({ comment }) => {
  const dispatch = useDispatch()

  const scheduleClick = () => {
    // Call api to insert db
    // Reload code here!
  }

  const completeClick = () => {
    // Call api to insert db
    // Reload code here!
  }

  const cancelClick = () => {
    dispatch(setFollowStepToogleState(''))
  }

  const { toogleFollowStepButtonState, toogleStepButtonState } = useSelector((store: any) => store.stepper)

  return (
    <div className={styles.root}>
      <div className={styles.commentFlap}>
        {comment}
      </div>
      <FollowToggleButtons />
      {
        toogleFollowStepButtonState === 'yes' &&
        <>
          <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            Is another follow up needed?
          </div>
          <ToggleButtons />
          {
            toogleStepButtonState === 'yes' &&
            <>
              <Calendar />
              <div className={styles.buttonBottom}>
                <div style={{ paddingRight: '10px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '110px' }}
                    onClick={scheduleClick}
                  >
                    SCHEDULE
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ width: '110px' }}
                    onClick={cancelClick}
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            </>
          }
          {
            toogleStepButtonState === 'no' &&
            <>
              <div className={styles.buttonEnd}>
                <div style={{ paddingBottom: '10px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={completeClick}
                  >
                    PATIENT COMPLETE
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={cancelClick}
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            </>
          }
        </>
      }
      {
        toogleFollowStepButtonState === 'no' &&
        <RadioButtons item1={'RESCHEDULE'} item2={'UNABLE TO CONTACT'} />
      }
    </div>
  )
}

export default FollowButtonBox