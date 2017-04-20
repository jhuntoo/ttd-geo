import {PipelineResult} from './pipeline';
import * as _ from 'lodash';
const tsv = require('tsv').TSV;
var Table = require('cli-table');

interface ErrorCount {
    error: string;
    count: number;
}

export function generateErrorCounts(results: PipelineResult[]): ErrorCount[] {
    const errorCounts = _(results).chain()
        .groupBy(r => r.error)
        .map((values, key) => {
            return {
                error: key,
                count: values.length,
            };
        })
        .sortBy(ec => ec.error)
        .value();
    return errorCounts;
}


export function displayErrors(results: PipelineResult[]) {
    const errorCounts = generateErrorCounts(results);
    var table = new Table({
        head: ['Error', 'Count'],
        colWidths: [30, 30]
    });
    errorCounts.forEach(ec => table.push([ec.error, ec.count]));
    console.log(table.toString());
}