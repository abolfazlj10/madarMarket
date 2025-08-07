import { createContext, useContext } from 'react';
import { isLoginUser } from '../hooks/useLogin';

type User = {
  id: number;
  phone: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refetch: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: () => {},
  refetch: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, refetch } = isLoginUser();
  const logout = () => {
    localStorage.removeItem('tokenMarket');
  };

  const user = data?.user ?? null;

  return (
    <UserContext.Provider value={{ user, loading: isLoading, logout, refetch }}>
      {children}
    </UserContext.Provider>
  );
};
