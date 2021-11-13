import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from 'react-router-dom'
import AccountSettings from './components/AccountSettings'
import Dashboard from './components/Dashboard'
import { TTProvider, Layout } from '@tracktak/common'
import CancelPlan from './components/CancelPlan'
import PaymentSuccess from './components/PaymentSuccess'
import SwitchingPlan from './components/SwitchingPlan'
import FinancialSpreadsheet from './components/FinancialSpreadsheet'
import LayoutFullScreen from './components/LayoutFullScreen'

const LayoutContainer = () => {
  const navigate = useNavigate()

  return (
    <Layout navigate={navigate}>
      <Outlet />
    </Layout>
  )
}

const Index = () => {
  return (
    <TTProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path=':name/my-spreadsheets/:sheetId'
            element={
              <LayoutFullScreen>
                <FinancialSpreadsheet />
              </LayoutFullScreen>
            }
          />
          <Route path='/' element={<LayoutContainer />}>
            <Route path='account-settings' element={<AccountSettings />} />
            <Route path='payment-success' element={<PaymentSuccess />} />
            <Route path='switching-plan' element={<SwitchingPlan />} />
            <Route path='cancel-plan' element={<CancelPlan />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TTProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
