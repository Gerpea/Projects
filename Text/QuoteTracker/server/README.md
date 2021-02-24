# Proxy server

**[AlphaVantage API](https://www.alphavantage.co)**

Proxy server for hiding API key and cache responses.

## Table of Contents

1. [Run](#run)
2. [Settings](#settings)
3. [Routes](#routes)

## Run

```bash
npm install
node index.js
```

## Settings

For this server to work you need to install the **[redis server](https://redis.io/)** and get API key from **[AlphaVantage](https://www.alphavantage.co)**.

After you finish your preparation, you need to specify your API key.

This can be done by _.env_ file or in command line when you run the server.

For **.env** file

> specify variable with API_KEY name which contains YOUR_API_KEY.

For command line approach

```
API_KEY=YOUR_API_KEY node index.js
```

Also you can specify _REDIS_PORT_ and _REDIS_HOST_ the same ways as API_KEY

And server _PORT_ which define on what port the server will be started.

Example **.env**

```text
API_KEY=YOUR_API_KEY
PORT=5000
REDIS_PORT=6379
REDIS_HOST=127.0.0.1
```

## Routes

### /api/:endpoint

Replace _:endpoint_ by AlphaVantage API call

For example if you want to call

`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=YOUR_API_KEY&datatype=csv`

You need to call

`http://localhost/api/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&datatype=csv`

It will response with the same data as if you call the api directly.
