import React from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { IconButton } from '@mui/material'

type Props = {
  expanded?: boolean;
  state?: boolean;
}

const ExpandButton: React.FC<Props> = ({ expanded = false, state }) => {

  return (
    <>
      {
        state === true ?
          <div>
            <IconButton
              style={{ color: '#212121' }}
              aria-label="add an alarm"
            >
              {
                expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />
              }
            </IconButton>
          </div> :
          <div>
            <IconButton
              style={{ color: '#7B91AB' }}
              aria-label="add an alarm"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
      }
    </>
  )
}

export default ExpandButton
