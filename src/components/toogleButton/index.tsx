import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { useDispatch } from 'react-redux'
import { setToggleState } from 'store/actions/study.actions'

type Props = {
  item1: string;
  item2: string;
  item3: string;
}

const ToggleStateButton: React.FC<Props> = ({ item1, item2, item3 }: Props) => {

  const dispatch = useDispatch()

  const [alignment, setAlignment] = React.useState(item3.toLowerCase())

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === null) {
      setAlignment(alignment)
    }
    else if (alignment !== newAlignment) {
      setAlignment(newAlignment)
      dispatch(setToggleState(newAlignment))
    }
  }

  return (
    <div>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="active" aria-label="left aligned" component="div">
          {item1.toUpperCase()}
        </ToggleButton>
        <ToggleButton value="complete" aria-label="right aligned" component="div">
          {item2.toUpperCase()}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ToggleStateButton
