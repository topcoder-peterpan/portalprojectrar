import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import MediaQuery from 'react-responsive'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'

import logoCircle from '../../assets/imgs/circle_logo.png'
import Logo from '../../assets/imgs/logo_main.png'
import CloseIcon from '@mui/icons-material/Close'


import {
  AppBar,
  Box,
  IconButton,
  Modal,
  Toolbar,
} from '@material-ui/core'
import {
  NotificationsOutlined,
  SearchOutlined
} from '@material-ui/icons'

import Dropdown from 'components/dropdown'
import AvatarDown from 'components/avatarDown'

import {
  getStudies,
  getStudyArms,
  getSites,
  getSiteStudies,
  getCards
} from 'store/actions/dashboard.actions'
import {
  setStudyId,
  setSiteId,
  setSort,
  setCardClick
} from 'store/actions/study.actions'
import { logoutUser } from 'store/actions/auth'

import styles from './styles.module.scss'
import Study from '../../types/study'
import Profile from '../../pages/profile'

type SelectOption = {
  label: string,
  value: number | string
}

const Header: React.FC = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const { studies, userName, sites } = useSelector((store: any) => store.dashboard)
  const { filterType, toggleButtonState, sortType } = useSelector((store: any) => store.study)
  const { studyId, cardClick } = useSelector((store: any) => store.study)
  const [selectedStudy, setSelectedStudy] = useState(null)
  const [selectedSite, setSelectedSite] = useState<SelectOption | null>(null)

  const userStudies: Study[] = studies
  const userSites: ISite[] = sites

  const resultStudiesList = useMemo(() => (
    userStudies.length > 0 ?
      userStudies.sort((first, second) => {
        if (first['id'] > second['id']) return 1
        else if (first['id'] < second['id']) return -1
        return 0
      }) : []
  ), [userStudies])

  const resultSitesList = useMemo(() => {
    const sortedSites = userSites.length > 0 ?
      userSites.sort((first, second) => {
        if (first['id'] > second['id']) return 1
        else if (first['id'] < second['id']) return -1
        return 0
      }) : []
    sortedSites.unshift({id: 0, value: 'all'})
    return sortedSites
  }, [userSites])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '')
    const { userId } = userData
    dispatch(getStudies(history))
    dispatch(getSites(userId, history))
    dispatch(getCards(history))
    setSelectedStudy(null)
  }, [dispatch])

  useEffect(() => {
    const itemData: any = {
      label: null,
      value: null,
    }
    if (cardClick === true) {
      if (studies.length > 0) {
        const index = studies.findIndex((items: Study) => items.id === studyId)
        if (index >= 0) {
          const study = studies[index]
          itemData.label = study.studyTitle
          itemData.value = studyId
        }
        setSelectedStudy(itemData)
      }
    }
  }, [cardClick])

  const onSelectStudyChange = (value: any) => {
    setSelectedStudy(value)
    dispatch(setStudyId(value.value))
    dispatch(setSort('apptdate'))
    const study = studies.find((s: Study) => s.id === value.value)
    if (study) {
      dispatch(getStudyArms(study.id, history))
      history.push(`/study/${study.studyRoute}/retention/?view=${toggleButtonState}&filter=${filterType}&sort=${sortType}`)
    }
  }

  const onSelectSiteChange = async (event: SelectOption | null) => {
    if (!event) {
      return
    }
    await setSelectedSite(event)
    const { value } = event
    if (typeof value === 'number') {
      await dispatch(setSiteId(value))
    } else {
      await dispatch(setSiteId(+value))
    }
    await dispatch(setSort('apptdate'))
    const site = sites.find((s: ISite) => s.id === event.value)
    if (site) {
      if (site.id) {
        dispatch(getSiteStudies(site.id, history))
      } else {
        dispatch(getStudies(history))
        dispatch(getCards(history))
      }
    }
  }

  const onClick = () => {
    setSelectedStudy(null)
    dispatch(setCardClick(false))
    history.push('/dashboard')
  }

  const [open, setOpen] = React.useState(false)

  const changeMenu = (value: string) => {
    switch (value) {
    case 'Profile':
      setOpen(true)
      break
    case 'Language':
      break
    case 'Logout':
      dispatch(logoutUser())
      break
    default:
      break
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <div className={styles.modalBody}>
      <div className={styles.closeButton} onClick={handleClose}>
        <CloseIcon style={{ color: '#7B91AB' }} />
      </div>
      <Profile />
    </div>
  )

  return (
    <AppBar className={styles.appBar} position="fixed">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <Toolbar className={styles.toolBar}>
        <MediaQuery minWidth={727}>
          <img src={Logo} alt="logo1" width="133" onClick={onClick} style={{ cursor: 'pointer' }} />
        </MediaQuery>
        <MediaQuery maxWidth={728}>
          <img src={logoCircle} alt="logo2" width="40" height="40" onClick={onClick} style={{ cursor: 'pointer' }} />
        </MediaQuery>
        <div className={styles.searchSelect}>
          <Select
            classNamePrefix="select"
            isSearchable
            placeholder={<div className={styles.studySelect}>CHOOSE STUDY</div>}
            onChange={onSelectStudyChange}
            name="study"
            value={selectedStudy}
            options={resultStudiesList.map((item: any) => ({ label: item.studyTitle?.toUpperCase(), value: item.id }))}
          />
        </div>
        { history.location.pathname === '/dashboard' && resultSitesList.length > 1 && (
          <div className={styles.searchSelect}>
            <Select
              classNamePrefix="select"
              isSearchable
              placeholder={<div className={styles.studySelect}>CHOOSE SITE</div>}
              onChange={onSelectSiteChange}
              name="site"
              value={selectedSite}
              options={resultSitesList.map((site: ISite) => ({ label: site.value.toUpperCase(), value: site.id }))}
            />
          </div>
        )}
        <Box flexGrow={1} />
        <MediaQuery maxWidth={727}>
          <IconButton style={{ marginLeft: '-5px', marginRight: '-17px' }} >
            <SearchOutlined />
          </IconButton>
        </MediaQuery>
        <MediaQuery minWidth={728}>
          <IconButton>
            <SearchOutlined />
          </IconButton>
        </MediaQuery>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <div className={styles.div_header_profile}>
          <MediaQuery maxWidth={727}>
            <div className={styles.avatarDown}>
              <AvatarDown items={[]} onChange={changeMenu} />
            </div>
          </MediaQuery>
          <MediaQuery minWidth={728}>
            <div className={styles.avatarDown}>
              <Dropdown label={userName} onChange={changeMenu} />
            </div>
          </MediaQuery>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
