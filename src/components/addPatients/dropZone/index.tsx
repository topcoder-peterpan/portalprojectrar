import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from 'react-icons/all'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { IconButton } from '@material-ui/core'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

type Props = {
  onFile: (value: string) => void;
  progress: number;
  continueButtonState: boolean;
}

const DropZone: React.FC<Props> = ({ onFile, progress, continueButtonState }) => {

  const { t } = useTranslation()

  const [uploadReady, setReady] = React.useState(false)
  const [fileName, setFileName] = React.useState('')
  const [fileSize, setFileSize] = React.useState('')

  const onCancelClick = () => {
    setReady(false)
  }

  const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return (
      <Box className={styles.rootProgress}>
        <div className={styles.contentProgress}>
          <div className={styles.progressLabel}>
            {t('CONTENT.PROGRESSING')}(
            <Typography variant="body2" fontSize="18px" color="#2C6FB4">{`${Math.round(props.value)}%`}</Typography>
            )
          </div>
          <div className={styles.loaded}>
            <div className={styles.fileName}>
              {fileName}
            </div>
            <div className={styles.fileSize}>
              ({fileSize})
            </div>
            <div className={styles.buttons}>
              <IconButton style={{ width: '5px', height: '5px', color: 'white' }} onClick={() => { onCancelClick() }}>
                <CancelOutlinedIcon />
              </IconButton>
            </div>
          </div>
          <div className={styles.progressBar}>
            <LinearProgress variant="determinate" {...props} />
          </div>
        </div>
      </Box>
    )
  }

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length < 1)
      return
    const file = acceptedFiles[0]
    setFileName(file.name)
    setFileSize(file.size + ' bytes')
    onFile(file)
    setReady(true)
  }, [onFile])

  const { getRootProps, getInputProps } = useDropzone({ accept: '.csv', onDrop })

  return (
    <>
      {
        uploadReady === false &&
        <div {...getRootProps()} className={styles.border}>
          <input {...getInputProps()} />
          <div className={styles.root}>
            <div className={styles.icon}>
              <IoCloudUploadOutline style={{ width: '50px', height: '50px' }} />
            </div>
            <div className={styles.content}>
              <div className={styles.label}>{t('CONTENT.DROP_ZONE_COMMENT')}</div>
              <div className={styles.bold}>{t('CONTENT.BROWSE')}</div>
            </div>
          </div>
        </div>
      }
      {
        uploadReady === true &&
        <>
          {
            continueButtonState === false &&
            <div className={styles.contentLoad}>
              <div className={styles.loaded}>
                <div className={styles.fileName}>
                  {fileName}
                </div>
                <div className={styles.fileSize}>
                  ({fileSize})
                </div>
                <div className={styles.buttons}>
                  <IconButton style={{ width: '5px', height: '5px', color: 'white' }} onClick={() => { onCancelClick() }}>
                    <CancelOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          }
          {
            continueButtonState === true &&
            <Box sx={{ width: '100%' }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          }
        </>
      }
    </>
  )
}

export default DropZone
