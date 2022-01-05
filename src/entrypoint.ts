import cluster from 'cluster'
import os from 'os'
import { worker } from './server'

const port = 3000
const pid = process.pid

if (cluster.isPrimary) {
  const cpus = os.cpus().length
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
  Object.values(cluster.workers).forEach((worker) => {
    worker.send(`Started Worker ${worker.id}`)
  })
  console.log(`[primary:${pid}]: ${cpus} listening to ${port}`)
} else {
  worker(port)
}
