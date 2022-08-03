const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export function fetchCoinHistory(coinId?: string) {
    //const endDate = Math.floor(Date.now() / 1000); // 현재 시간(s)
    //const startDate = endDate - (60 * 60 * 24 * 7) // 현재 - 일주일
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((res) => res.json());
}
