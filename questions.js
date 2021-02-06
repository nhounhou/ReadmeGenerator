// ask for:
//      Full Name
//      Full description of project
//      licences
//      screen shot
//      install command
//      launch command

const questionList=[
    {
        type: 'input',
        message: 'What is your full name?',
        name: 'fullName'
    },
    {
        type: 'editor',
        message: 'full description of the project',
        name: 'projectDesc'
    },
    {
        type: 'input',
        message: 'Installation command',
        name: 'install'
    },
    {
        type: 'input',
        message: 'How to use or command',
        name: 'command'
    },
    {
        type: 'checkbox',
        message: 'Add any Licence',
        name: 'licence',
        choices: ['MIT', 'Apache-2.0', 'ODBL-1.0', 'None']
    },
    {
        type: 'input',
        message: 'What is your email adress?',
        name: 'email'
    },
];

module.exports = questionList;