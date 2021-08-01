# Uniguesser

Group project for CMPT 470

Group members:
- Shanila Javed
- Jacob Lee
- Jeffrey Wang
- Andi Zhang

## Description

A game where users are shown photos of different universities in Canada and must guess the correct university name.

## Installation

### App setup
1. Install Node.js from the official website:
  
    https://nodejs.org/en/

2. Clone the gitlab repository:

    ```
    git pull https://csil-git1.cs.surrey.sfu.ca/jla293/cmpt470-uniguesser.git
    ```

3. Navigate to the project folder and install dependencies:

    ```
    cd cmpt470-uniguesser
    cd src
    npm i
    ```

4. Create a .env file and enter the following information, replacing `{your_api_key}` with your Google Places API key :
   
   ```
    PGUSER=postgres
    PGHOST=localhost
    PGPASSWORD=postgres
    PGDATABASE=uniguesser
    PGPORT=5432

    API_KEY={your_api_key}
   ```

### Database setup
1. Install posgreSQLCreate from the official website:
    
    https://www.postgresql.org/download/

2. Navigate to the project folder
  ```
  cd path_to_project_folder/uniguesser
  ```

3. Connnect to posgreSQL and create a database called `uniguesser`
  ```
  psql -U userName
  CREATE DATABASE uniguesser
  ```

4. Connect to database:
  ```
  \c uniguesser
  ```


5. Execute database setup `sql` script:
  ```
  \i path_to_setup_folder/database.sql
  ```
   

## Usage

1. Start application with the following command:
  ```
  npm start
  ```

2. Navigate to the application URL
  
    http://localhost:3000

## Final Submission - 2021/08/05

### Features
User authentication:
- Login and logout using sessions
- Registration
- Profile page displaying user's profile information and login information is shown on login
  
Game mechanics:
- Start game and retrieve photos via Google API
- Guess the correct school by selecting a radio button and clicking confirm

Score tracking:
- Save score and game duration in database
- Retrieve score and game duration for each individual users and all users to be displayed on high score page

Gallery:
- Introducing universities in Canada that were included in the game

## Checkpoint - 2021/07/19

Implemented features:
- Login/logout
- Registration
- All game mechanics
  
To-be implemented:
- High score page
  - Shows list of top users based on different queries (e.g., highest score, fastest time, etc.)