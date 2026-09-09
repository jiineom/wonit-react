// 1. 필요로 하는 모듈들은 import

import { formatWon } from '../utils/format';

export default function TransactionRow({
  txType,
  amount,
  category,
  memo,
  counterparty,
  txDatetime,
}) {
  const sign = txType === '입금' ? '+' : '-';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
      {/* 왼쪽: 거래처, 메모 */}
      <div>
        <div style={{ fontWeight: 'bold' }}>{counterparty}</div>
        <div style={{ fontSize: '14px', color: '#666' }}>{memo}</div>
      </div>

      {/* 오른쪽: 금액 */}
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontWeight: 'bold', color: txType === '입금' ? '#2e7d32' : '#d32f2f' }}>
          {sign}{formatWon(amount)}
        </span>
      </div>
    </div>
  );
}