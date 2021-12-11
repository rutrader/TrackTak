import { FunctionPlugin } from '@tracktak/hyperformula'

export const implementedFunctions = {
  SPREADSHEET_CREATION_DATE: {
    method: 'spreadsheetCreationDate'
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
  spreadsheetCreationDate(ast, state) {
    const metadata = this.metadata('SPREADSHEET_CREATION_DATE')

    return this.runFunction(ast.args, state, metadata, () => {
      const now = new Date(Date.now())
      return this.dateTimeHelper.dateToNumber({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      })
    })
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
