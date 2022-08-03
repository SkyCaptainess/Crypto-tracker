import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from './../api';

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 38px;
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
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

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 20px;
  font-size: 24px;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coins = () => {
  // useQuery(queryKey, fetch fn)
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  console.log(data)
  interface ICoin { // Interface Coin
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }

  return (
    <Container>
      <Header>
        <Title>Crypto Tracker!</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
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
                {coin.name} &rarr;{" "}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
