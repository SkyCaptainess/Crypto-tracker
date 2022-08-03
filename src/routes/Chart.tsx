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
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv"], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading || !data ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => parseFloat(price.close)),
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
              toolbar: {
                show: false, // 맨 위 툴바(줌인/아웃/다운로드...) 생략
              },
            },
            grid: {
              show: false, // 가로 선 안보이게 설정
            },
            stroke: {
              curve: "smooth", // 선 약간 둥글게
              width: 4, // 선 굵기
            },
            xaxis: {
              type: "datetime",
              labels: { show: false }, // x축 지표 안보이게
              axisTicks: { show: false }, // x축 scale 삭제
              //axisBorder: {show: false} // x축 선 안보이게
              categories: data?.map((price) => {
                const date = new Date(price.time_close * 1000);
                var year = date.getFullYear().toString(); //년도 뒤에 두자리
                var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
                var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
                var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
                var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
                var second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

                var returnDate =
                  year +
                  "-" +
                  month +
                  "-" +
                  day +
                  "- " +
                  hour +
                  ":" +
                  minute +
                  ":" +
                  second;
                return returnDate;
              }), //  x축 값 라벨
            },
            // yaxis: {
            //     show: false // y축 지표 안보이게
            // }
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"], // 선 색깔 그라디언트 파란색
                stops: [0, 100],
              }, // 그라디언트 처음 0%부터 끝 100%까지 전역에 설정
            },
            colors: ["#0fbcf9"], // 선 색깔 = 기본 빨간색
            tooltip: {
              // 마우스 올리면 보이는 정보
              y: {
                // y축 정보
                formatter: (value) => `$ ${value.toFixed(2)}`, // 넘어오는 값에 형식을 지정 => 소숫점 2자리까지
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
