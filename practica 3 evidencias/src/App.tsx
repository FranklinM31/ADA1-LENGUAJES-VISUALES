// src/App.tsx
import React, { useState, useEffect } from 'react';
import type { User, UserWithoutId } from './types/users';
import { userService } from './services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './services/userForm';
import UserTable from './component/UserTable';


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCreate = async (userData: UserWithoutId) => {
    setLoading(true);
    try {
      const newUser = await userService.create(userData);
      setUsers(prev => [...prev, newUser]);
      showMessage('success', 'Usuario creado exitosamente');
      handleCancel();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (userData: UserWithoutId) => {
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      const updatedUser = await userService.update(selectedUser.id, userData);
      if (updatedUser) {
        setUsers(prev => prev.map(user => 
          user.id === selectedUser.id ? updatedUser : user
        ));
        showMessage('success', 'Usuario actualizado exitosamente');
        handleCancel();
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al actualizar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const deleted = await userService.delete(id);
      if (deleted) {
        setUsers(prev => prev.filter(user => user.id !== id));
        showMessage('success', 'Usuario eliminado exitosamente');
        if (selectedUser?.id === id) {
          handleCancel();
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al eliminar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
  setSelectedUser(user);
  setShowFormModal(true);
  };

  const handleDeleteClick = (user: User) => {
  setUserToDelete(user);
  setShowDeleteModal(true);
};

  const confirmDelete = async () => {
  if (!userToDelete) return;
  await handleDelete(userToDelete.id);
  setShowDeleteModal(false);
  setUserToDelete(null);
  };

  const handleCancel = () => {
    setSelectedUser(null);
  };

  const handleSubmit = (userData: UserWithoutId) => {
    
    if (selectedUser) {
      handleUpdate(userData);
    } else {
      handleCreate(userData);
    }
  };
  const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">CRUD de Usuarios</h1>
      <div className="d-flex justify-content-end mb-3">
  <button
    className="btn btn-success"
    onClick={() => {
      setSelectedUser(null);
      setShowFormModal(true);
    }}
  >
    + Crear Usuario
  </button>
</div>
      
      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
<div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Buscar usuario..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>      
      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        />

        {showFormModal && (
  <div className="modal fade show d-block">
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            {selectedUser ? 'Editar Usuario' : 'Crear Usuario'}
          </h5>
          <button
            className="btn-close"
            onClick={() => setShowFormModal(false)}
          ></button>
        </div>

        <div className="modal-body">
          <UserForm
            user={selectedUser}
            onSubmit={(data) => {
              handleSubmit(data);
              setShowFormModal(false);
            }}
            onCancel={() => setShowFormModal(false)}
          />
        </div>

      </div>
    </div>
  </div>
)}

{showDeleteModal && userToDelete && (
  <div className="modal fade show d-block">
    <div className="modal-dialog modal-sm">
      <div className="modal-content">

        <div className="modal-header bg-danger text-white">
          <h5 className="modal-title">Confirmar eliminación</h5>
          <button
            className="btn-close btn-close-white"
            onClick={() => setShowDeleteModal(false)}
          ></button>
        </div>

        <div className="modal-body text-center">
          ¿Eliminar a <strong>{userToDelete.name}</strong>?
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancelar
          </button>

          <button
            className="btn btn-danger"
            onClick={confirmDelete}
          >
            Eliminar
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default App;