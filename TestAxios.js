const inquirer=require('inquirer');
const axios=require('axios');
const config = require('./config');

inquirer.prompt([
    {
        type: 'input',
        message: 'What is your Github UserName',
        name: 'userName',
        default: `${config.githubUsername}`
    }
]).then(repUser => {
    // myResults.userName=repUser.userName;
    axios({
        method: "get",
        url: `https://api.github.com/users/${repUser.userName}/repos`,
        headers: {
            Authorization: `Bearer ${config.githubToken}`,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
        }
    }).then(response => {
        console.log(response);
    });
});