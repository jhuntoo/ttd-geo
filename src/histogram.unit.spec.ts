import {expect} from 'chai'
import {HistogramBucket, Histogram} from './histogram';
import {PipelineResult} from './pipeline';
describe('Histogram', () => {

    describe('HistogramBucket', () => {
        const histogramBucket = new HistogramBucket(10, 20);
        describe('includes function', () => {
            it('should return true for value between min and max', () => {
                expect(histogramBucket.includes(15)).to.be.true;
            });
            it('should return true for value equal to max', () => {
                expect(histogramBucket.includes(20)).to.be.true;
            });
            it('should return false for value equal to min', () => {
                expect(histogramBucket.includes(10)).to.be.false;
            });
            it('should return false for value above max', () => {
                expect(histogramBucket.includes(21)).to.be.false;
            });
        });
    });

    describe('Histogram', () => {
        describe('generateCounts ', () => {
            it('should aggregate maxTemps', () => {
                const histogram = Histogram.definedBy([ new HistogramBucket(0, 10), new HistogramBucket( 10, 20)]);
                const results: PipelineResult[] = [ { maxTemp: 1 } , { maxTemp: 1 },  { maxTemp: 15 }];
                const errorCounts = histogram.generateCounts(results)
                expect(errorCounts[0].count).to.equal(2);
                expect(errorCounts[1].count).to.equal(1);
            });
        });
    });

})