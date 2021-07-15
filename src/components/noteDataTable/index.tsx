import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Badge } from '@material-ui/core'

import styles from './styles.module.scss'
import { getPatientNoteData } from 'store/actions/patient.actions'
import { useHistory } from 'react-router'

type Props = {
  filterType: string;
  studyId: number;
  patientId: number;
}

const NoteDataTable: React.FC<Props> = ({ studyId, patientId, filterType }) => {

  const { t } = useTranslation()

  const { patientNoteData } = useSelector((store: any) => store.patient)

  const items: IPatientNoteData[] = patientNoteData
  const [displayData, setDisplayData] = useState<IPatientNoteData[]>([])

  const data = useMemo(() => (
    (items.length > 0) ?
      items.sort((first, second) => {
        if (first['referralNotesId'] > second['referralNotesId']) return 1
        else if (first['referralNotesId'] < second['referralNotesId']) return -1
        return 0
      }) : []
  ), [])

  useEffect(() => {
    if (filterType === '' || filterType === 'allnotes') setDisplayData(data)
    else if (filterType === 'privatenotes') setDisplayData(data.filter(item => item.isPrivate === true))
    else setDisplayData(data.filter(item => item.isPrivate === false))
  }, [filterType])

  return (
    <Table className={styles.root} aria-label="simple table">
      <TableHead className={styles.headerRow}>
        <TableRow>
          <TableCell className={styles.header} width="20%" align="left">{t('TABLE.DATE_CREATED')}</TableCell>
          <TableCell className={styles.header} width="50%" align="left">{t('TABLE.NOTES')}</TableCell>
          <TableCell className={styles.header} width="20%" align="left">{t('TABLE.CREATED_BY')}</TableCell>
          <TableCell className={styles.header} width="10%" align="left"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={styles.body}>
        {
          displayData.map((item: IPatientNoteData, index: number) => (
            <TableRow key={index}>
              <TableCell className={styles.body} component="th" scope="row">{item.createdDtmUTC.substr(0, 10)}</TableCell>
              <TableCell className={styles.body} align="left">{item.noteSubject}</TableCell>
              <TableCell className={styles.body} align="left">{item.createdBy}</TableCell>
              <TableCell className={styles.body} align="left">{item.isPrivate === true ? <Badge badgeContent='private' style={{ paddingLeft: '3px', paddingRight: '3px', paddingBottom: '3px' }} color={'secondary'} /> : ''}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>

  )
}

export default NoteDataTable