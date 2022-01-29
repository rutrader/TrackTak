const convertCurrencies = value => {
  if (value === 'p') {
    return '£'
  }

  if (value === 'Pence sterling') {
    return 'Pound sterling'
  }

  if (value === 'Israeli Agora') {
    return 'Israeli Shekel'
  }

  if (value === 'ILA') {
    return 'ILS'
  }

  if (value === 'GBX') {
    return 'GBP'
  }

  return value
}

export default convertCurrencies
