import { useState, useRef, useEffect } from "react";
import TransactionRow from "./TransactionRow";
import { transactions } from "../data/mockData";

function TransactionList() {
  const TYPE_OPTIONS = ["전체", "입금", "출금"];
  const CATEGORY_OPTIONS = [
    "전체",
    "식비",
    "교통",
    "쇼핑",
    "급여",
    "이체",
    "의료",
    "통신",
    "카페",
  ];

  const [typeFilter, setTypeFilter] = useState("전체");
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleTransactions = transactions.filter((tx) => {
    const matchesType = typeFilter === "전체" || tx.txType === typeFilter;
    const matchesCategory =
      categoryFilter === "전체" || tx.category === categoryFilter;

    return matchesType && matchesCategory;
  });

  return (
    /* 여기 맨 바깥 div에 card 클래스를 추가했습니다! */
    <div className="card filter-container">
      {/* 필터 영역 */}
      <div className="filter-header-row">
        {/* 거래 종류 (세그먼트 탭) */}
        <div className="segmented-control">
          {TYPE_OPTIONS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`segmented-btn ${typeFilter === type ? "active" : ""}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 카테고리 (드롭다운) */}
        <div className="custom-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="dropdown-toggle-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{categoryFilter === "전체" ? "카테고리" : categoryFilter}</span>
            <svg
              className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {CATEGORY_OPTIONS.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    className={`dropdown-item ${categoryFilter === cat ? "selected" : ""}`}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {cat === "전체" ? "카테고리 전체" : cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 리스트 영역 */}
      <div className="transaction-list">
        {visibleTransactions.length > 0 ? (
          visibleTransactions.map((tx) => (
            <TransactionRow key={tx.txId} {...tx} />
          ))
        ) : (
          <p className="empty-message">조건에 맞는 거래 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default TransactionList;