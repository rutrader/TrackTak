import { FunctionPlugin } from '@tracktak/hyperformula'
import { timeToNumber } from '../helpers'

export const implementedFunctions = {
  SPREADSHEET_CREATION_DATE: {
    method: 'spreadsheetCreationDate',
    parameters: [],
    returnNumberType: 'NUMBER_DATETIME'
  }
}

export const aliases = {
  SCD: 'SPREADSHEET_CREATION_DATE'
}

export const translations = {
  enGB: {
    SCD: 'SPREADSHEET_CREATION_DATE'
  }
}

export class Plugin extends FunctionPlugin {
  setSpreadsheetCreationDate(creationDate) {
    this.creationDate = creationDate
  }

  spreadsheetCreationDate(ast, state) {
    const metadata = this.metadata('SPREADSHEET_CREATION_DATE')

    return this.runFunction(ast.args, state, metadata, () => {
      const date = this.creationDate

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
Plugin.aliases = aliases
