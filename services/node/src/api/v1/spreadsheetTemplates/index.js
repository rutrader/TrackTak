import express from 'express'
import fs from 'fs/promises'
import merge from 'lodash.merge'

const router = express.Router()

router.get('/:name', async (req, res) => {
  const mainTemplate = await fs.readFile(
    new URL(`./templates/${req.params.name}/index.json`, import.meta.url),
    'utf8'
  )

  const year = req.params.year

  const yearTemplate = await fs.readFile(
    new URL(
      `./templates/${req.params.name}/years/${year}.json`,
      import.meta.url
    ),
    'utf8'
  )

  const template = merge(mainTemplate, yearTemplate)

  res.send({ template: JSON.parse(template) })
})

export default router
