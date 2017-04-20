import {PipelineResult} from './pipeline';
import * as _ from 'lodash';

export class HistogramBucket {
    constructor(public min: number,
                public max: number) {}

    includes(val: number) {
        return this.min < val && val <= this.max;
    }
}


function bucketCount(bucket: HistogramBucket, results: PipelineResult[]): BucketCount {
    return {
        bucketMin: bucket.min,
        bucketMax: bucket.max,
        count: results.filter(r => bucket.includes(r.maxTemp)).length
    };
}

interface BucketCount {
    bucketMin: number;
    bucketMax: number;
    count: number;
}

export class Histogram {
    constructor(private buckets: HistogramBucket[]) {

    }
    static definedBy(buckets: HistogramBucket[]) {
        return new Histogram(buckets);
    }

    generateCounts(results: PipelineResult[]): BucketCount[] {
        const bucketCounts = _(this.buckets)
            .chain()
            .map(b => bucketCount(b, results))
            .sortBy(bucketCount => bucketCount.bucketMin)
            .value();
        return bucketCounts;
    }
}
