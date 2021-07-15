import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

import { Button, IconButton, Modal, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

import NoteDataTable from 'components/noteDataTable'
import SelectDropdown from 'components/selectDropdown'
import SwitchButton from 'components/switchButton'
import { styled } from '@mui/material/styles'

import { postPatientNoteData, getPatientNoteData } from 'store/actions/patient.actions'
import styles from './styles.module.scss'
import { useHistory } from 'react-router'
import { send } from 'process'
import MediaQuery from 'react-responsive'

type Props = {
  patientId: number;
  studyId: number;
}

const PatientNote: React.FC<Props> = ({ patientId, studyId }) => {

  const history = useHistory()

  const { t } = useTranslation()

  const [noteSubject, setNoteSubject] = useState('')
  const [noteText, setNoteText] = useState('')
  const [switchButtonState, setSwitchButtonState] = useState(false)
  const [filterValue, setFilterValue] = React.useState('')
  const [noteState, setNoteState] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  type State = {
    id: number;
    value: string;
  };

  const [filters] = useState<State[]>([
    { id: 1, value: 'all notes' },
    { id: 2, value: 'private notes' },
    { id: 3, value: 'non-private notes' },
  ])

  const dispatch = useDispatch()

  const filterHandleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setFilterValue(event.target.value as string)
  }

  const onAddNoteClick = () => {
    setNoteState(true)
  }

  const onCancelClick = () => {
    setNoteState(false)
    setNoteText('')
    setNoteSubject('')
    setSwitchButtonState(false)
  }

  const onSwitchClick = () => {
    setSwitchButtonState(!switchButtonState)
  }

  const onSaveClick = async () => {
    await dispatch(postPatientNoteData(studyId, patientId, noteSubject, noteText, switchButtonState, history))
    setNoteState(false)
    dispatch(getPatientNoteData(studyId, patientId, history))
    setNoteText('')
    setNoteSubject('')
    setSwitchButtonState(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className={styles.table}>
      {noteState === false &&
        <div className={styles.tabPanelFour}>
          <div className={styles.header}>
            <div className={styles.buttons}>
              <div className={styles.labelFlap}>
                {t('PATIENT.SHOW')}
              </div>
              <div className={styles.buttonFlap}>
                <SelectDropdown items={filters} value={filterValue} onSelectChange={filterHandleChange} />
              </div>
            </div>
            <div className={styles.outlineFlap}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onAddNoteClick()}
              >
                <div className={styles.content} >
                  <div className={styles.icon}>
                    <AddCircleOutlineIcon />
                  </div>
                  <MediaQuery minWidth={1204}>
                    <div className={styles.label}>
                      {t('BUTTON.ADDNOTE')}
                    </div>
                  </MediaQuery>
                </div>
              </Button>
            </div>
          </div>
          <div className={styles.body}>
            <NoteDataTable studyId={studyId} patientId={patientId} filterType={filterValue} />
          </div>
        </div>}
      {noteState === true &&
        <div className={styles.tabPanelFour}>
          <div className={styles.header}>
            <div className={styles.noteTitle}>
              <TextField
                id="note-title"
                placeholder="New Note"
                variant="outlined"
                fullWidth
                maxRows={1}
                value={noteSubject}
                onChange={ev => setNoteSubject(ev.target.value)}
              />
            </div>
            <div className={styles.buttonBox}>
              <div className={styles.switchButtonFlap}>
                <SwitchButton onChange={onSwitchClick} />
              </div>
              <div className={styles.labelFlap}>
                {t('BUTTON.PRIVATENOTE')}
              </div>
              <div className={styles.iconButtonFlap}>
                { open &&
                  <div className={styles.modalBody}>
                    <div className={styles.triangleShape}>
                      <div className={styles.shape}></div>
                    </div>
                    <div className={styles.title}>PRIVATE NOTES</div>
                    <div className={styles.content}>Private notes will not be shared with the Sponsor</div>
                  </div>
                }
                <IconButton onMouseOver={handleOpen} onMouseOut={handleClose}>
                  <HelpOutlineOutlinedIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className={styles.contentText}>
            <TextField
              id="note-content"
              placeholder="Start typing here..."
              variant='standard'
              fullWidth
              multiline
              minRows={18}
              onChange={ev => setNoteText(ev.target.value)}
            />
          </div>
          <div className={styles.bottomButtons}>
            <div className={styles.saveButtonFlap}>
              <Button
                variant="contained"
                color="primary"
                className={styles.saveButton}
                onClick={() => onSaveClick()}
                id="save-button"
                disabled={!noteSubject}
              >
                {t('BUTTON.SAVE')}
              </Button>
            </div>
            <div className={styles.cancelButtonFlap}>
              <Button
                variant="outlined"
                className={styles.cancelButton}
                onClick={() => onCancelClick()}
              >
                {t('BUTTON.CANCEL')}
              </Button>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default PatientNote
