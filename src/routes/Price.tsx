import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Loader from "../Loader";

interface IPrice {
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

const Price = ({ coinId }: IPrice) => {
  const { isLoading: priceLoading, data: priceData } = useQuery<IHistorical[]>(
    ["price", "ohlcv"],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000, // 5초마다 refetch => 차트 업데이트
    }
  );
  return (
    <div>
      {priceLoading || !priceData ? (
        <Loader/>
      ) : 
      (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: priceData?.map((price) => parseFloat(price.close)),
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
              axisBorder: {show: false}, // x축 선 안보이게
              categories: priceData?.map((price) => {
                const date = new Date(price.time_close * 1000);
                const year = date.getFullYear().toString(); //년도 뒤에 두자리
                const month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
                const day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
                const hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
                const minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
                const second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

                const returnDate =
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
            yaxis: {
                show: false // y축 지표 안보이게
            },
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

export default Price;
