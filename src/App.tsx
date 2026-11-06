import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import StudentItem from "./components/StudentItem";
import type { Student } from "./types/student";

interface FormValues {
  name: string;
  major: string;
  semester: string;
}

const dataAwal: Student[] = [
  { id: 1, name: "Budi", major: "Hukum", semester: 3 },
  { id: 2, name: "Sari", major: "Sastra", semester: 5 },
];

function App() {
  const [students, setStudents] = useState<Student[]>(dataAwal);
  const [form, setForm] = useState<FormValues>({
    name: "",
    major: "",
    semester: "",
  });
  const [error, setError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (
      form.name.trim() === "" ||
      form.major.trim() === "" ||
      form.semester.trim() === ""
    ) {
      setError("form tidak ada yang boleh kosong");
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name: form.name.trim(),
      major: form.major.trim(),
      semester: Number(form.semester),
    };

    setStudents([...students, newStudent]);
    setForm({ name: "", major: "", semester: "" });
    setError("");
  }

  function handleDelete(id: number): void {
    setStudents(students.filter((student) => student.id !== id));
  }

  function handleEdit(student: Student): void {
    console.log("edit", student.name);
  }

  return (
    <div>
      <h1>Student Directory TS</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
        />
        <br /> <br />
        <select name="major" value={form.major} onChange={handleChange}>
          <option value="">Pilih Jurusan</option>
          <option value="Hukum">Hukum</option>
          <option value="Sastra">Sastra</option>
          <option value="Informatika">Infromatika</option>
        </select>
        <br />
        <br />
        <input
          name="semester"
          type="number"
          value={form.semester}
          onChange={handleChange}
          placeholder="Semester"
        />
        <br /> <br />
        <button type="submit">Tambah</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {students.map((student) => (
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
