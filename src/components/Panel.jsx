import { useUser } from '../contexts/UserContexts.jsx'

// components/Panel.jsx
function Panel({ title, children }) {
  const user = useUser();

  return (
    <section className="panel">
      <h2 className="panel-title">
        {title === "내 계좌" ? `${user.name}의 계좌` : title}
      </h2>

      {children}
    </section>
  );
}

export default Panel;