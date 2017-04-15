export class Record {
   constructor(public ip: string) {

   }
}

export function parse(line: string): Record {
    const fields = line.split('\t');
    const ip = fields[23];
    return new Record(ip);
}