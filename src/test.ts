import * as TypeMoq from 'typemoq';
import {ParsedIP} from './parse';
import {Coordinates} from './coordinates';
import {Pipeline} from './pipeline';
import {WeatherService} from './weather';

export class A {
    static pipeline(): PipelineBuilder {
        return new PipelineBuilder();
    }
}


export class PipelineBuilder {
    private ipParser: (line: string)  => ParsedIP;
    private coordinatesFetcher: (ip: string) => Coordinates;
    private maxTemp: Promise<number>;
    ipParserReturns(ip: ParsedIP): PipelineBuilder {
        this.ipParser = (line) => ip;
        return this;
    }
    ipParserThrows(): PipelineBuilder {
        this.ipParser = (line) =>  { throw new Error('error') };
        return this;
    }
    coordinateFetcherReturns(coordinates: Coordinates): PipelineBuilder {
        this.coordinatesFetcher = (ip) => coordinates;
        return this;
    }
    coordinateFetcherThrows(): PipelineBuilder {
        this.coordinatesFetcher = (ip) => { throw new Error('error') };
        return this;
    }

    getTomorrowsMaxTemperatureReturns(temp: number) {
        this.maxTemp =  Promise.resolve(temp);
        return this;
    }

    getTomorrowsMaxTemperatureThrows() {
        this.maxTemp =  Promise.reject('error');
        return this;
    }

    build(): Pipeline {
        const mockWeatherService = TypeMoq.Mock.ofType<WeatherService>(WeatherService);
        mockWeatherService.setup(s => s.getTomorrowsMaxTemperature(TypeMoq.It.isAny())).returns(() =>this.maxTemp)
        return new Pipeline(this.ipParser, this.coordinatesFetcher, mockWeatherService.object);

    }
}