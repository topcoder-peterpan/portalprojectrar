import React from 'react'
import ToggleButtons from '../toggleButtons'
import Calendar from '../calendar'
import RadioButtons from '../radioButtons'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import styles from './styles.module.scss'
import { setStepRadioState, setStepToogleState } from 'store/actions/stepper.actions'

type Props = {
  comment: string;
}

const ButtonBox: React.FC<Props> = ({ comment }) => {

  const { toogleStepButtonState, radioStepButtonState } = useSelector((store: any) => store.stepper)

  const dispatch = useDispatch()

  const scheduleClick = () => {
    // Call api to insert db
    // Reload code here!
  }

  const cancelClick = () => {
    dispatch(setStepToogleState(''))
    dispatch(setStepRadioState(''))
  }

  return (
    <div className={styles.root}>
      <div className={styles.commentFlap}>
        {comment}
      </div>
      <ToggleButtons />
      {toogleStepButtonState === 'yes' &&
        <>
          <div className={styles.buttonFlap}>
            <RadioButtons item1={'SCHEDULE NEXT VISIT'} item2={'PATIENT WITHDREW'} />
          </div>
          {radioStepButtonState === 'SCHEDULE NEXT VISIT' &&
            <>
              <div>
                <Calendar />
              </div>
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
        </>
      }
      {toogleStepButtonState === 'no' &&
        <>
          <div className={styles.buttonFlap}>
            <RadioButtons item1={'PATIENT DIDN\'T SHOW UP'} item2={'PATIENT CANCELLED'} />
          </div>
        </>
      }
    </div>
  )
}

export default ButtonBox
