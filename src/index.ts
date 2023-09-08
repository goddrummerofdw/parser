import inquirer from "inquirer";
import FirstFunc from './parsecsv/parseThroughCSV.js'
import SecondFunc from './parsecsv/parseThroughText.js'

async function main() {
    const questions = [
        {
            type: 'list',
            message: 'Which project do you want to run?',
            name: "projects",
            choices: ['func1', 'func2']
        }
    ];

    const answers = await inquirer.prompt(questions);
    switch (answers.projects) {
        case 'func1':
            FirstFunc()
            break;
        case 'func2':
            SecondFunc()
            break;
    }
}


main();