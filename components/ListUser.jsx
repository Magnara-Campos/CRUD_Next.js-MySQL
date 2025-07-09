'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Para View/Edit
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleView = async (id) => {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    alert(`Name: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}`);
  };

  const handleEdit = async (id) => {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    setFormData(data);
    setSelectedUser(data);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Tens certeza que queres apagar este usuário?');
    if (confirm) {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      fetchUsers();
    }
  };

  const handleSubmit = async () => {
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/users/${selectedUser.id}` : `/api/users`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setShowModal(false);
    setFormData({ name: '', email: '', mobile: '' });
    setIsEditing(false);
    fetchUsers();//are u ok
  };

  return (
    <>
      <div className="text-right mb-3">
        <button className="btn btn-primary" onClick={() => {
          setFormData({ name: '', email: '', mobile: '' });
          setIsEditing(false);
          setShowModal(true);
        }}>Adicionar Usuário</button>
      </div>

      <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Mobile</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.mobile}</td>
              <td className="flex justify-center gap-1 py-3">
                <button onClick={() => handleView(user.id)} className="btn btn-success">Ver</button>
                <button onClick={() => handleEdit(user.id)} className="btn btn-info">Editar</button>
                <button onClick={() => handleDelete(user.id)} className="btn btn-error">Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            <div className="mb-2">
              <label className="text-gray-700 font-bold text-left block">Name</label>
              <input type="text" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full" />
            </div>
            <div className="mb-2">
              <label className="text-gray-700 font-bold text-left block">Email</label>
              <input type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full" />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold text-left block">Phone Number</label>
              <input type="text" value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="input input-bordered w-full" />
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn btn-outline btn-primary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {isEditing ? 'Actualizar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
