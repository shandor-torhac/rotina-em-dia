type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

const menuItems = [
  { id: "dashboard", label: "Visão geral", icon: "⌂" },
  { id: "inbox", label: "Caixa de entrada", icon: "▤" },
  { id: "tasks", label: "Minhas tarefas", icon: "✓" },
  { id: "calendar", label: "Calendário", icon: "▦" },
  { id: "habits", label: "Hábitos", icon: "↗" },
  { id: "performance", label: "Desempenho", icon: "▥" },
];

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">R</div>
        <span>Rotina em Dia</span>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-label">MENU PRINCIPAL</p>

        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-link ${activePage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>Organize seu dia.</span>
        <strong>Construa sua evolução.</strong>
      </div>
    </aside>
  );
}

export default Sidebar;
