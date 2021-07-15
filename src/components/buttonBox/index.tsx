import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import OutlineButton from 'components/outlineButton'
import SelectDropdown from 'components/selectDropdown'
import ToggleStateButton from 'components/toogleButton'
import AddPatient from 'pages/retention/trial/patient/add'

import { Modal } from '@material-ui/core'
import { setFilter, setSort, setArmFilter } from 'store/actions/study.actions'

import styles from './styles.module.scss'
import Study from 'types/study'

type State = {
  id: number;
  value: string;
}

const ButtonBox: React.FC = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { studyData } = useSelector((store: any) => store.study)
  const { studyId } = useSelector((store: any) => store.study)
  const studyRetentionData: IStudyData = studyData
  const studyObject = new Study(studyRetentionData)

  const [sorts] = useState<State[]>([
    { id: 1, value: 'appt Date' },
    { id: 2, value: 'last Update Date' },
    { id: 3, value: 'name' },
    { id: 4, value: 'Subject Id #' },
    { id: 5, value: 'source' }
  ])

  const [filters] = useState<State[]>([
    { id: 1, value: 'all' },
    { id: 2, value: 'complete' },
    { id: 3, value: 'dropped out' }
  ])

  const [armFilters, setArmFilters] = useState<State[]>([])
  const [armFilterValue, setArmFilterValue] = React.useState('')
  const [filterValue, setFilterValue] = React.useState('')
  const [sortValue, setSortValue] = React.useState('')
  const { filterType, toggleButtonState, sortType, armFilterType } = useSelector((store: any) => store.study)
  const [openWindow, setOpen] = React.useState(false)

  useEffect(() => {
    const tempArray: State[] = [
      { id: 1, value: 'all' }
    ]
    studyObject.arms?.forEach((item: IStudyArm) => {
      tempArray.push({
        'id': item.studyARMId,
        'value': item.armLabel
      })
    })
    setArmFilters(tempArray)
    if (tempArray.length > 0) setArmFilterValue('all')
  }, [studyId, dispatch, studyObject.arms])

  useEffect(() => {
    setSortValue(sortType)
  }, [sortType])

  const onClick = () => {
    setOpen(true)
  }

  const onCancel = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const armFilterHandleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setArmFilterValue(event.target.value as string)
    const armFilter: string = event.target.value
    dispatch(setArmFilter(armFilter))
  }

  const filterHandleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setFilterValue(event.target.value as string)
    const filter: string = event.target.value
    dispatch(setFilter(filter))
  }

  const sortHandleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSortValue(event.target.value as string)
    const sort: string = event.target.value
    dispatch(setSort(sort))
  }

  return (
    <div className={styles.root}>
      <Modal
        open={openWindow}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.window} >
          <AddPatient onCancel={onCancel} />
        </div>
      </Modal>
      <div className={styles.tooglebutton}>
        <ToggleStateButton item1={'active'} item2={'complete'} item3={'active'} />
      </div>
      <div className={styles.buttonWrapper}>
        { !!armFilters && armFilters.length > 2 && (
          <div className={styles.dropdown}>
            <div className={styles.label}>
            ARM
            </div>
            <SelectDropdown items={armFilters} value={armFilterValue} onSelectChange={armFilterHandleChange} />
          </div>
        )}
        <div className={styles.dropdown}>
          <div className={styles.label}>
            {t('BUTTON.FILTER')}
          </div>
          <SelectDropdown items={filters} value={filterValue} onSelectChange={filterHandleChange} />
        </div>
        <div className={styles.dropdown} >
          <div className={styles.label}>
            {t('BUTTON.SORT')}
          </div>
          <SelectDropdown items={sorts} value={sortValue} onSelectChange={sortHandleChange} />
        </div>
        <div className={styles.dropdown}>
          <OutlineButton item={'upload patients'} onClick={onClick} />
        </div>
      </div>
    </div>
  )
}

export default ButtonBox


