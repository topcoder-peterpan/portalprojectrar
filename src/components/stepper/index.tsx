import React, { useEffect, useState } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import styles from './styles.module.scss'
import ExpandButton from './expandButton'
import VisitComplete from './visitComplete'
import DropDown from './dropDown'
import DateTimeNote from './dateTimeNote'
import DateWidget from './dateWidget'
import LabelWidget from './labelWidget'

const userWorkFlowData: IStepperData[] =
  [
    { 'id': 'ab1', 'type': 'LABEL', 'label': '11/01/2021 - Referral is Randomized', 'label_indicator': '1', 'status': 'complete', 'parent_id': null, 'data': null },
    { 'id': 'af2', 'type': 'LABEL', 'label': 'A123 Protocol Number selected', 'label_indicator': '1', 'status': 'complete', 'parent_id': 'ab1', 'data': null },
    { 'id': 'ae3', 'type': 'LABEL', 'label': 'Treatment Visit 1-3', 'label_indicator': '2', 'status': 'complete', 'parent_id': null, 'data': null },
    { 'id': 'ae3a', 'type': 'LABEL', 'label': 'Treatment Visit 1 completed', 'label_indicator': '2', 'status': 'complete', 'parent_id': 'ae3', 'data': null },
    { 'id': 'ae3b', 'type': 'LABEL', 'label': 'Treatment Visit 2 completed', 'label_indicator': '2', 'status': 'complete', 'parent_id': 'ae3', 'data': null },
    { 'id': 'ae3c', 'type': 'LABEL', 'label': 'Treatment Visit 3 completed', 'label_indicator': '2', 'status': 'complete', 'parent_id': 'ae3', 'data': null },
    { 'id': 'ad4', 'type': 'LABEL', 'label': 'Treatment Visit 4-6', 'label_indicator': '3', 'status': 'active', 'parent_id': null, 'data': null },
    { 'id': 'ad4a', 'type': 'LABEL', 'label': '11/10/2021 - Treatment visit 4 scheduled', 'label_indicator': '3', 'status': 'active', 'parent_id': 'ad4', 'data': null },
    {
      'id': 'ad4aa',
      'type': 'VISITCOMPLETE',
      'label': 'Was the visit completed?',
      'label_indicator': '3',
      'status': 'active',
      'parent_id': 'ad4a',
      'data': {
        'yes': 'Yes',
        'no': 'No',
        'yes_radios': ['Schedule Next Visit', 'No Longer Interested'],
        'no_radios': ['Reschedule', 'No Longer Interested', 'Unable to Contact'],
        'date_radios': ['Schedule Next Visit', 'Reschedule'],
        'cancel': 'Cancel',
        'submit': 'Schedule'
      }
    },
    { 'id': 'ab5', 'type': 'LABEL', 'label': 'Treatment Visit 7-9', 'label_indicator': '4', 'status': 'pending', 'parent_id': null, 'data': null },
    { 'id': 'ab6', 'type': 'LABEL', 'label': 'Follow Up', 'label_indicator': '5', 'status': 'pending', 'parent_id': null, 'data': null }
  ]

const VerticalStepper: React.FC = () => {

  const [show, setShow] = useState<number | null>()

  const setShowClick = (value: number | null) => {
    if (value === show) setShow(null)
    else setShow(value)
  }

  const [displayArray, setDisplayArray] = useState<number[]>([])

  useEffect(() => {
    const array: number[] = []
    let index = 0
    userWorkFlowData.forEach((item: IStepperData) => {
      if (item.parent_id === null) { array[index] = (Number(item.label_indicator) - 1); index++ }
    })
    setDisplayArray(array)

    if (userWorkFlowData.length > 0) {
      const index = userWorkFlowData.findIndex((items: IStepperData) => items.status === 'active')
      if (index >= 0) {
        setShow(Number(userWorkFlowData[index].label_indicator) - 1)
      }
    }
  }, [userWorkFlowData])

  return (
    <div className={styles.root}>
      {
        displayArray?.map((value: number, index: number) => (
          <div key={index} >
            {userWorkFlowData.filter(item => (Number(item.label_indicator) - 1) === value && item.parent_id === null).map((item: IStepperData, index: number) => (
              item.status === 'pending' ? <LabelWidget data={item} activeNumber={value} expandClick={() => setShowClick(value)} activeState={show} expandState={false} key={index} /> :
                <LabelWidget data={item} activeNumber={value} expandClick={() => setShowClick(value)} activeState={show} expandState={true} key={index} />
            ))}
            <div className={show === value ? styles.show : styles.hide}>
              {
                userWorkFlowData.filter(item => (Number(item.label_indicator) - 1) === value && item.parent_id !== null).map((item: IStepperData, index: number) => (
                  item.type === 'VISITCOMPLETE' ? <VisitComplete data={item} key={index} /> : <LabelWidget data={item} key={index} />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )

}

export default VerticalStepper

