# ReadmeGenerator
Professional README Generator

## Tabel of Content
- [The Homework](#the-homework)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation of Depandencies](#installation-of-depandencies)
- [Environment Variables](#environment-variables)
- [Launch the Tool](#launch-the-tool)
- [Tool Functionalities](#tool-functionalities)
- [Still to Come](#still-to-come)
- [Demonstration](#demonstration)

## The Homework  
When creating an open source project on GitHub, it’s important to have a high-quality README for the app. This should include what the app is for, how to use the app, how to install it, how to report issues, and how to make contributions—this last part increases the likelihood that other developers will contribute to the success of the project.  
You can quickly and easily create a README file by using a command-line application to generate one. This allows the project creator to devote more time to working on the project.  
Your task is to create a command-line application that dynamically generates a professional README.md file from a user's input using the Inquirer package. Review the Good README Guide as a reminder of everything that a high-quality, professional README should contain.  
The application will be invoked by using the following command:  
```node index.js```  
Because this application won’t be deployed, you’ll also need to provide a link to a walkthrough video that demonstrates its functionality. Revisit the Screencastify Tutorial in the prework as a refresher on how to record video from your computer. You’ll need to submit a link to the video and add it to the README of your project.

## Acceptance Criteria
GIVEN a command-line application that accepts user input  
WHEN I am prompted for information about my application repository  
THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions  
WHEN I enter my project title  
THEN this is displayed as the title of the README  
WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions  
THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests  
WHEN I choose a license for my application from a list of options  
THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under  
WHEN I enter my GitHub username  
THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile  
WHEN I enter my email address  
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions  
WHEN I click on the links in the Table of Contents  
THEN I am taken to the corresponding section of the README  

## Installation of depandencies

```
npm init -y
npm i inquirer
npm i axios
```

## Environment Variables
Because I'm calling the Github API thru the  Axios module [Axios](https://www.npmjs.com/package/axios), an API KEY is needed.
You can request your API KEY thru the following link [Creating a personnal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).  
But Because Github doesn't allowed the API Key (or token) to be acces to anybody, it not allowed to have it push in the repo folder.  
So I was able to create an environment vatriable with the node.js module `DOTENV`.
On your side, if you wish top use the README GENERATOR tool, after cloning the repo, you will need to change the variable `process.env.API_KEY` (2 lines in the `index.js` file) by the value of the token that you have created.

## Launch the tool
At the command line prompt:
```
node index.js
```

## Tool functionalities
The tool is using `inquirer` node.js module to build the differents lists of question asked to the user.  
Also I'm using `axios` module to have an API call to the Github server to fetch for differents data, like:
- Getting the list of repo folder from the github username provided.
- From the repo folder selected, I'm also getting the languages used in the repo.
- As well as the byte size for each files to be able to generate the badges.  

The result is a README.md file that is generated in the ```EXAMPLE``` folder in the repo.

## Still to Come
Adding a recursive/looping function to add one or several screen shots to the readme file.

## Demonstration
