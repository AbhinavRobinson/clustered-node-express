import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

export const worker = (port: number, debug: boolean) => {
  const app = express()
  const pid = process.pid
  let wid = -1
  let calls = 0

  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/', (req, res) => {
    // simulate work with for
    for (let i = 0; i < 10000000; i++);
    res.send('Hello World!')
    calls++
  })

  app.listen(port)

  debug &&
    process.on('message', (msg) => {
      wid = parseInt(msg as string)
      console.log(`[worker:${wid}]: listening to ${port}`)
    })

  debug &&
    setInterval(() => {
      Logger(wid, pid, calls)
      calls = 0
    }, 5000)
}

const Logger = (wid: number, pid: number, calls: number) => {
  console.log(`[worker:${wid}]: Responding to ${calls} calls last 5 seconds`)
}
