import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dropdown from './index'

const props = {
  'label': 'JOHN K'
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}))

describe('Dropdown', () => {
  it('Should show label successfully.', () => {
    render(<Dropdown {...props} />)
    screen.getByText(props.label)
  })
})