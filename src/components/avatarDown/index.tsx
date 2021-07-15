import React from 'react'
import { Avatar, Button, ClickAwayListener, Divider, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'
import AvatarImg from 'assets/imgs/avatar1.svg'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

type Props = {
  onChange?: (value: string) => void;
  items: {
    label: string;
    value: string;
  }[];
};

const Avatardown: React.FC<Props> = ({ items, onChange }) => {

  const { t } = useTranslation()

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    if (onChange) {
      onChange(value)
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div className={styles.label}>
          <Avatar alt="Remy Sharp" src={AvatarImg} className={styles.avatar} />
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
                <MenuList className={styles.menuitem} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={() => handleClose('Profile')}>{t('HEADER.PROFILE')}</MenuItem>
                  <Divider style={{ margin: '10px' }} />
                  <MenuItem onClick={() => handleClose('Language')}>
                    {t('LANGUAGE.ENGLISH')}
                    <div className={styles.button}>{t('HEADER.CHANGE')}</div>
                  </MenuItem >
                  <Divider style={{ margin: '10px' }} />
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

export default Avatardown
