"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definimos el tipo para el contexto, solo nos importa el ID del usuario
interface UserContextType {
  userId?: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

// Creamos el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Componente Proveedor del Contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
// Hook para acceder al contexto
export const useUserId = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserId must be used within a UserProvider');
    }
    return context;
  };
  