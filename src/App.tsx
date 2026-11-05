import { useState } from "react";
import StudentItem from "./components/StudentItem";
import type { Student } from "./types/student";

const dataAwal: Student[] = [
  { id: 1, name: "Budi", major: "Hukum", semester: 3 },
  { id: 2, name: "Sari", major: "Sastra", semester: 5 },
  { id: 3, name: "Andi", major: "Informatika", semester: 7 },
];

function App() {
  const [students, setStudents] = useState<Student[]>(dataAwal);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  function handleDelete(id: number): void {
    setStudents(students.filter((student) => student.id !== id));
    if (id === editingId) {
      setEditingId(null);
    }
  }

  function handleEdit(student: Student): void {
    setEditingId(student.id);
  }

  //cari satu mahasiswa yang id-nya sama dengan editingId
  const editingStudent = students.find((student) => student.id === editingId);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1>Student Directory TS</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari nama..."
      />

      {/* “kalau editingStudent ada isinya, tampilkan ‘Sedang mengedit’ plus namanya. */}
      {editingStudent && <p>Sedang mengedit: {editingStudent.name}</p>}

      <ul>
        {filteredStudents.map((student) => (
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
