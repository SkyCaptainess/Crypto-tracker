import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./../api";
import { Helmet } from "react-helmet";
import Loader from "../Loader";
import { ICoin, query, coins, coinList } from "../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 42px;
  margin-bottom: 5px;
  text-shadow: 3px 4px 7px #772c014b;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 25px;
  input {
    width: 300px;
    border: none;
    border-radius: 15px;
    padding: 10px 15px;
    outline: none;
    box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.05);
  }
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    display: flex; // 글씨 바깥쪽 box 전체에 링크 걸어줌
    transition: color 0.2s ease-in-out;
    align-items: center;
  }
  &:hover {
    a {
      // = 라우터 링크
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coins = () => {
  // useQuery(queryKey, fetch fn, options obj)
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  const setCoins = useSetRecoilState(coins);
  useEffect(() => {
    setCoins(data?.slice(0, 100));
  }, [data]);
  const setQuery = useSetRecoilState(query);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  const list = useRecoilValue(coinList);

  return (
    <Container>
      <Helmet>
        <title>Crypto Tracker!</title>
      </Helmet>
      <Header>
        <Title>Crypto Tracker</Title>
      </Header>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBlock>
            <input
              onChange={onChange}
              type="text"
              placeholder="search for ..."
            />
          </SearchBlock>
          <CoinsList>
            {list?.map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={`/${coin.id}`}
                  state={{ name: coin.name, rank: coin.rank }}
                >
                  {/* state로 보이지 않는 정보 보내기 */}
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.symbol}
                  />
                  {coin.name}
                </Link>
              </Coin>
            ))}
          </CoinsList>
        </>
      )}
    </Container>
  );
};

export default Coins;
