import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export default function FirstFunc() {
    // This logic allows for navigation into other directories within the project
    const currentFileUrl = import.meta.url;
    const currentDirPath = dirname(fileURLToPath(currentFileUrl));
    const relativeTargetDirPath = '../assets';
    const filename = 'parse.csv';
    const absoluteTargetDirPath = join(currentDirPath, relativeTargetDirPath, filename);

    const outputFilePath = join("../csvoutput", `${filename}-output.csv`);
    const parser = fastcsv.parse({ headers: true });
    const formatter = fastcsv.format({ headers: true });
    const inputStream = fs.createReadStream(absoluteTargetDirPath);
    const outputStream = fs.createWriteStream(outputFilePath, { encoding: 'utf8' });

    // Define a transformation function to manipulate the data
    const transformFunction = (row: { Name: string, Color: string }) => {
        if (row.Name && row.Name.length > 1) {
            row.Name = row.Name.slice(0, -1);
        }
        return row;
    };

    inputStream
        .pipe(parser)
        .on('data', (row) => {
            const transformedRow = transformFunction(row);
            formatter.write(transformedRow);
        })
        .on('end', () => {
            formatter.end();
        });

    formatter
        .pipe(outputStream)
        .on('finish', () => {
            console.log('CSV parsing, transformation, and writing finished.');
        })
        .on('error', (error) => {
            console.error('Error:', error);
        });
}