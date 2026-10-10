
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Search,
  Bell,
  ChevronDown,
  Users,
  UserCheck,
  BookOpen,
  UserPlus,
  UserRoundPlus,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import StudentDirectory from "./components/StudentDirectory";
import StudentForm from "./components/StudentForm";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/students";

// Reports page
function Reports({ students }) {
  const courseCounts = {};
  const yearCounts = {};

  students.forEach((student) => {
    const course = student.course || "Unknown";

    const year = String(student.year ?? "Unknown")
      .replace(/^Year\s*/i, "");

    courseCounts[course] = (courseCounts[course] || 0) + 1;
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  const downloadCSV = () => {
    const columns = [
      {
        label: "Student ID",
        getValue: (student) =>
          student.studentId || student.id || student._id,
      },
      { label: "Name", getValue: (student) => student.name },
      { label: "Email", getValue: (student) => student.email },
      { label: "Course", getValue: (student) => student.course },
      { label: "Year", getValue: (student) => student.year },
      { label: "Phone", getValue: (student) => student.phone },
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [
      columns.map((column) => escapeCSV(column.label)).join(","),
      ...students.map((student) =>
        columns
          .map((column) => escapeCSV(column.getValue(student)))
          .join(",")
      ),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="reports-page">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Student Reports</h1>
          <p>
            View student enrolment statistics and export your records.
          </p>
        </div>

        <button
          className="add-student-btn"
          onClick={downloadCSV}
          disabled={students.length === 0}
        >
          Export CSV
        </button>
      </div>

      <section className="stats-grid">
        <StatCard
          icon={<Users size={23} />}
          title="Total Students"
          value={students.length}
          subtitle="Student records"
          variant="pink"
        />

        <StatCard
          icon={<BookOpen size={23} />}
          title="Total Courses"
          value={
            Object.keys(courseCounts).filter(
              (course) => course !== "Unknown"
            ).length
          }
          subtitle="Distinct courses"
          variant="gold"
        />
      </section>

      <div className="reports-grid">
        <div className="report-card">
          <h2>Students by Course</h2>

          {Object.entries(courseCounts).length > 0 ? (
            Object.entries(courseCounts).map(([course, count]) => (
              <p key={course}>
                <strong>{course}</strong>
                <span>{count} student(s)</span>
              </p>
            ))
          ) : (
            <p>No student records available.</p>
          )}
        </div>

        <div className="report-card">
          <h2>Students by Year</h2>

          {Object.entries(yearCounts).length > 0 ? (
            Object.entries(yearCounts)
              .sort(([a], [b]) => {
                if (a === "Unknown") return 1;
                if (b === "Unknown") return -1;
                return Number(a) - Number(b);
              })
              .map(([year, count]) => (
                <p key={year}>
                  <strong>
                    {year === "Unknown" ? year : `Year ${year}`}
                  </strong>
                  <span>{count} student(s)</span>
                </p>
              ))
          ) : (
            <p>No student records available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [topSearch, setTopSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);

      setStudents(
        Array.isArray(response.data) ? response.data : []
      );
      setError("");
    } catch (err) {
      console.error("Failed to load students:", err);

      setError(
        "Unable to connect to the backend. Make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStudentAdded = (student) => {
    setStudents((currentStudents) => [
      ...currentStudents,
      student,
    ]);

    setError("");
    setActivePage("Dashboard");
  };

  const handleStudentDeleted = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) =>
            student._id !== id &&
            student.id !== id &&
            student.studentId !== id
        )
      );

      setError("");
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Unable to delete the student.");
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) => {
        const studentId =
          student._id || student.id || student.studentId;

        const updatedId =
          updatedStudent._id ||
          updatedStudent.id ||
          updatedStudent.studentId;

        return String(studentId) === String(updatedId)
          ? updatedStudent
          : student;
      })
    );

    setEditingStudent(null);
    setShowStudentForm(false);
    setError("");
  };

  const handleCloseForm = () => {
    setShowStudentForm(false);
    setEditingStudent(null);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setTopSearch("");

    if (page === "Students") {
      // The student directory is displayed on the dashboard.
      setActivePage("Dashboard");
    }
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowStudentForm(true);
  };

  const totalStudents = students.length;
  const activeStudents = students.length;

  const courses = new Set(
    students
      .map((student) => student.course)
      .filter(Boolean)
  ).size;

  const newThisMonth = students.length;

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const filteredStudents = students.filter((student) => {
    const query = topSearch.trim().toLowerCase();

    if (!query) return true;

    return [
      student.name,
      student.studentId,
      student.id,
      student._id,
      student.course,
      student.email,
    ].some((value) =>
      String(value ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        onAddStudent={handleAddStudent}
      />

      <div className="main-content">
        <header className="topbar">
          <div className="top-search">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search students by name, ID or course..."
              value={topSearch}
              onChange={(e) => setTopSearch(e.target.value)}
            />

            <div className="shortcut">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </div>

          <div className="topbar-right">
            <button
              className="notification-btn"
              type="button"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>

            <div className="topbar-divider"></div>

            <div className="date-section">
              <strong>{formattedDate}</strong>
              <span>Good morning, Srushti</span>
            </div>

            <div className="profile-section">
              <div className="profile-avatar">S</div>
              <ChevronDown size={17} />
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          {error && (
            <div className="app-error" role="alert">
              {error}
            </div>
          )}

          {activePage === "Reports" ? (
            <Reports students={students} />
          ) : activePage === "Settings" ? (
            <section className="reports-page">
              <div className="welcome-text">
                <h1>Settings</h1>
                <p>StudentHub application settings.</p>
              </div>

              <p>
                Settings options have not been implemented yet.
              </p>
            </section>
          ) : (
            <>
              <section className="welcome-section">
                <div className="welcome-text">
                  <h1>
                    Welcome back, Srushti
                    <span className="wave">👋</span>
                  </h1>

                  <p>
                    Here's what's happening with your students today.
                  </p>
                </div>

                <button
                  className="add-student-btn"
                  onClick={handleAddStudent}
                >
                  <UserRoundPlus size={19} />
                  Add Student
                </button>
              </section>

              <section className="stats-grid">
                <StatCard
                  icon={<Users size={23} />}
                  title="Total Students"
                  value={loading ? "..." : totalStudents}
                  subtitle="↑ Student records"
                  variant="pink"
                />

                <StatCard
                  icon={<UserCheck size={23} />}
                  title="Active Students"
                  value={loading ? "..." : activeStudents}
                  subtitle="↑ Currently enrolled"
                  variant="gold"
                />

                <StatCard
                  icon={<BookOpen size={23} />}
                  title="Courses"
                  value={loading ? "..." : courses}
                  subtitle="CSE · ECE · EEE · DS"
                  variant="gold"
                />

                <StatCard
                  icon={<UserPlus size={23} />}
                  title="New This Month"
                  value={loading ? "..." : newThisMonth}
                  subtitle="↑ Recently added"
                  variant="pink"
                />
              </section>

              <StudentDirectory
                students={filteredStudents}
                onStudentDeleted={handleStudentDeleted}
                onEditStudent={handleEditStudent}
              />
            </>
          )}
        </main>

        {showStudentForm && (
          <StudentForm
            onClose={handleCloseForm}
            onStudentAdded={handleStudentAdded}
            editingStudent={editingStudent}
            onStudentUpdated={handleStudentUpdated}
          />
        )}
      </div>
    </div>
  );
}

export default App;
