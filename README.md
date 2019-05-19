# LambdaFit Backend
Our Backend code for our weight lifting journal.

# Patrick Steveson and Austin James

## Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/api/auth/register/`  | `username`, `password`, `email` | Registers a New User to our database. Creates a token.                  |
| POST   | `/api/auth/login/`     | `username`, `password`          | Logs a returning user in. Creates a token.                              |


# Sample User.
user: {
    username: 'patrick',
    password: 'pass',
    age: 27,
    height: '6foot',
    weight: 185,
    email: 'patrick@gmail.com'
}

#Sample Exercises
exercises: {
    name: 'Bench-Press',
    user_id: 1,
    body_region: 'Chest'
    amount_lifted: '185',
    reps: '8',
    date: '2/7/2019'
}