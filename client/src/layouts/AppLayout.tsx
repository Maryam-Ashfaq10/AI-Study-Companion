import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{ width: '250px' }}
      >
        <div className="mb-4">
          <h4 className="mb-0">AI Study Buddy</h4>
          <small className="text-secondary">
            Learn smarter
          </small>
        </div>

        <nav className="nav flex-column gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${
                isActive
                  ? 'active bg-primary text-white'
                  : 'text-white'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/subjects"
            className={({ isActive }) =>
              `nav-link ${
                isActive
                  ? 'active bg-primary text-white'
                  : 'text-white'
              }`
            }
          >
            Subjects
          </NavLink>

          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `nav-link ${
                isActive
                  ? 'active bg-primary text-white'
                  : 'text-white'
              }`
            }
          >
            Notes
          </NavLink>

          <NavLink
            to="/flashcards"
            className="nav-link text-white"
          >
            Flashcards
          </NavLink>

          <NavLink
            to="/quizzes"
            className="nav-link text-white"
          >
            Quizzes
          </NavLink>

          <NavLink
            to="/ai"
            className="nav-link text-white"
          >
            AI Assistant
          </NavLink>
        </nav>

        <div className="mt-auto">
          <hr />

          <NavLink
            to="/settings"
            className="nav-link text-white mb-2"
          >
            Settings
          </NavLink>

          <button
            type="button"
            className="btn btn-outline-light w-100"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navbar */}
        <header className="bg-white border-bottom px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Study Dashboard</h5>
            </div>

            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <div className="fw-semibold">
                  {user?.name}
                </div>

                <small className="text-muted">
                  {user?.email}
                </small>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;