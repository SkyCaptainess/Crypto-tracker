import { atom, selector } from "recoil";

// atom(key, 기본값)
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export interface ICoin {
  // Interface Coin
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const coins = atom<ICoin[]|undefined>({
  key: 'coins',
  default: [],
})

export const query = atom({
  key: 'query',
  default: '',
})

export const coinList = selector({
  key: 'showCoins',
  get: ({get}) => {
    const coinList = get(coins);
    const nowQuery = get(query);
    return nowQuery === '' ? coinList : (coinList?.filter(coin => coin.name.toLowerCase().includes(nowQuery.toLowerCase())));
  }
})