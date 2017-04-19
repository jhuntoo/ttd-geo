import {expect} from 'chai';
import {getCoordinates} from './coordinates';

describe('getCoordinates', () => {
    describe('valid IP', () => {
        it('should return lat/long', () => {
            const coordinates = getCoordinates('80.231.223.90')
            expect(coordinates.lat).to.not.be.undefined;
            expect(coordinates.long).to.not.be.undefined;
        });
    });
    describe('invalid IP', () => {
        it('should return undefined', () => {
            expect(getCoordinates('xx.231.223.90')).to.be.undefined;
        });
    });
})