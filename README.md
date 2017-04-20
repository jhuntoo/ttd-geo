### Note
The weather api used with this submission has a limit of 60 requests per minute. So a small subset of the input data is probably better if you don't want to be waiting around forever.

### Installation
```bash
nvm install v7.9.0
nvm use
npm install
```

### Run the application
```bash
npm start <inputfile> <outputfile> 0,16.2,32.4,48.6,64.8,81
```

### Testing
```bash
npm run test:unit
npm run test:integration
```


### Assumptions
1. Histogram buckets will be represented with the syntax 0,10,20, where the bucket minimum is defined by the previous bucket's max
2. Values are placed in buckets by the following rule  {min} < x  <= {max}
3. 'next calendar day' is relative to the current UTC time