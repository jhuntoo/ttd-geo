import {expect} from 'chai'
import {parseHistogramArguments} from './arguments';
import {HistogramBucket} from './histogram';
describe('Arguments', () => {

    describe('parseHistogramArguments', () => {
        describe('1 bucket', () => {
            let buckets: HistogramBucket[];
            before(() => {
                buckets = parseHistogramArguments('0,10');
            });
            it('should set { min: 0 max: 10 }', () => {
                expect(buckets).to.have.lengthOf(1);
                expect(buckets[0].min).to.equal(0);
                expect(buckets[0].max).to.equal(10);
            });
        });
        describe('multiple buckets', () => {
            let buckets: HistogramBucket[];
            before(() => {
                buckets = parseHistogramArguments('0,10,20');
            });
            it('should set [ { min: 0 max: 10 }, { min: 10 max: 20 } ]', () => {
                expect(buckets).to.have.lengthOf(2);
                expect(buckets[0].min).to.equal(0);
                expect(buckets[0].max).to.equal(10);
                expect(buckets[1].min).to.equal(10);
                expect(buckets[1].max).to.equal(20);
            });
        });
        describe('invalid config', () => {
            it('should throw for non sequential numbers', () => {
                expect(() => parseHistogramArguments('0,20,10')).to.throw();
            });
            it('should throw for non numeric values', () => {
                expect(() => parseHistogramArguments('cat,dog')).to.throw();
            });
        });
    });
})