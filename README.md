# Project2 Lord of Stars
## Link To Live Site
<https://lord-of-stars.herokuapp.com/>
## Express Authentication

Express authentication template using Passport + flash messages + custom middleware

## Getting Started

#### Scaffold w/tests (see `master` branch)

* Run `npm install` to install dependencies
* Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database

#### Finished version (see `brian-finished` branch)

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Run `createdb express_auth_development` to create the development database
  * Run `createdb express_auth_test` to create the test database
  * Run `sequelize db:migrate` to run migrations

## Project Specifications

#### Technologies Used
* Node.js
* Express
* Postgres/Sequelize
* EJS


#### Wireframes
<https://wireframe.cc/SQpBk4>
<https://wireframe.cc/uANSx0>
<https://wireframe.cc/gU4jRu>
<https://wireframe.cc/Q07Hu8>
<https://wireframe.cc/2GbKrT>
<https://wireframe.cc/Squuqc>
<https://wireframe.cc/y75XI0>

#### Programmatic Approach
* Set requirements for minimum viable product
* Created wireframes
* Created a database to store all relevent information
* Created initial RESTful routes required for usage
* Wrote the code to access the LOTR api and store relevant information in my database
* Created a page for global chat using the socket.io node module
* Added a dropdown search box to filter through character quotes
* Created additional routes and made necessary changes to my socket code to allow for multiple chat rooms
* Add the ability to upload of picture of your character using cloudinary
* Updated the chat to include the picture of the characters
* Styled the site and added some quality of life changes

#### MVP:
* Utilize the LOTR api to access information about LOTR characters
* Build a database that will link a user to a specific character and give them access to the quotes of that character
* Create specific rooms
* Build a page that utilizes socket.io to create a global chat
* Create a list of buttons for each quote of a given character(and user) that when clicked will put the quote into the global chat
* Create a profile page that will have information about the character the user is role playing as

#### Stretch Goals:
* Allow users to change their character
* Create a database of gifs that feature the quotes of a given character and allow users to share these gif in the global chat
* Allow a user to create a private chat with another user (big stretch)
* Build a database that has the quotes of 10 Star Wars character
* Utilize the Star Wars api to access information about the 10 Star Wars characters





#### Sources
<http://jsfiddle.net/dotnetCarpenter/KpM5j/>
<https://stackoverflow.com/questions/21316313/how-can-i-indent-all-text-in-a-paragraph-except-the-first-line>
<https://github.com/socketio/chat-example>