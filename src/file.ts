import * as fs from 'fs';
import * as es from 'event-stream';
import {PipelineResult} from './pipeline';
const tsv = require('tsv').TSV;
const Spinner = require('cli-spinner').Spinner;

export const spinner = new Spinner('processing record %s <--');
spinner.setSpinnerString('|/-\\');
spinner.start();

async function wrap<TResultType>(line: string, fun: (line: string) => Promise<TResultType>): Promise<TResultType> {
    return fun(line);
}

export class File {
    static split<TResultType>(fileName: string): Streamer<TResultType> {
        return new Streamer(fileName);
    }
}

export function writeTsv(values: any[], fileName: string) {
    fs.writeFileSync(fileName, tsv.stringify(values));
}

export class Streamer<TResultType> {

    private fun: (line: string) => Promise<TResultType>

    constructor(private fileName: string) {
    }

    forEachLine(fun: (line: string) => Promise<TResultType>): Streamer<TResultType> {
        this.fun = fun;
        return this;
    }

    aggregate(): Promise<PipelineResult[]> {
        const items: Promise<TResultType>[] = [];
        return new Promise<TResultType[]>((resolve, reject) => {
            const stream =
                fs.createReadStream(this.fileName)
                    .pipe(es.split('\n'))
                    .pipe(es.mapSync((line: string) => {
                            items.push(wrap(line, this.fun))
                        })
                            .on('error', (err) => {
                                console.error('Error while reading file.');
                                spinner.stop();
                                reject(err);
                            })
                            .on('end', async() => {
                                const results = await Promise.all(items)
                                spinner.stop(true);
                                resolve(results);
                            })
                    );
        });
    }

}