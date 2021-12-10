const dateFormatString = '([0-9]{4}-[0-9]{2}-[0-9]{2})'

export const fiscalDateRangeRegex = new RegExp(
  `(^(>|<)?${dateFormatString}$)|(^${dateFormatString};${dateFormatString}$)`
)
