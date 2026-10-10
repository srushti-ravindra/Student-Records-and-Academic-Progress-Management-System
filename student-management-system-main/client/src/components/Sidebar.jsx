
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  GraduationCap,
} from "lucide-react";

function Sidebar({ activePage, onNavigate, onAddStudent }) {
  const items = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Students", icon: Users },
    { label: "Add Student", icon: UserPlus },
    { label: "Reports", icon: BarChart3 },
    { label: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <GraduationCap size={22} strokeWidth={1.8} />
        </div>
        <div>
          <h2>StudentHub</h2>
          <p>Manage. Learn. Grow.</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={`nav-item ${
              activePage === label ? "active" : ""
            }`}
            onClick={() =>
              label === "Add Student"
                ? onAddStudent()
                : onNavigate(label)
            }
          >
            <Icon size={18} strokeWidth={1.8} />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-quote">
        <p>
          “Education builds
          <br />
          brighter
          <br />
          tomorrows.”
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
