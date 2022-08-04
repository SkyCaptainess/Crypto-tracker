import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"; // Chart라는 컴포넌트가 이미 존재 => 다른 이름으로 import

/*
1. 보여줄 암호화폐 종류가 무엇인지를 받아옴
    (1) react-router-dom에서 coinId 파라미터를 가져옴
    (2) Coin.tsx에서 props를 전달 (이미 상위 컴포넌트에서 params를 불러왔기 때문에 재사용)
2. 암호화폐의 특정 시점 ohlcv(open, high, low, close, volume) 정보를 알려주는 api 연결
3. 21일 간 종가(close value) 비교 => 차트 만들기
*/

interface IChart {
  coinId?: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = ({ coinId }: IChart) => {
  const { isLoading: chartLoading, data: chartData } = useQuery<IHistorical[]>(['chart', "ohlcv"], () =>
    fetchCoinHistory(coinId),
    {
        refetchInterval: 5000, // 5초마다 refetch => 차트 업데이트
    }
  );

  return (
    <div>
      {chartLoading || !chartData ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          height={350}
          series={[
            {
              name: "Price",
              data: chartData?.map((price) => {
                return {
                  x: new Date(price.time_close * 1000),
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                };
              }),
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: "datetime",
              axisTicks: { show: false }, // x축 scale 삭제
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                show: false,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
            tooltip: {
              // 마우스 올리면 보이는 정보
              enabled: true,
              y: [
                {
                  formatter: function (y) {
                    if (typeof y !== "undefined") {
                      return  "open: " + y.toFixed(2);
                    }
                    return y;
                  },
                },
                {
                  formatter: function (y) {
                    if (typeof y !== "undefined") {
                      return  "high: " + y.toFixed(2);
                    }
                    return y;
                  },
                },
                {
                  formatter: function (y) {
                    if (typeof y !== "undefined") {
                      return  "low: " + y.toFixed(2);
                    }
                    return y;
                  },
                },
                {
                  formatter: function (y) {
                    if (typeof y !== "undefined") {
                      return  "close: " + y.toFixed(2);
                    }
                    return y;
                  },
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;