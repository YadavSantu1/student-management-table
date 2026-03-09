import React from "react";

function StudentTable({ students, editStudent, deleteStudent }) {

  return (
    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student.id}>

            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>

              <button onClick={() => editStudent(student)}>
                Edit
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this student?")) {
                    deleteStudent(student.id);
                  }
                }}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default StudentTable;