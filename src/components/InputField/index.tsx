import {
  Box,
  TextField,
  TextFieldProps,
} from '@material-ui/core'
import React from 'react'

import useStyles from './style'
type CustomInputField = TextFieldProps & {
  formik: any,
  hideError?: boolean,
  width?: string,
  options?: string[],
  name: string
}

const InputField: React.FC<CustomInputField> = ({
  formik,
  className,
  type = 'text',
  variant = 'outlined',
  name,
  label,
  hideError = false,
  width = '100%',
  options = [],
  onChange,
  onBlur,
  ...rest
}: CustomInputField) => {
  const classes = useStyles()

  const isError = !!formik.touched[name] && !!formik.errors[name]

  const handleChange = (event: any) => {
    formik.handleChange(event)
    if (onChange) {
      onChange(event)
    }
  }

  const handleBlur = (event: any) => {
    formik.handleBlur(event)
    if (onBlur) {
      onBlur(event)
    }
  }


  const renderComponent = () => {
    return (
      <TextField
        className={classes.input}
        type={type}
        label={label}
        variant={variant}
        {...formik.getFieldProps(name)}
        helperText={!hideError && isError ? formik.errors[name] : ''}
        error={isError}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
        style={{ width }}
      />
    )
  }

  return (
    <Box className={className} width={width}>
      {renderComponent()}
    </Box>
  )
}

export default InputField
