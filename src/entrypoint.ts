import cluster from 'cluster'
import os from 'os'
import { worker } from './server'

let port = 3000
let loggerLevel = false
let cpus = os.cpus().length

try {
  // get port from argv port or default to 3000
  if (process.argv[2] === '--port') {
    port = parseInt(process.argv[3]) || 3000
    process.argv.splice(2, 2)
  }
  // get debug from argv debug
  if (process.argv[2] === '--debug') {
    loggerLevel = true
    console.log('[master]: Debug mode enabled')
    process.argv.splice(2, 1)
  }
  // get number of workers from argv workers or default to all
  if (process.argv[2] === '--workers') {
    cpus = parseInt(process.argv[3]) || os.cpus().length
  }
} catch (err) {
  console.log('[master]: Invalid params')
  process.exit(1)
}

if (cluster.isMaster) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork({ loggerLevel, port })
  }
  Object.values(cluster.workers).forEach((worker) => {
    worker.send(`${worker.id}`)
  })
  console.log(`[master]: ${cpus} listening to ${port}`)
} else {
  worker(parseInt(process.env.port), process.env.loggerLevel === 'true')
}
