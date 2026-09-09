// 필요한 부품들을 불러옵니다.
import './App.css'
import Clock from './components/Clock.jsx'
import Panel from './components/Panel.jsx'
import AccountCard from './components/AccountCard.jsx'
import Header from './components/Header'
import { useState } from 'react'
import TransactionList from './components/TransactionList';
import { accounts as initialAccounts } from './data/mockData';
import ExchangeRate from './components/ExchangeRate';
import { UserProvider } from './contexts/UserContexts.jsx'

function App() {
  // 1. accounts 데이터를 useState로 관리
  // ⭕ 불러온 데이터를 초기값으로 넣기

const [accounts, setAccounts] = useState(initialAccounts);


  // 2. 1만원 입금 함수 작성
  const handleDeposit = (id) => {
    setAccounts(
      accounts.map((acc) =>
        acc.accountId === id ? { ...acc, balance: acc.balance + 10000 } : acc
      )
    );
  };


  const [showFullNo, setShowFullNo] = useState(false);
  const [showAmount, setShowAmount] = useState(false);

  // 모든 계좌 잔액의 합계 계산 (자동 재계산)
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    return (
  <>
  
  <UserProvider user={{ name: "엄지인", grade: "우수" }}>
    <Header />
 
  

    <div className="button-group">
      <button onClick={() => setShowFullNo(!showFullNo)}>
        {showFullNo ? "계좌번호 숨기기" : "계좌번호 보기"}
      </button>

      <button onClick={() => setShowAmount(!showAmount)}>
        {showAmount ? "금액 숨기기" : "금액 보기"}
      </button>
    </div>

    <Clock />

        <div className="total-balance-box">
      <div className="total-balance-label">총 자산</div>
      <div className="total-balance-value">
        {totalBalance.toLocaleString("ko-KR")}원
      </div>
    </div>

    <Panel title="내 계좌">
    {accounts.map((acc) => (
    <AccountCard 
      key={acc.accountId}
      accountNo={acc.accountNo}
      accountType={acc.accountType} 
      balance={acc.balance}
      status={acc.status}
      showFullNo={showFullNo}
      showAmount={showAmount}
      // 입출금 통장에만 입금 버튼 기능 전달
      onDeposit={acc.accountType === '입출금' ? () => handleDeposit(acc.accountId) : undefined}
    />
  ))}
</Panel> 


      {/* 최근 거래 패널 */}
      <Panel title="최근 거래">
        <TransactionList/>
      </Panel>
    <Panel title="오늘의 환율">
      <ExchangeRate />
    </Panel>

     </UserProvider>
    </>
  );
}


export default App