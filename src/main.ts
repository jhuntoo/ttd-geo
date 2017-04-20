import {parse} from './parse';
import {File, writeTsv} from './file';
import {Pipeline, PipelineResult, passed, failed} from './pipeline';
import {getCoordinates} from './coordinates';
import {weatherService} from './weather';
import {Histogram} from './histogram';
import {displayErrors} from './error';
import {commandLineArguments} from './arguments';

const args = commandLineArguments();
const histogram = Histogram.definedBy(args.buckets);
const pipeline = new Pipeline(parse, getCoordinates, weatherService);

File.split(args.inputFilename)
    .forEachLine(line => pipeline.process(line))
    .aggregate()
    .then((results: PipelineResult[]) => {
        console.log(`Processed ${results.length} records`);
        const bucketCounts = histogram.generateCounts(passed(results));
        writeTsv(bucketCounts, args.outputFilename);
        displayErrors(failed(results));
        console.log()
    });

