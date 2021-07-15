import React, { useState } from 'react'
import { readRemoteFile } from 'react-papaparse'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Button } from '@material-ui/core'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import { emailValidation } from 'utils/helper'

import DropZone from 'components/addPatients/dropZone'
import SelectDropdown from 'components/addPatients/selectDropdown'
import styles from './styles.module.scss'
import patientUpload from 'services/uploadService'
import { getCSVHeaders } from 'utils/uploader'

type State = {
    label: string;
    value: string;
}

type ValidationResultType = {
    firstName: string;
    lastName: string;
    invalidField: string;
    reason: string;
}

type TCSVObject = {
    [key: string]: string;
};

const items: State[] = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Email Address', value: 'email_address' },
  { label: 'Cell Phone', value: 'cell_phone' },
  { label: 'Zip', value: 'zip' },
  { label: 'Randomization Date', value: 'randomization_date' },
]

type Props = {
    onCancel: () => void;
}

const AddPatient: React.FC<Props> = ({ onCancel }) => {

  const { t } = useTranslation()

  const history = useHistory()
  const { studyId } = useSelector((store: any) => store.study)

  const [itemArray, setItemArray] = useState<string[]>([])
  const [matchFieldState, setMatchFieldState] = useState(false)
  const [continueButtonState, setContinueButtonState] = useState(true)
  const [continueButtonShowState, setContinueButtonShowState] = useState(true)
  const [uploadCompleteState, setUploadCompleteState] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [importPatientNumber, setImportPatientNumber] = useState(0)
  const [patientUploadResult, setPatientUploadResult] = useState<IPatientUploadResultData[]>([])
  const [patientObject, setPatientObject] = useState<TCSVObject>({})
  const [fileData, setFileData] = useState<string>('')

  const selectedChange = (key: string, value: string) => {
    setPatientObject(prev => ({ ...prev, [key]: value }))
  }

  // useEffect(() => {
  //     setAddEnabled((items.findIndex((item: State) => (patientObject[item.value] === undefined)) > -1));
  // }, [patientObject])

  const setDefault = () => {
    setMatchFieldState(false)
    setContinueButtonState(true)
    setContinueButtonShowState(true)
    setUploadCompleteState(false)
    setUploadFile(null)
    setProgress(0)
    setItemArray([])
  }

  const onAddClick = async () => {
    setUploadCompleteState(true)
    await insertPatientData(patientObject, itemArray, fileData)
  }

  const onContinueClick = async () => {
    if (!uploadFile)
      return // TODO Notify user of issue with file
    setContinueButtonShowState(false)
    setContinueButtonState(true)
    await readFile(uploadFile)
  }

  const onDoneClick = () => {
    setDefault()
    onCancel()
  }

  const insertPatientData = async (patientObject: TCSVObject, csvHeaders: string[], fileData: string) => {
    //get siteId
    const siteId = Number(localStorage.getItem('siteId'))
    //get mappedeader
    const mappedHeader: IMappedHeaderData = {
      firstname: (patientObject.first_name !== null && patientObject.first_name !== '') ? patientObject.first_name : '',
      lastname: (patientObject.last_name !== null && patientObject.first_name !== '') ? patientObject.last_name : '',
      emailAddress: (patientObject.email_address !== null && patientObject.email_address !== '') ? patientObject.email_address : '',
      cellPhone: (patientObject.cell_phone !== null && patientObject.cell_phone !== '') ? patientObject.cell_phone : '',
      zip: (patientObject.zip !== null && patientObject.zip !== '') ? patientObject.zip : '',
      randomizationDate: (patientObject.randomization_date !== null && patientObject.randomization_date !== '') ? patientObject.randomization_date : ''
    }
    // get base64 string
    const base64String = Buffer.from(fileData).toString('base64')

    const data = await patientUpload.postPatientUpload(studyId, siteId, mappedHeader, base64String, history)
    const tempArray: IPatientUploadResultData[] = []
    if (data[0] !== undefined && data[0] !== null) {
      setImportPatientNumber(data[0].length)
    }
    else setImportPatientNumber(0)
    if (data[2] !== undefined && data[2] !== null) {
      data[2].forEach((items: IPatientUploadReturnData) => {
        tempArray.push({
          'patientName': `${items.firstname} ${items.lastname}`,
          'uploadResult': items.result,
        })
      })
      setPatientUploadResult(tempArray)
    }
    //setPatientUploadResult
  }
  //dispatch(postPatientUpload(studyId, siteId, mappedHeader, base64String, history));
  const onCancelClick = () => {
    setDefault()
    onCancel()
  }

  const readFile = async (file: any) => {
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.onload = async (e) => {
        if (!e || !e.target || !e.target.result) {
          resolve(false)
          return // TODO Indicate bad file
        }
        const headerItems = await getCSVHeaders(file)
        if (!headerItems || headerItems.length < 1) {
          resolve(false)
          return // TODO Indicate bad file, couldn't parse csv headers
        }
        setProgress(100)
        setMatchFieldState(true)
        setItemArray(headerItems)
        setFileData(e.target.result as string)
        resolve(true)
      }
      reader.readAsText(file, 'utf-8')
    })
  }

  const onFile = (file: any) => {
    setUploadFile(file)
    setContinueButtonState(false)
  }

  return (
    <>
      {
        matchFieldState === false &&
                <>
                  <div className={styles.root}>
                    <div className={styles.title}>
                      {t('BUTTON.ADD_PATIENTS')}
                    </div>
                    <DropZone onFile={onFile} progress={progress} continueButtonState={continueButtonState} />
                    <div className={styles.buttons}>
                      {
                        continueButtonShowState === true &&
                                <div className={styles.button}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: '110px', height: '40px' }}
                                    disabled={continueButtonState}
                                    onClick={onContinueClick}
                                  >
                                    {t('BUTTON.CONTINUE')}
                                  </Button>
                                </div>
                      }
                      <div className={styles.buttonCancel}>
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ width: '110px', height: '40px' }}
                          onClick={onCancelClick}
                        >
                          {t('BUTTON.CANCEL')}
                        </Button>
                      </div>
                    </div>
                    <div className={styles.labelButton}>
                      {t('BUTTON.DOWNLOAD_CSV_TEMPLATE')}
                    </div>
                  </div>
                </>
      }
      {
        matchFieldState === true &&
                <>
                  {
                    uploadCompleteState === false &&
                        <>
                          <div className={styles.rootMatch}>
                            <div className={styles.title}>
                              <div>
                                {t('BUTTON.ADD_PATIENTS')}
                              </div>
                              <div className={styles.bottomTitle}>
                                {t('BUTTON.MAP_DATA_FIELDS')}
                              </div>
                            </div>
                            <div className={styles.body}>
                              {items.map((item: any, index: number) => (
                                <div key={index} className={styles.root}>
                                  <div className={styles.label}>
                                    {item.label}
                                  </div>
                                  <div className={styles.dropDown}>
                                    <SelectDropdown
                                      items={itemArray}
                                      value={patientObject[item.value] ?? ''}
                                      type={item.value}
                                      onSelectChange={selectedChange}
                                      placeholder="Select Column"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className={styles.footer}>
                              <div className={styles.buttonAdd}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{ width: '110px', height: '40px' }}
                                  onClick={onAddClick}
                                >
                                  {t('BUTTON.UPLOAD')}
                                </Button>
                              </div>
                              <div className={styles.buttonCancel}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  style={{ width: '110px', height: '40px' }}
                                  onClick={onCancelClick}
                                >
                                  {t('BUTTON.CANCEL')}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                  }
                  {
                    uploadCompleteState === true &&
                        <>
                          <div className={styles.rootMatch}>
                            <div className={styles.title}>
                              <div className={styles.titleName}>
                                {t('BUTTON.ADD_PATIENT_COMPLETE')}
                              </div>
                              <div className={styles.content}>
                                <div className={styles.checkStyle}>
                                  <div>
                                    <CheckCircleOutlinedIcon style={{ width: '30px', height: '30px' }} />
                                  </div>
                                  <div className={styles.checkLabel}>
                                    {t('BUTTON.IMPORTED')} {importPatientNumber} patients
                                  </div>
                                </div>
                                <div className={styles.cancelStyle}>
                                  <div className={styles.cancelTitle}>
                                    <div>
                                      <CancelOutlinedIcon style={{ width: '30px', height: '30px' }} />
                                    </div>
                                    <div className={styles.cancelLabel}>
                                      {patientUploadResult.length} {t('BUTTON.PATIENTS_COULD_NOT_BE_IMPORTED')}
                                    </div>
                                  </div>
                                  <div className={styles.cancelBody}>
                                    {patientUploadResult.map((item: IPatientUploadResultData, index: number) => (
                                      <div key={index} className={styles.cancelItem}>
                                        {item.patientName}  ( {item.uploadResult} )
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.footerRoot}>
                              <div>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{ width: '110px', height: '40px' }}
                                  onClick={onDoneClick}
                                >
                                  {t('BUTTON.DONE')}
                                </Button>
                              </div>
                              <div className={styles.buttonLabel}>
                                {t('BUTTON.DOWNLOAD_KICKOUT_FILE')}
                              </div>
                            </div>
                          </div>
                        </>
                  }
                </>
      }
    </>
  )
}

export default AddPatient
