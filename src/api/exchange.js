 // /src/api/exchange.js

import { transactions } from "../data/mockData.js";

// 환율 API. 
const API_URL = "https://open.er-api.com/v6/latest/USD";

export function fetchTransactions() {
  return transactions;
}

// async에서 작성한 함수 안에
export async function fetchUsdKrw() {
                    // await로 걸어놓은 동작들은
                    // 인터프리터가 지켜보지 않습니다.
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("응답 오류 " + res.status);
  const data = await res.json();
  return data.rates.KRW;
}
