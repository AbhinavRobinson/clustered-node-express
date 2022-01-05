import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

export const worker = (port: number) => {
  const app = express()
  const pid = process.pid
  let wid = -1
  let calls = 0
  let locked = false

  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/', (req, res) => {
    setTimeout(() => {
      res.send('Hello World!')
      calls++
      if (!locked) {
        locked = true
        Logger(wid, pid, calls)
        setTimeout(() => {
          locked = false
        }, 5000)
      }
    }, 200)
  })

  app.listen(port)

  process.on('message', (msg) => {
    wid = parseInt(msg as string)
    console.log(`[worker:${wid}:${pid}]: ${wid} listening to ${port}`)
  })
}

const Logger = (wid: number, pid: number, calls: number) => {
  console.log(`[worker:${wid}:${pid}]: Responding to ${calls} calls`)
}
