import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccountSettings from './components/AccountSettings'
import Dashboard from './components/Dashboard'
import { TTProvider } from '@tracktak/common'
import CancelPlan from './components/CancelPlan'
import PaymentSuccess from './components/PaymentSuccess'
import SwitchingPlan from './components/SwitchingPlan'
import FinancialSpreadsheet from './components/FinancialSpreadsheet'

const Index = () => {
  return (
    <TTProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path=':name/my-spreadsheets/:sheetId'
            element={<FinancialSpreadsheet />}
          />
          <Route path='/account-settings' element={<AccountSettings />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/switching-plan' element={<SwitchingPlan />} />
          <Route path='/cancel-plan' element={<CancelPlan />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </TTProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
