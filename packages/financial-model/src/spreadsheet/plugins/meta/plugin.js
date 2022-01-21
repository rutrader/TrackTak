import { FunctionPlugin } from '@tracktak/hyperformula'
import { timeToNumber } from '../helpers'

export const implementedFunctions = {
  'META.SPREADSHEET_CREATION_DATE': {
    method: 'spreadsheetCreationDate',
    parameters: [],
    returnNumberType: 'NUMBER_DATETIME'
  }
}

export const translations = {
  enGB: {
    'META.SPREADSHEET_CREATION_DATE': 'META.SPREADSHEET_CREATION_DATE'
  }
}

export const getPlugin = creationDate => {
  class Plugin extends FunctionPlugin {
    spreadsheetCreationDate(ast, state) {
      const metadata = this.metadata('META.SPREADSHEET_CREATION_DATE')

      return this.runFunction(ast.args, state, metadata, () => {
        const date = creationDate

        return (
          timeToNumber({
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
          }) +
          this.dateTimeHelper.dateToNumber({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          })
        )
      })
    }
  }

  Plugin.implementedFunctions = implementedFunctions

  return Plugin
}
