import cluster from 'cluster'
import os from 'os'
import { worker } from './server'

if (cluster.isPrimary) {
  const cpus = os.cpus().length
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
} else {
  worker(3000)
}
