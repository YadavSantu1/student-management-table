import React, { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import ExcelDownload from "./components/ExcelDownload";
import SearchBar from "./components/SearchBar";
import studentsData from "./data/students";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {

    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1000);

  }, []);

  const addStudent = (student) => {

    student.id = Date.now();

    setStudents([...students, student]);
  };

  const deleteStudent = (id) => {

    setStudents(students.filter((s) => s.id !== id));
  };

  const editStudent = (student) => {

    setEditingStudent(student);
  };

  const updateStudent = (updatedStudent) => {

    setStudents(
      students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );

    setEditingStudent(null);
  };

  if (loading) {
    return <h2 style={{textAlign:"center"}}>Loading Students...</h2>;
  }

  // SEARCH FILTER

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container">

      <h1>Student Management Table</h1>

      <StudentForm
        addStudent={addStudent}
        editingStudent={editingStudent}
        updateStudent={updateStudent}
      />

      <SearchBar search={search} setSearch={setSearch} />

      <ExcelDownload students={filteredStudents} />

      <StudentTable
        students={filteredStudents}
        editStudent={editStudent}
        deleteStudent={deleteStudent}
      />

    </div>
  );
}

export default App;