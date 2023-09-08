import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
export default function SecondFunc() {
    // This logic allows for navigation into other directories within the project
    const currentFileUrl = import.meta.url;
    const currentDirPath = dirname(fileURLToPath(currentFileUrl));
    const relativeTargetDirPath = '../assets';
    const filename = 'main.txt';
    const absoluteTargetDirPath = join(currentDirPath, relativeTargetDirPath, filename);

    const outputFilePath = join("../csvoutput", `${filename}-output.txt`);
    const inputStream = fs.createReadStream(absoluteTargetDirPath);
    const outputStream = fs.createWriteStream(outputFilePath, { encoding: 'utf8' });

    // Define a transformation function to manipulate the data
    const extractNumbers = (line: string) => {
        const matches = line.match(/refId:(\d+)/gi);
        if (matches) {
            matches.forEach((match: string) => {
                console.log(match);
                outputStream.write(match)
            });
        } 3
    };

    let buffer: string = ""
    console.log(buffer)
    inputStream
        .on('data', (chunk) => {
            buffer += chunk.toString();
            const lines = buffer.split(/\r?\n/);
            // console.log(lines)
            // buffer = lines.pop();
            lines.forEach((line: string) => {
                extractNumbers(line);
            });
        })
        .on('end', () => {
            console.log('Text file processing finished.');
            outputStream.end();

        });

} 