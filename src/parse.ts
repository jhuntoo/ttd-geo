import * as validator from 'validator';

export class ParsedIP {
    constructor(public value: string,
                public isValid: boolean) {

    }
}

export function parse(line: string): ParsedIP {
        const fields = line.split('\t');
        const ip = fields[23];
        return new ParsedIP(ip, validator.isIP(ip))
}