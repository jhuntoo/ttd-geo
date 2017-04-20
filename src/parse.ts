import * as validator from 'validator';

export class ParsedIP {
    constructor(public value: string,
                public isValid: boolean) {

    }

    static valid(value: string) {
        return new ParsedIP(value, true);
    }

    static invalid(value: string) {
        return new ParsedIP(value, false);
    }
}

export function parse(line: string): ParsedIP {
    const fields = line.split('\t');
    const ip = fields[23];
    return new ParsedIP(ip, validator.isIP(ip))
}