// src/services/userService.ts
import type { User, UserWithoutId } from '../types/users';

// Simulamos una API con datos en memoria
let users: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan@email.com', phone: '123456789', role: 'Admin' },
  { id: 2, name: 'María García', email: 'maria@email.com', phone: '987654321', role: 'User' },
  { id: 3, name: 'Carlos López', email: 'carlos@email.com', phone: '456789123', role: 'User' },
];

let nextId = 4;

export const userService = {
  // Obtener todos los usuarios
  getAll: (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...users]), 500);
    });
  },

  // Obtener un usuario por ID
  getById: (id: number): Promise<User | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(users.find(user => user.id === id)), 500);
    });
  },

  // Crear nuevo usuario
  create: (user: UserWithoutId): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...user, id: nextId++ };
        users.push(newUser);
        resolve(newUser);
      }, 500);
    });
  },

  // Actualizar usuario
  update: (id: number, userData: UserWithoutId): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
          users[index] = { ...userData, id };
          resolve(users[index]);
        }
        resolve(null);
      }, 500);
    });
  },

  // Eliminar usuario
  delete: (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = users.length;
        users = users.filter(user => user.id !== id);
        resolve(users.length !== initialLength);
      }, 500);
    });
  },
};