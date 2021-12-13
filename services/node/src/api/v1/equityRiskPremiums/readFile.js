import fs from 'fs/promises'

const readFile = async () => {
  const industryAverages = await fs.readFile(
    new URL('./countries.json', import.meta.url),
    'utf8'
  )

  return JSON.parse(industryAverages)
}

export default readFile
