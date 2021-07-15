import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'

import StudyLayout from 'layout/study'
import Retention from '../pages/retention/index'
import Patient from '../pages/retention/trial/patient'
import AddPatient from '../pages/retention/trial/patient/add'
import Support from '../pages/support'
import CalendarPage from 'pages/calendar'

type ParamsType = {
  studyId: string;
};

const StudyRoute: React.FC = () => {
  const { studyId } = useParams<ParamsType>()
  const path = `/study/${studyId}`

  return (
    <StudyLayout studyRoute={studyId}>
      <Switch>
        <Route path={`${path}/retention`} component={Retention} exact />
        <Route path={`${path}/retention/patient/:patientName`} component={Patient} />
        <Route path={`${path}/retention/add-patients`} component={AddPatient} />
        <Route path={`${path}/calendar`} component={CalendarPage} />
        <Route path={`${path}/support`} component={Support} />
      </Switch>
    </StudyLayout>
  )
}

export default StudyRoute
