# CoinTracker Engineering project

> This project was meant to implement a *basic* prototype for the defined assignment. Implemented is a functional React interface that allows adding a Bitcoin address and viewing some associated transactions if applicable. Due to time constraints, the is no persistence/database component. However, the transactions hashes for an input address are retrieved from the blockchair API to demonstrate how an API could be integrated. Note that only the hashes are retrieved and other data is initialized to random values.

[View Demo](https://dlaible.github.io/cointracker-btc/)

## Instructions

```
npm install  # install dependencies
npm run dev  # start dev server (with HMR support, localhost:3000 in browser)

npm run build:prod  # build static app assets (production)
```

## Technologies Used

- React
- TypeScript
- vite
