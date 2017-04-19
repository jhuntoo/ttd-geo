import {Coordinates} from './coordinates';
import * as request from 'request';
const RateLimiter = require('limiter').RateLimiter;
const appid = 'ac4807751121f51348c9861d63ee8ff9';

export class WeatherService {
    static limiter = new RateLimiter(60, 'minute');

    getTomorrowsMaxTemperature(coordinates: Coordinates): Promise<number> {
        return new Promise((resolve, reject) => {
            WeatherService.limiter.removeTokens(1, (err, remainingRequests) => {
                if (err) {
                    reject(err);
                }
                const url = `http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&lat=${coordinates.lat}&lon=${coordinates.long}&cnt=2&appid=${appid}`;
                request({
                    url: url,
                    json: true
                }, (error, response, body) => {
                    if (error || response.statusCode !== 200) {
                        console.log('error api');
                        reject(`WeatherService failure. Error: ${error}, code: ${response ?response.statusCode : 'undefined'}`);
                    } else {
                        try {
                            resolve(this.maxTempFromResponse(body));

                        } catch (err) {
                            reject(err);
                        }

                    }
                });
            });
        });
    }

    private maxTempFromResponse(data: any) {
        return data.list[1].temp.max;
    }
}
export const weatherService: WeatherService = new WeatherService();
