// cetakan isian form, semuanya teks
export interface Student {
  id: number;
  name: string;
  major: string;
  semester: number;
  email?: string;
}
export interface FormValues {
  name: string;
  major: string;
  semester: string;
  email: string;
}
