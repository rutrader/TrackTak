const convertPenceToGBPIfNeeded = value => {
  if (value === 'p') {
    return '£'
  }

  if (value === 'Pence sterling') {
    return 'Pound sterling'
  }

  if (value === 'GBX') {
    return 'GBP'
  }

  return value
}

export default convertPenceToGBPIfNeeded
