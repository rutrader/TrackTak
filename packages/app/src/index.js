import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import AccountSettings from './components/AccountSettings'
import Dashboard from './components/Dashboard'
import { TTProvider, Layout, LayoutXL } from '@tracktak/common'
import CancelPlan from './components/CancelPlan'
import PaymentSuccess from './components/PaymentSuccess'
import SwitchingPlan from './components/SwitchingPlan'
import FinancialModel from './components/FinancialModel'
import LayoutFullScreen from './components/LayoutFullScreen'
import AuthenticatedHeader from './components/AuthenticatedHeader'
import Authenticated from './components/Authenticated'
import Pricing from './components/Pricing'

const LayoutContainer = () => {
  return (
    <Layout header={<AuthenticatedHeader />}>
      <Outlet />
    </Layout>
  )
}

const Index = () => {
  return (
    <TTProvider>
      <Authenticated>
        <BrowserRouter>
          <Routes>
            <Route
              path=':name/my-spreadsheets/:sheetId'
              element={
                <LayoutFullScreen>
                  <FinancialModel />
                </LayoutFullScreen>
              }
            />
            <Route
              path='pricing'
              element={
                <LayoutXL header={<AuthenticatedHeader />}>
                  <Pricing />
                </LayoutXL>
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
      </Authenticated>
    </TTProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
