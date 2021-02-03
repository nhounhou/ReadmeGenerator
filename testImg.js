const inquirer=require('inquirer');
let myarray=[];

function ask(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Do you want to Add a screen shot?',
            choices: ['Yes','No'],
            name: 'add',
            default: 'No'
        }
    ]).then(images => {
        if (images.add==='Yes'){
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Path to the image?',
                    name: 'path',
                    default: '/assets'
                }
            ]).then(screen => {
                myarray.push(screen.path);
                ask();
            });
        } else {
            console.log(myarray);
            return;
        }
    });
};

ask();