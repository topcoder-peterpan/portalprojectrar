import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

import styles from './styles.module.scss'

const PatientPreQualification: React.FC = () => {

  const { t } = useTranslation()

  const { patientPreQualificationData } = useSelector((store: any) => store.patient)

  const items: IPatientPreQualificationData[] = patientPreQualificationData

  const data = useMemo(() => (
    (items.length > 0) ?
      items.sort((first, second) => {
        if (first['questionId'] > second['questionId']) return 1
        else if (first['questionId'] < second['questionId']) return -1
        return 0
      }) : []
  ), [items])

  const removeHTML = ( value : string ) => {
    return value.replace(/<.*?>/g, '')
  }

  return (
    <div className={styles.table}>
      <Table className={styles.root} aria-label="simple table">
        <TableHead className={styles.headerRow}>
          <TableRow>
            <TableCell className={styles.header} width="60%" align="left">{t('TABLE.ITEM')}</TableCell>
            <TableCell className={styles.header} width="40%" align="left">{t('TABLE.RESPONSE')}</TableCell>
          </TableRow>
        </TableHead>
        {data && <TableBody>
          {data.map((item: IPatientPreQualificationData, index: number) => (
            <TableRow key={index}>
              <TableCell className={styles.body} component="th" scope="row">{removeHTML(item.question)}</TableCell>
              <TableCell className={styles.body} align="left">{item.answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </div>
  )
}

export default PatientPreQualification
