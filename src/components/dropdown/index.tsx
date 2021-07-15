import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, ClickAwayListener, Divider, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslation } from 'react-i18next'
import circle_logo from 'assets/imgs/circle_logo.png'
import steth from 'assets/imgs/steth.png'

import styles from './styles.module.scss'


type Props = {
  label: string;
  onChange?: (value: string) => void;
};

const Dropdown: React.FC<Props> = ({ label, onChange }) => {

  const  { t }  = useTranslation()

  const profileData = JSON.parse(localStorage.getItem('userData') || '')
  const { email } = profileData
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState(steth)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    if (onChange) {
      onChange(value)
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  useEffect(() => {
    if (email.includes('clinicaltrialmedia.com')) {
      setAvatar(circle_logo)
    }
  }, [email])

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div className={styles.label}>
          <Avatar alt="Remy Sharp" src={avatar} className={styles.avatar} />
          <div className={styles.droplist}>
            <div>{label.toUpperCase()}</div>
            <ExpandMoreIcon className={styles.dropicon}></ExpandMoreIcon>
          </div>
        </div>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList className={styles.menuitem}  autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem  onClick={() => handleClose('Profile')}>{t('HEADER.PROFILE')}</MenuItem>
                  <Divider style={{ margin: '10px' }}/>
                  <MenuItem  onClick={() => handleClose('Language')}>
                    {t('LANGUAGE.ENGLISH')}
                    <div className={styles.button}>{t('HEADER.CHANGE')}</div>
                  </MenuItem >
                  <Divider style={{ margin: '10px' }}/>
                  <MenuItem onClick={() => handleClose('Logout')}>{t('HEADER.LOGOUT')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default Dropdown
