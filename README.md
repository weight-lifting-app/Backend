# LambdaFit Backend
Our Backend code for our weight lifting journal.

# Patrick Steveson and Austin James

## Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/api/auth/register/`  | `username`, `password`, `email` | Registers a New User to our database. Creates a token.                  |
| POST   | `/api/auth/login/`     | `username`, `password`          | Logs a returning user in. Creates a token.                              |
