import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

export const worker = (port: number) => {
  const app = express()
  const pid = process.pid

  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/', (req, res) => {
    setTimeout(() => {
      res.send('Hello World!')
    }, 200)
  })

  app.listen(port, () =>
    console.log(`❄️ Process:${pid} listening on port ${port}!`)
  )
}
