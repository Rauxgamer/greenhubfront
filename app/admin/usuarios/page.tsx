"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import AdminSidebar from "@/components/admin/adminSidebar";
import Header from "@/components/header-component";
import { ChevronDown, Plus, Pencil, Trash } from "lucide-react";

interface User {
  id: string;
  bio: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  lastLogin: string;
  photoURL: string;
  role: string;
  username: string;
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filtros
  const [sortField, setSortField] = useState<keyof User>("displayName");
  const [filterRole, setFilterRole] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, [sortField, filterRole]);

  async function fetchUsers() {
    setLoading(true);
    let q = query(
      collection(db, "users"),
      orderBy(sortField)
    );
    if (filterRole) {
      q = query(q, where("role", "==", filterRole));
    }
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
    setUsers(data);
    setLoading(false);
  }

  async function handleAdd() {
    const newUser: Omit<User, 'id'> = {
      bio: 'Sin descripción',
      createdAt: new Date().toISOString(),
      displayName: 'Nuevo Usuario',
      email: '',
      emailVerified: false,
      lastLogin: new Date().toISOString(),
      photoURL: '',
      role: 'user',
      username: ''
    };
    await addDoc(collection(db, "users"), newUser);
    fetchUsers();
  }

  async function handleUpdate(id: string, field: keyof User, value: any) {
    const ref = await updateDoc(doc(db, "users", id), { [field]: value });
    fetchUsers();
  }

  async function handleDelete(id: string) {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="permanent"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <Header
          collapsed={collapsed}
          isSidebarOpen={isSidebarOpen}
          isMobileMenuOpen={false}
          setIsMobileMenuOpen={() => {}}
        />
        <div className="p-6 pt-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <select
                className="border p-2 rounded"
                value={sortField}
                onChange={e => setSortField(e.target.value as keyof User)}
              >
                <option value="displayName">Nombre</option>
                <option value="lastLogin">Último login</option>
                <option value="createdAt">Fecha creación</option>
              </select>
              <select
                className="border p-2 rounded"
                value={filterRole}
                onChange={e => setFilterRole(e.target.value)}
              >
                <option value="">Todos los roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700"
            >
              <Plus className="mr-2" /> Añadir usuario
            </button>
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="overflow-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {['Foto','Nombre','Email','Verificado','Rol','Creado','Último login','Acciones'].map(header => (
                      <th key={header} className="p-2 border-b text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-2"><img src={user.photoURL} alt="" className="h-8 w-8 rounded-full"/></td>
                      <td className="p-2">{user.displayName}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.emailVerified ? 'Sí' : 'No'}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">{new Date(user.createdAt).toLocaleString()}</td>
                      <td className="p-2">{new Date(user.lastLogin).toLocaleString()}</td>
                      <td className="p-2 flex space-x-2">
                        <button className="p-1 hover:text-blue-600"><Pencil /></button>
                        <button onClick={() => handleDelete(user.id)} className="p-1 hover:text-red-600"><Trash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
