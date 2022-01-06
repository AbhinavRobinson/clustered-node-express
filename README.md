# Clustered Express Node App

Using the cluster module for nodejs, this project takes a look at the performance benifits of multithreaded utilization of nodejs by spawning workers on each cpu thread. For initial testing on my machine (M1 Air):

- 1 Worker -> 90-115 requests/sec
- 8 Workers -> 800-950 requests/sec

This was done using the apache benchmarking tool (ab).

## About Running the App and Testing

### Run the program

- `yarn dev` to run using ts-node-dev
- `yarn build && yarn start` to build to js and run using nodemon. (testing done on this)

### Testing the program

- `ab -c100 -t20 http://localhost:3000/` used to spawn 100 concurrent requests, 20 times each.

### Flags

- `--port <port>` can be used to listen to some other port.
- `--debug` can be used for additional logging.
- `--workers <num-workers>` can be used to force use of specified number of workers.
- Use the flags in the specified order only, `--port <port> --debug --workers <num-workers>`.

## About the Results

We can observe a linear scaling of performance in this application while multithreading, but please note that this is a mock app and real world results will be less than this.

### Alternative?

For most production uses, refer to `pm2` package as it allows for clusting for any node app, and much more. `pm2 start <app-start-commands> -i max|<num-workers>` "automagically" scales your app to specified threads.
