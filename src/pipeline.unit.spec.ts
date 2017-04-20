import {expect} from 'chai';
import {A} from './test';
import {ParsedIP} from './parse';
import {PipelineResult} from './pipeline';
const aValidIP = ParsedIP.valid('255.255.255.255');
const anInvalidIP = ParsedIP.invalid('not.an.ip.address');
const validCoordinates = {lat: 55, long: -0.1};


describe('Pipeline', () => {
    describe('All steps return correctly', () => {
        let pipelineResult: PipelineResult;
        before(async() => {
            const pipeline = A.pipeline()
                .ipParserReturns(aValidIP)
                .coordinateFetcherReturns(validCoordinates)
                .getTomorrowsMaxTemperatureReturns(10)
                .build();
            pipelineResult = await pipeline.process('irrelevant string');
        });
        it('should return maxTemp', () => {
            expect(pipelineResult.maxTemp).to.equal(10);
        });
        it('should not return an error', () => {
            expect(pipelineResult.error).to.be.undefined;
        });
    });

    describe('invalid IP', () => {
        let pipelineResult: PipelineResult;
        before(async() => {
            const pipeline = A.pipeline()
                .ipParserReturns(anInvalidIP)
                .build();
            pipelineResult = await pipeline.process('irrelevant string');
        });
        it('should not return maxTemp', () => {
            expect(pipelineResult.maxTemp).to.be.undefined;
        });
        it('should return error `invalid_ip`', () => {
            expect(pipelineResult.error).to.equal('invalid_ip');
        });
    });

    describe('ip parser throws', () => {
        let pipelineResult: PipelineResult;
        before(async() => {
            const pipeline = A.pipeline()
                .ipParserThrows()
                .build();
            pipelineResult = await pipeline.process('irrelevant string');
        });
        it('should not return maxTemp', () => {
            expect(pipelineResult.maxTemp).to.be.undefined;
        });
        it('should return error `invalid_ip`', () => {
            expect(pipelineResult.error).to.equal('invalid_ip');
        });
    });

    describe('no coordinates returned for IP', () => {
        let pipelineResult: PipelineResult;
        before(async() => {
            const pipeline = A.pipeline()
                .ipParserReturns(aValidIP)
                .coordinateFetcherReturns(undefined)
                .build();
            pipelineResult = await pipeline.process('irrelevant string');
        });
        it('should not return maxTemp', () => {
            expect(pipelineResult.maxTemp).to.be.undefined;
        });
        it('should return error `coordinates_not_found`', () => {
            expect(pipelineResult.error).to.equal('coordinates_not_found');
        });
    });

    describe('coordinates fetcher throws', () => {
        let pipelineResult: PipelineResult;
        before(async() => {
            const pipeline = A.pipeline()
                .ipParserReturns(aValidIP)
                .coordinateFetcherThrows()
                .build();
            pipelineResult = await pipeline.process('irrelevant string');
        });
        it('should not return maxTemp', () => {
            expect(pipelineResult.maxTemp).to.be.undefined;
        });
        it('should return error `coordinates_error`', () => {
            expect(pipelineResult.error).to.equal('coordinates_error');
        });
    });

    describe('weather service fails', () => {
        let pipelineResult: PipelineResult;
        before(async() => {
            const pipeline = A.pipeline()
                .ipParserReturns(aValidIP)
                .coordinateFetcherReturns(validCoordinates)
                .getTomorrowsMaxTemperatureThrows()
                .build();
            pipelineResult = await pipeline.process('irrelevant string');
        });
        it('should not return maxTemp', () => {
            expect(pipelineResult.maxTemp).to.be.undefined;
        });
        it('should return error `weather_api_error`', () => {
            expect(pipelineResult.error).to.equal('weather_api_error');
        });
    });


})