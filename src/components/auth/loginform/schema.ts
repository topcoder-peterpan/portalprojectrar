import * as Yup from 'yup'
import i18n from 'i18next'

export default Yup.object().shape({
  email: Yup.string().email('Invalid email format').required(i18n.t('AUTH.EMAILREQUIRED')),
  password: Yup.string().max(255).required(i18n.t('AUTH.PWDREQUIRED')),
})
