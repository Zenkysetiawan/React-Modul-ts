import StudentItem from "./components/StudentItem";
import type { Student } from "./types/student";

const students: Student[] = [
  { id: 1, name: "Budi", major: "Hukum", semester: 3 },
  { id: 2, name: "Sari", major: "Sastra", semester: 5 },
];

function App() {
  function handleDelete(id: number): void {
    console.log("hapus id", id);
  }

  function handleEdit(student: Student): void {
    console.log("edit", student.name);
  }

  return (
    <div>
      <h1>Student Directory TS</h1>
      <ul>
        {students.map((student) => (
          //pakai cetakan StudentItem, titipkan data dan dua fungsi.
          <StudentItem
            key={student.id}
            student={student}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}
export default App;
