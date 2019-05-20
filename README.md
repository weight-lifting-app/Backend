# LambdaFit Backend
Our Backend code for our weight lifting journal.

# Patrick Steveson and Austin James

## Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/auth/register/`      | `username`, `password`,         | Registers a New User to our database. Creates a token.                  |
| POST   | `/auth/login/`         | `username`, `password`          | Logs a returning user in. Creates a token.                              |
| GET    | `/exercises`           | Successful Login: uses JWT      | Used to show exercises in the database.                                 |
| GET    | `/exercises/:id/`      | Successful Login                | Used to show a specific piece of exercises in the database.             |
| POST   | `/exercises/`          | Successful Login, Data          | Used to post a new piece of exercises to the database.                  |
| PUT    | `/exercises/:id`       | Successful Login, Data          | Used to edit the logged in user's exercises.                            |
| DELETE | `/exercises/:id/`      | Successful Login                | Used to delete the logged in user's exercises.                          |


# Sample User.
user: {
    username: 'patrick',
    password: 'pass',
    age: 27,
    height: '6foot',
    weight: 185,
    email: 'patrick@gmail.com'
}

# Sample Exercises
exercises: {
    name: 'Bench-Press',
    user_id: 1,
    body_region: 'Chest'
    amount_lifted: '185',
    reps: '8',
    date: '2/7/2019'
}