import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import styles from './styles.module.scss'

type Props = {
  label1: string;
  label2: string;
}

const Graphicbar: React.FC<Props> = ({ label1, label2 }) => {

  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <div className={styles.leftbar}>
        <div className={styles.barleft}>
          <MediaQuery minWidth={601}>
            <div className={styles.label}>
              {label1.toUpperCase()}
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={600}>
            <div className={styles.label}>
              {t('CONTENT.PERIOD')}
            </div>
          </MediaQuery>
        </div>
        <MediaQuery minWidth={601}>
          <div className={styles.barright}>
            <div className={styles.rotate}>
            </div>
          </div>
        </MediaQuery>
      </div>
      <MediaQuery minWidth={601}>
        <div className={styles.rightbar}>
          <div className={styles.label}>
            {label2.toUpperCase()}
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={600}>
        <div style={{ backgroundColor: '#69A3D6', width: '50%', height: '100%' }}>
        </div>
      </MediaQuery>
    </div>
  )
}

export default Graphicbar

