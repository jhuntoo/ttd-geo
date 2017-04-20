import {WeatherService} from './weather';
import {Coordinates} from './coordinates';
import {ParsedIP} from './parse';


export class Pipeline {
    constructor(private ipParser: (line: string) => ParsedIP,
                private coordinateFetcher: (ip: string) => Coordinates,
                private weatherService: WeatherService) {

    }

    async process(line: string): Promise<PipelineResult> {
        let ip, coordinates;
        try {
            ip = this.ipParser(line);
            if (!ip.isValid) {
                return {error: 'invalid_ip'};
            }
        } catch (err) {
            return {error: 'invalid_ip'};
        }

        try {
            coordinates = this.coordinateFetcher(ip.value);
            if (!coordinates) {
                return {error: 'coordinates_not_found'};
            }
        } catch (err) {
            return {error: 'coordinates_error'};
        }


        try {
            const maxTemp = await this.weatherService.getTomorrowsMaxTemperature(coordinates);
            // console.log('maxtemp', maxTemp);
            return {maxTemp: maxTemp};

        } catch (err) {
            return {error: 'weather_api_error'};
        }
    }
}

export interface PipelineResult {
    error?: PipelineError;
    maxTemp?: number;
}

export function passed(results: PipelineResult[]): PipelineResult[] {
    return results.filter(r => !r.error);
}

export function failed(results: PipelineResult[]): PipelineResult[] {
    return results.filter(r => r.error);
}


export type PipelineError = 'invalid_ip' |
    'coordinates_not_found' |
    'coordinates_error' |
    'weather_api_error';





