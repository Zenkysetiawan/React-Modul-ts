import type { ChangeEvent, FormEvent } from "react";
import type { FormValues } from "../types/student";

// daftar isi kiriman buat StudentForm: satu form, dua penanda (isEditing, error), dan tiga fungsi.
interface StudentFormProps {
  form: FormValues;
  isEditing: boolean;
  error: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

function StudentForm({
  form,
  isEditing,
  error,
  onChange,
  onSubmit,
  onCancel,
}: StudentFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Nama"
      />
      <br /> <br />
      <select name="major" value={form.major} onChange={onChange}>
        <option value="">Pilih Jurusan</option>
        <option value="Hukum">Hukum</option>
        <option value="Sastra">Sastra</option>
        <option value="Informatika">Informatika</option>
      </select>
      <br /> <br />
      <input
        name="semester"
        type="number"
        value={form.semester}
        onChange={onChange}
        placeholder="Semester"
      />
      <br /> <br />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        placeholder="Email (opsional)"
      />
      <br />
      <br />
      <button type="submit">{isEditing ? "Simpan" : " Tambah"}</button>
      {isEditing && (
        <button type="button" onClick={onCancel}>
          Batal
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default StudentForm;
