import { useFetch } from "../hooks/useFetch.js";


// function ExchangeRate() {
//   const [rate, setRate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reloadKey, setReloadKey] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetch("https://open.er-api.com/v6/latest/USD")
//       .then((res) => {
//         if (!res.ok) throw new Error("응답 오류 " + res.status);
//         return res.json();
//       })
//       .then((data) => setRate(data.rates.KRW))
//       .catch((e) => {
//         setError(e.message);
//         console.log("😒 실패 상태", e);
//       })
//       .finally(() => {
//         setLoading(false);
//         console.log("🙌 성공했든 실패했든 언제나 동작");
//       });
//   }, [reloadKey]);

//   return (
//     <div className="card exchange-card">
//       <div className="exchange-info">
//         <span className="currency-label">USD / KRW</span>

//         {/* 로딩 상태 */}
//         {loading && <p className="muted">환율을 불러오는 중...</p>}

//         {/* 에러 발생 상태 */}
//         {!loading && error && (
//           <div className="exchange-error-box">
//             <span className="muted">환율 정보를 불러올 수 없습니다.</span>
//             <button
//               type="button"
//               className="retry-btn"
//               onClick={() => setReloadKey((key) => key + 1)}
//             >
//               다시 시도
//             </button>
//           </div>
//         )}

//         {/* 정상 데이터 출력 상태 */}
//         {!loading && !error && rate && (
//           <div className="rate-value">
//             <span className="base-unit">1달러</span>
//             <span className="equals">=</span>
//             <strong className="target-price">
//               {Math.round(rate).toLocaleString("ko-KR")}원
//             </strong>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

function fetchUsdKrw() {
  return fetch("https://open.er-api.com/v6/latest/USD")
    .then((res) => {
      if (!res.ok) throw new Error("응답 오류 " + res.status);
      return res.json();
    })
    .then((data) => data.rates.KRW);
}

function ExchangeRate() {
  const { data: rate, loading, error, reload } = useFetch(fetchUsdKrw);

  if (loading) return <p className="muted">환율을 불러오는 중...</p>;
  if (error) return <button className="btn" onClick={reload}>다시 시도</button>;
  return <p>1달러 = {Math.round(rate).toLocaleString("ko-KR")}원</p>;
}

export default ExchangeRate;