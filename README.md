Odyssey
=======

Odysey should be installed globally to get the main generator.


## Commands

### init

  `odyssey init [-n db_name || core] [-e engine || mongo]

  Creates the folder structure that Oddysey needs inside the project.
  You should run this "command" inside the root of your project.
  It will create a db folder (if it's the first time run) and a folder inside it with the name of the db, defaults to "core" of no name is given.
  It will create two more folders inside the folder with the db name, an empty migrations folder and a tools folder with a collection of scripts that can be used for deployments with a CI server.

  - ProjectRoot
    - db
      - [db_name]
        - tools
          up.js
          down.js
        - migrations


### migration

  `oddysey migration [-db core] -n "name of migration"`

  Creates a new migration file with some template code that will serve as the basis to write your migrations.
  Takes care of naming and numbering your migrations.
  It takes only a string and should be run from inside the root of the project, if it doesn't find the folder structure for Odysey will throw an error.

##Scripts

### up

  Runs the up migrations that have not been run yet.

### down

  Runs the down migrations. If no params are passed it will only run the latest migration applied into the db. If a migration number is passed, it will run all migrations with a higher number including the migration number given.