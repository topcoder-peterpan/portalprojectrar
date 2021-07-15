import React, { useEffect, useState } from 'react'
import { Badge, Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import TabButton from 'components/tabButton'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setStudyId } from 'store/actions/study.actions'
import Study from '../../types/study'

type Props = {
  studyRoute: string;
  children: React.ReactNode;
};

//const tabButtonLists = ["recruitment", "retention", "calendar", "support"];
const tabButtonLists = ['retention', 'calendar', 'support']

const StudyLayout: React.FC<Props> = ({ studyRoute, children }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const history = useHistory()
  const dispatch = useDispatch()

  const changeTabIndex = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  const { filterType, toggleButtonState, sortType } = useSelector((store: any) => store.study)

  const [pageName, setPageName] = useState('')

  const SetPageTitle = (value: number) => {
    switch (value) {
    // case 0:
    //   setPageName("RECRUITMENT");
    //   break;
    case 0:
      setPageName('RETENTION PIPELINE')
      break
    case 1:
      setPageName('CALENDAR')
      break
    default:
      setPageName('SUPPORT')
      break
    }
  }

  const { studies } = useSelector((store: any) => store.dashboard)
  const study = studies.find((s: Study) => s.studyRoute === studyRoute)
  const studyTitle = study ? study.studyTitle : studyRoute

  useEffect(() => {
    if (study)
      dispatch(setStudyId(study.id))
  }, [])

  useEffect(() => {
    if (tabIndex === 0) {
      history.push(`/study/${studyRoute}/${tabButtonLists[tabIndex]}/?view=${toggleButtonState.toString().toLowerCase()}&filter=${filterType.toString().toLowerCase()}&sort=${sortType.toString().toLowerCase()}`)
    }
    else {
      history.push(`/study/${studyRoute}/${tabButtonLists[tabIndex]}`)
    }
    SetPageTitle(tabIndex)
    // eslint-disable-next-line
  }, [tabIndex, toggleButtonState, filterType, sortType]);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.title_text}>
              <div className={styles.labels}>
                <div className={styles.studyLabel}>
                  {studyTitle.toUpperCase()}
                </div>
                <div className={styles.titleLabel}>
                  {pageName}
                </div>
              </div>
              <div className={styles.badge}>
                <Badge badgeContent={'ACTIVE'} color="secondary" />
              </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.tabButton} >
                <TabButton value={tabIndex} handleChange={changeTabIndex} items={tabButtonLists} />
              </div>
            </div>
          </div>
          <Divider className={styles.divider} />
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default StudyLayout
