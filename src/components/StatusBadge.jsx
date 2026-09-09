export default function StatusBadge({ status }) {
  // 상태별 색상 객체 정의
  const colors = {
    정상: { bg: '#e8f5e9', text: '#2e7d32' },     // 초록
    휴면: { bg: '#f5f5f5', text: '#616161' },     // 회색
    지급정지: { bg: '#ffebee', text: '#c62828' }, // 빨강
    해지: { bg: '#e0e0e0', text: '#212121' },     // 검정
  };

  // 힌트: colors[status] 로 색상 꺼내기 (일치하는 상태가 없으면 기본 회색)
  const currentColor = colors[status] || { bg: '#f5f5f5', text: '#616161' };

  return (
    <span
      style={{
        backgroundColor: currentColor.bg,
        color: currentColor.text,
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        marginLeft: '6px',
      }}
    >
      {status}
    </span>
  );
}