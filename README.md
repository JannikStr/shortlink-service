# shortlink-service

Implementation of a short link service using NextJS and MongoDB

## Usage

Create an `.env` file or export following environment variables
- `NEXTAUTH_URL`: Root URL of the service (e.g., http://localhost:3000 for local development)
- `NEXTAUTH_SECRET`: Randomly generated string (e.g., using `openssl rand -base64 32`)
- `DATABASE_URL`: URL to the MongoDB database (e.g., MongoDB Atlas)

After setting up the environment, use `npm run dev` to run the development version or `npm run build` and `npm run start` for the production version (currently the service is not production ready)

