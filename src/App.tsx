import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import StudentForm from "./components/StudentForm";
import StudentItem from "./components/StudentItem";
import type { FormValues, Student } from "./types/student";

const dataAwal: Student[] = [
  { id: 1, name: "Budi", major: "Hukum", semester: 3 },
  { id: 2, name: "Sari", major: "Sastra", semester: 5 },
  { id: 3, name: "Andi", major: "Informatika", semester: 1 },
];

//satu cetakan form kosong, disimpan di luar komponen.
const emptyForm: FormValues = { name: "", major: "", semester: "", email: "" };

function App() {
  const [students, setStudents] = useState<Student[]>(dataAwal);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("");
      return;
    }

    //ubah teks semester jadi angka, simpan sekali, dipakai di dua cabang
    const semesterNumber = Number(form.semester);

    if (editingId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editingId
            ? {
                ...student,
                name: form.name.trim(),
                major: form.major.trim(),
                semester: semesterNumber,
                email: form.email.trim(),
              }
            : student,
        ),
      );
      setMessage("Student berhasil diubah");
    } else {
      const newStudent: Student = {
        id: Date.now(),
        name: form.name.trim(),
        major: form.major.trim(),
        semester: semesterNumber,
        email: form.email.trim(),
      };
      setStudents([...students, newStudent]);
      setMessage("Student berhasil ditambahkan");
    }

    setForm(emptyForm);
    setEditingId(null);
    setError("");
  }

  function handleEdit(student: Student): void {
    setForm({
      name: student.name,
      major: student.major,
      semester: String(student.semester),
      email: student.email ?? "",
    });
    setEditingId(student.id);
    setError("");
  }

  function handleCancel(): void {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("Edit data dibatalkan");
  }

  function handleDelete(id: number): void {
    setStudents(students.filter((student) => student.id !== id));
    if (id === editingId) {
      handleCancel();
    }
    setMessage("Student berhasil dihapus");
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1>Student Directory TS</h1>

      <StudentForm
        form={form}
        isEditing={editingId !== null}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <br />
      <br />

      {message && <p style={{ color: "green" }}>{message}</p>}

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari nama..."
      />

      {students.length === 0 ? (
        <p>Belum ada data students.</p>
      ) : (
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
      )}

      {students.length > 0 && filteredStudents.length === 0 && (
        <p>Nama tidak ditemukan.</p>
      )}
    </div>
  );
}

export default App;
