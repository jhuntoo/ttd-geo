import {expect} from 'chai'
import {generateErrorCounts} from './error';
import {PipelineResult} from './pipeline';
describe('Error', () => {
        describe('generateErrorCounts', () => {
            it('should aggregrate errors', () => {
                const results: PipelineResult[] = [ { error: 'invalid_ip' } , { error: 'invalid_ip' },  {error: 'weather_api_error' }];
                const errorCounts = generateErrorCounts(results)
                expect(errorCounts[0].count).to.equal(2);
                expect(errorCounts[1].count).to.equal(1);
            });
        });
})