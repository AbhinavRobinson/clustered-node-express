import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

export const server = (port: number) => {
  const app = express()

  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.listen(port, () => console.log(`❄️ App listening on port ${port}!`))
}
