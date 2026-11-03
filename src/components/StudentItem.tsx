import type { Student } from "../types/student";

// bikin daftar isi kiriman buat StudentItem
interface StudentItemProps {
  student: Student;
  onDelete: (id: number) => void;
  onEdit: (student: Student) => void;
}

// bikin cetakan StudentItem
function StudentItem({ student, onDelete, onEdit }: StudentItemProps) {
  return (
    <li>
      <strong>{student.name}</strong>
      <br />
      Jurusan: {student.major}
      <br />
      Semester: {student.semester}
      <br />
      <button onClick={() => onDelete(student.id)}>Hapus</button>
      <button onClick={() => onEdit(student)}>Edit</button>
    </li>
  );
}

export default StudentItem;
