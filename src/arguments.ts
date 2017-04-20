import {HistogramBucket} from './histogram';
export class Arguments {
    inputFilename: string;
    outputFilename: string;
    buckets: HistogramBucket[] = [];
}

export function commandLineArguments(): Arguments {
    const buckets = parseHistogramArguments(process.argv[4]);
    return {
        inputFilename: process.argv[2],
        outputFilename: process.argv[3],
        buckets: buckets
    }

}

export function parseHistogramArguments(input: string): HistogramBucket[] {
    const values = input.split(',').map(str => parseFloat(str));
    if (!areSequential(values)) {
        throw new Error('Bucket definition must be a sequential array');
    }
    return values.map((val, index) => {
        if (index > 0) {
            return new HistogramBucket(values[index - 1], val);
        }
    }).filter(x => x);
}

function areSequential(values: number[]): boolean {
    return values.every((num, i) => i === values.length - 1 || num < values[i + 1]);
}