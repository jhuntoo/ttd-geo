import * as geoip from 'geoip-lite';

export interface Coordinates {
    lat: number;
    long: number;
}

export function getCoordinates(ip: string): Coordinates {
    const location = geoip.lookup(ip);
    if (!location) {
        return;
    }
    const lat = location.ll[0];
    const long = location.ll[1];
    return {lat, long};
}