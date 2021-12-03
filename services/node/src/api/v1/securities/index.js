import express from 'express'
import autocomplete from './autocomplete'
import country from './bonds/country'
import exchangeRates from './fx/exchangeRates'
import eod from './stocks/eod'
import fundamentals from './stocks/fundamentals/index'

const router = express.Router()

router.use('/autocomplete', autocomplete)
router.use('/bonds/country', country)
router.use('/fx/exchange-rates', exchangeRates)
router.use('/stocks/eod', eod)
router.use('/stocks/fundamentals', fundamentals)

export default router
