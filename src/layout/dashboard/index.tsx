import {
  Box, Container
} from '@material-ui/core'
import React from 'react'

import Header from '../../components/header'

import styles from './styles.module.scss'

interface DashboardLayoutProps {
    children: any,
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  return (
    <Box component="main" >
      <Header />
      <Container maxWidth="xl" >
        <div className={styles.layout}>
          {children}
        </div>
      </Container>
      <div className={styles.footer} />
    </Box>
  )
}

export default DashboardLayout
