import {expect} from 'chai';
import { weatherService} from './weather';

describe('WeatherService', () => {
    describe('getTomorrowsMaxTemperature', () => {
        it('should return a temperature', async () => {
            const temperature = await weatherService.getTomorrowsMaxTemperature({ lat: 51.5, long: -0.1});
            expect(temperature).to.be.a('number');
        });
    });
})