import {
  useLocation,
  useParams,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Spinner from '../img/spinner.gif';

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
  position: relative;
  span {
    position: absolute;
    font-size: 16px;
    left: 3px;
    bottom: 30px;
    background-color: #9b59b6;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 50px;
  img{
    width: 120px;
    height: 120px;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface LocationState {
  // state로 받아오는 데이터는 아래 정보를 포함하는 객체임
  state: {
    name: string;
    rank: number;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // params가 모두 string임을 이미 알고있음 => 따로 인터페이스 설정 X
  const { coinId } = useParams();
  //const location = useLocation(); // -> 객체 정보 (pathname, search, state, ...)
  const { state } = useLocation() as LocationState;

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000, // 해당 쿼리를 5초마다 업데이트(다시 받아옴 refetch)
    }
  );

  const loading = infoLoading || tickersLoading; // 두 로딩이 모두 끝나면 렌더링
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        {/* 홈페이지에서 이동한 경우 / 아닌 경우 모두 name 렌더링 */}
        <span onClick={goBack}>Back</span>
        <Title>
          {state?.name ? state.name : loading ? "..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader><img src={Spinner} alt='Loading..' width='5%' /></Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE:</span>
              <span>{`$ ${tickersData?.quotes.USD.price.toFixed(3)}`}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="price" element={<Price coinId={coinId} />} />
            <Route path="chart" element={<Chart coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;
