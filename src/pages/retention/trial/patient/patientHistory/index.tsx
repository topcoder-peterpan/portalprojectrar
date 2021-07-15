import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import styles from './styles.module.scss'

const PatientHistory: React.FC = () => {

  const { t } = useTranslation()

  const { patientHistoryData } = useSelector((store: any) => store.patient)

  const items: IPatientHistoryData[] = patientHistoryData

  const data = useMemo(() => (
    (items.length > 0) ?
      items.sort((first, second) => {
        if (first['eventDate'] > second['eventDate']) return 1
        else if (first['eventDate'] < second['eventDate']) return -1
        return 0
      }) : []
  ), [items])

  return (
    <div className={styles.table}>
      <Table className={styles.root} aria-label="simple table">
        <TableHead className={styles.headerRow}>
          <TableRow>
            <TableCell className={styles.header} width="20%" align="left">{t('TABLE.EVENT_TYPE')}</TableCell>
            <TableCell className={styles.header} width="15%" align="left">{t('TABLE.EVENT_DATE')}</TableCell>
            <TableCell className={styles.header} width="45%" align="left">{t('TABLE.COMMENTS')}</TableCell>
            <TableCell className={styles.header} width="20%" align="left">{t('TABLE.REFERRAL_STATUS')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((item: IPatientHistoryData, index: number) => (
            <TableRow key={index}>
              <TableCell className={styles.body} component="th" scope="row">{item.eventTypeName}</TableCell>
              <TableCell className={styles.body} align="left">{item.eventDate.substr(0, 10)}</TableCell>
              <TableCell className={styles.body} align="left">{item.comments}</TableCell>
              <TableCell className={styles.body} align="left">{item.referralStatusName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PatientHistory
