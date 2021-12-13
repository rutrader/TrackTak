import express from 'express'
import fs from 'fs/promises'

const router = express.Router()

router.get('/:name', async (req, res) => {
  const template = await fs.readFile(
    new URL(`./templates/${req.params.name}`, import.meta.url),
    'utf8'
  )

  res.send({ template: JSON.parse(template) })
})

export default router
