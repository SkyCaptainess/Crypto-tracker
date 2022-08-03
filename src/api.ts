const BASE_URL = 'https://api.coinpaprika.com/v1'

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) =>
    res.json()
  );
}

export function fetchCoinInfo(coinId:string|undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) =>
    res.json()
  );
}


export function fetchCoinTickers(coinId:string|undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) =>
    res.json()
  );
}
