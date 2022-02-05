# Comics React Server

A nextjs app which serves the last and current weeks comic releases from a API and can obtain ther cover image for a comic from another API.

Comic releases obtained from : [ShortBoxed API](https://api.shortboxed.com/)

Comic Images obtained from : [Comic Vine API](https://comicvine.gamespot.com/api/) and [Metron API](https://metron.cloud)

## Built With

-   Nextjs
-   Next-Express
-   Axios
-   Passport
-   SWR

## Installation

Create a .env file with the following variables :

-   COMIC_VINE_KEY - place your ComicVine api key here
-   METRON_BASIC_KEY - place "Basic " + your Metron API key here
-   MONGOLINK - place your link to your mongo database here

```bash
yarn install
yarn dev
or
yarn build
yarn start
```
