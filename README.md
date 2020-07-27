## Setup

1. Add `.env` file with the following variables:
   1. NODE_ENV=development
   2. DB_HOST=localhost
   3. DB_PORT=your_db_port
   4. DB_PASS=your_db_pass
   5. DB_USER=your_db_user
   6. DB_NAME=your_db_name
   7. DB_NAME_TEST=your_db_name_for_testing
2. Create two MySQL databases for development and for testing. Make sure to follow the DB_NAME and DB_NAME_TEST in your .env file.
3. Run `npm install` to install the dependencies.
4. Run `npx sequelize-cli db:migrate` to create tables to the database.
5. Run `npx sequelize-cli db:seed:all` to insert test user for administrator.
6. To run the application, run `npm run watch` and open the `localhost:{port}` on your browser.
7. To run the unit tests, change the `NODE_ENV` in `.env` file to `test` and then run `npm test`.