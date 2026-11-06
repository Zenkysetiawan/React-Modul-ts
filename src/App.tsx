import { useEffect, useState } from "react";

interface Company {
  name: string;
}

interface Address {
  street: string;
  city: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: Company;
  address: Address;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function ambilData(): Promise<void> {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error("Server membalas dengan error");
        }

        const data: User[] = await response.json();
        setUsers(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError("Data gagal dimuat, coba lagi nanti");
      } finally {
        setLoading(false);
      }
    }

    ambilData();
  }, []);

  if (loading) {
    return <p>Memuat data...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.phone} ({user.company.name}) (
            {user.address.street}) ({user.address.city})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
