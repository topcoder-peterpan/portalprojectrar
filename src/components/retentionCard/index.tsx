import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import format from 'date-fns/format'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Divider, IconButton, Modal } from '@material-ui/core'

import styles from './styles.module.scss'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PatientMoreFunction from 'components/patientMoreFunction'

type Props = {
  items: IPatientData,
  armData: IStudyArm[],
  gridType?: string,
  cardClick: React.MouseEventHandler<HTMLDivElement>
}

const RetentionCard: React.FC<Props> = ({ items, gridType, cardClick, armData }) => {

  //var date: string = "";
  let state = ''

  const { filterType } = useSelector((store: any) => store.study)

  const filterTypeText = () => {
    switch (filterType) {
    case 'all':
      //date = items.nextVisitType + "-" + items.apptDate;
      //state = items.visitScheduled;
      if (gridType === 'nextvisit') return 'Next visit:'
      else {
        state = ''
        return 'Next visit:'
      }
    case 'complete':
      //date = items.completedDate;
      return 'Completed:'
    case 'droppedout':
      //date = items.droppedDate;
      //state = items.trialState;
      return 'Next visit:'
    }
  }
  const [visitDate, setVisitDate] = useState('')
  const [armLabel, setArmLabel] = useState('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [modalType, setModalType] = useState<string>('')

  const setPatientArmLabel = ( value : number ) => {
    armData.forEach((items: IStudyArm) => {
      const index = items.visits?.findIndex((item: IStudyArmVisit) => item.armVisitId === value)
      if (index !== undefined && index >= 0) setArmLabel(items.armLabel)
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onclickReschedule = () => {
    setModalType('reschedule')
    setOpenModal(true)
    setAnchorEl(null)
  }

  const onclickApptComplete = () => {
    setModalType('apptcomplete')
    setOpenModal(true)
    setAnchorEl(null)
  }

  useEffect(() => {
    if (items !== null) {
      const existElem = items.referralVisits.findIndex(
        (item: IReferralVisitsData) =>
          item.appointmentStatus === 'Scheduled'
      )
      if (existElem >= 0) {
        setPatientArmLabel(items.referralVisits[existElem].armVisitId)
        setVisitDate(items.referralVisits[existElem].appointmentDate)
      }
    }
  }, [items])

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleModalClose = () => {
    setOpenModal(false)
  }

  return (
    <div className={styles.root}>
      <div>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={styles.modalBody}>
            <PatientMoreFunction type={modalType} modalClose={handleModalClose} />
          </div>
        </Modal>
      </div>
      <div className={styles.moreButton}>
        <IconButton aria-label="delete" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={onclickReschedule}>Reschedule</MenuItem>
          <MenuItem onClick={onclickApptComplete}>Appt complete</MenuItem>
        </Menu>
      </div>
      <div onClick={cardClick}>
        <div className={styles.title}>
          {items.firstName + ' ' + items.lastName}
        </div>
        <div className={styles.type}>
          {items.owner?.toString().toUpperCase()}
        </div>
        <div className={styles.ivrs}>
          <div className={styles.labelFlap}>
            <div>
              SUBJECT ID#
            </div>
            <div>
              {(items.ivrno === '' || items.ivrno === null) ? 'N/A' : items.ivrno}
            </div>
          </div>
          <div>
            {armLabel}
          </div>
        </div>
        <div className={styles.dividerFlap}>
          <Divider variant="middle" component="div" style={{ marginLeft: '11px' }} />
        </div>
        <div className={styles.footer}>
          <div className={styles.titleFlap}>
            <div className={styles.labelFlap}>
              {filterTypeText()}
            </div>
            <div>
              {(visitDate !== null && visitDate !== '') &&
                format(new Date(visitDate), 'MM/dd/yyyy')
              }
            </div>
          </div>
          <div className={styles.visit}>
            {state}
          </div>
        </div>

      </div>
    </div>
  )
}

export default RetentionCard
