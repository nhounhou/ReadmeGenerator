const dotenv = require('dotenv').config({path: __dirname+'/config.env'}),
    inquirer = require('inquirer'),
    fs = require('fs');
    questions = require('./questions'),
    axios = require('axios');

var dataArray=[],
    myData='',
    myScreenShot=[],
    myResults={
        githubName: '',
        userName: '',
        repo: '',
        description: '',
        JavaScript: 0,
        CSS: 0,
        HTML: 0,
        answer: {},
    };

    // console.log(dotenv.parsed.API_KEY);

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your Github UserName',
            name: 'userName',
            default: `nhounhou`
        }
    ]).then(repUser => {
        myResults.userName=repUser.userName;
        // console.log(repUser.userName);

    axios({
        method: "get",
        url: `https://api.github.com/users/${repUser.userName}/repos`,
        headers: {
            Authorization: `Bearer ${dotenv.parsed.API_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
        }
    }).then(response => {
        // console.log(response.data);
        let folderArray=[];
        for (i=0;i<response.data.length;i++){
            folderArray.push(response.data[i].name);
            dataArray.push(response.data[i]);
        };
        // console.log(folderArray);
        inquirer.prompt([
            {
                type: 'list',
                message: 'Please select your project',
                name: 'repoProject',
                choices: folderArray,
                loop: 'true',
            },
        ]).then( reponse => {
            // console.log(reponse);
            const searchRepo=reponse.repoProject;
            if (folderArray.indexOf(searchRepo)>-1) {
                myData=dataArray[folderArray.indexOf(searchRepo)];
                // console.log(myData);
            };
            // console.log(searchRepo);
            // console.log(`https://api.github.com/repos/${config.githubUsername}/${link}/${name}`);
            // response.data.forEach(element => {
            //     console.log(element.html_url);
            // });

            axios({
                method: "get",
            //     // url: `https://api.github.com/repos/${config.githubUsername}/${link}/${name}`,
                url: `${myData.languages_url}`,
                headers: {
                    Authorization: `Bearer ${dotenv.parsed.API_KEY}`,
                    "Content-Type": "application/json",
                    "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
                }
            }).then(answer => {
                // console.log(response.data.length);
                // console.log(answer.data);
                // response.data.forEach(element => {
                //     console.log(element.html_url);
                // });
                
                myResults.JavaScript=answer.data.JavaScript; // get the size for each languages
                // console.log(myResults.JavaScript);
                myResults.CSS=answer.data.CSS; // get the size for each languages
                // console.log(myResults.CSS);
                myResults.HTML=answer.data.HTML; // get the size for each languages
                // console.log(myResults.HTML);
                myResults.githubName=myData.name; // name of the repo
                // console.log(myResults.githubName);
                myResults.description=myData.description; // descrition of the repo
                // console.log(myResults.description);
                myResults.repo=myData.html_url; // repo folder
                // console.log(myResults.repo);
                inquirer.prompt(questions).then(rep => {
                    myResults.answer=rep;
                    // console.log(myResults);
                    // ask(myScreenShot);

                    // all data are in the object myResults
                    // time to build the readme file
                    buildReadme(myResults);
                });

            });
        });
    });
});

function buildReadme(obj){
    let readmeLine=`
# ${obj.githubName}
by ${obj.answer.fullName}

## Table of Contents
- [Description](#description)
- [Install Command](#install-command)
- [How to Use](#how-to-use)
- [Licences](#licences)
- [links](#links)
- [Languages](#languages)
- [Screen Shots](#screen-shots)

## Description
${obj.answer.projectDesc}

## Install Command
\`\`\`
${obj.answer.install}
\`\`\`

## How to Use
\`\`\`
${obj.answer.command}
\`\`\`

## Links
[Repository Folder](${obj.repo})  
[Web Application](https://${obj.userName}.github.io/${obj.githubName})  
For questions click the following link:  
[Email](mailto:${obj.answer.email}?subject=[GitHub]%20Readme%20Generator%20Questions)  

## Licences
`
    // get the licence icons
    if (obj.answer.licence.length>0) {
        for (const item of obj.answer.licence){
            readmeLine += `![${item}](https://img.shields.io/badge/${item}-blue)`;            
        };
    };

    // build the languages icones based on the bytes quantities provide by Axios Github API call
    const totalBytes = obj.JavaScript + obj.CSS + obj.HTML || 0;
    const JVS = (obj.JavaScript / totalBytes) * 100 || 0;
    const CSS = (obj.CSS / totalBytes) * 100 || 0;
    const HTML = (obj.HTML / totalBytes) * 100 || 0;
    readmeLine += `

## Languages
![JS](https://img.shields.io/badge/JavaScript-${JVS.toFixed(1)}%25-orange)
![HTML](https://img.shields.io/badge/JSon-${CSS.toFixed(1)}%25-brightgreen?style=plastic&logo=HTML5)
![CSS](https://img.shields.io/badge/JSon-${HTML.toFixed(1)}%25-blue?style=plastic&logo=CSS3)
`

    if (myScreenShot.length>0){
        readmeLine +=`
## Screen Shots
`
        for (const image of myScreenShot){
            readmeLine +=`
![image](${image})  `
        };
    };
    fs.writeFileSync('./example/README.md',readmeLine);
    // console.log(readmeLine);
};

function ask(arr){
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
                    message: 'Complete Path to the image please?',
                    name: 'path',
                    default: '/assets'
                }
            ]).then(screen => {
                arr.push(screen.path);
                ask();
            });
        } else {
            // console.log(arr);
            // all data are in the object myResults
            // time to build the readme file
            buildReadme(myResults);
            return;
        };
    });
};