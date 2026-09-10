// components/AccountCard.jsx
import StatusBadge from "./StatusBadge.jsx";
import { formatWon, maskAccountNo } from "../utils/format";

function AccountCard({
  accountNo,
  accountType,
  balance,
  status,
  showFullNo,
  showAmount,
  onDeposit
}) {
  return (
    <div className="card">
      <div className="row">
        <span className="muted">{accountType}</span>
        <StatusBadge status={status} />
      </div>

      <p className="muted">
        {showFullNo ? accountNo : maskAccountNo(accountNo)}
      </p>

      <div className="balance-row">
        <strong className="balance">
          {showAmount ? (
            formatWon(balance)
          ) : (
            <>
              <span className="masked-amount">••••••</span>원
            </>
          )}
        </strong>

        {onDeposit && (
          <button className="deposit-button" onClick={onDeposit}>
            + 1만원 입금
          </button>
        )}
      </div>
    </div>
  );
}

export default AccountCard;