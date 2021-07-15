import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { List, ListItem, Divider, Modal, Menu, MenuItem } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'


import format from 'date-fns/format'
import Patient from 'pages/retention/trial/patient'
import { setNoteState } from 'store/actions/patient.actions'
import styles from './styles.module.scss'
import PatientMoreFunction from 'components/patientMoreFunction'

type Props = {
  lists: IVisitListData[];
};

const Lists: React.FC<Props> = ({ lists }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [modalType, setModalType] = useState<string>('')

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleModalClose = () => {
    setOpenModal(false)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
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

  const body = (
    <div className={styles.modalBody}>
      <PatientMoreFunction type={modalType} modalClose={handleModalClose} />
    </div>
  )

  return (
    <>
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <List className={styles.root} style={{ paddingTop: '20px' }} >
        {lists.map((list: IVisitListData, index: number) => (
          <div key={index}>
            <ListItem className={styles.content}>
              <div className={styles.icon}>
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
              <div className={styles.line}>
                <div className={styles.date}>
                  {list.visitDate &&
                    format(new Date(list.visitDate), 'M/d/yyyy')
                  }
                </div>
              </div>
              <div className={styles.nameDashboard}>
                {list.patientName}
              </div>
              <div className={styles.nameDashboard2}>
                &nbsp;- Visit {list.currentVisitNumber}
              </div>
              <div className={styles.descriptionDashboard}>
                <div className={styles.studyName}>
                  {list.studyName !== '' &&
                    <>
                      {list.studyName}
                    </>
                  }
                </div>
                <div>
                  {list.prevVisitNumber !== '' &&
                    <>
                      {list.prevVisitNumber} – SUBJECT ID# {list.prevVisitIVRS}
                    </>
                  }
                </div>
                <div>
                  {list.visitDate &&
                    format(new Date(list.visitDate), 'h:mm aa')
                  }
                </div>
              </div>
            </ListItem>
            <div className={styles.dividerDashboard}>
              <Divider variant="middle" />
            </div>
          </div>
        ))}
      </List>
    </>
  )
}

export default Lists

