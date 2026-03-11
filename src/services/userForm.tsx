// src/components/UserForm.tsx
import React, { useState, useEffect } from 'react';
import type { User, UserWithoutId } from '../types/users';

interface UserFormProps {
  user?: User | null;
  onSubmit: (userData: UserWithoutId) => void;
  onCancel: () => void;
}

const initialFormState: UserWithoutId = {
  name: '',
  email: '',
  phone: '',
  role: 'User',
};

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserWithoutId>(initialFormState);
  const [errors, setErrors] = useState<Partial<UserWithoutId>>({});

  useEffect(() => {
  if (!user) {
    setFormData(initialFormState);
    return;
  }

  setFormData(prev =>
    prev.name === user.name &&
    prev.email === user.email &&
    prev.phone === user.phone &&
    prev.role === user.role
      ? prev
      : {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        }
  );
}, [user]);

  const validate = (): boolean => {
    const newErrors: Partial<UserWithoutId> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Teléfono</label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Rol</label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="User">Usuario</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {user ? 'Actualizar' : 'Guardar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;