import { createContext, useState, useCallback } from 'react';
import { authService } from '../services/authService';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const buildUserData = (data) => ({
  ...data.user,
  gp: data.user.gp || 0,
  level: data.user.level || 'SEEDLING',
  profilePic: data.user.profilePic || null,
  totalImages: data.user.totalImages || 0,
  bestScore: data.user.bestScore || 0,
  maxSingleGP: data.user.maxSingleGP || 0,
  goodCount: data.user.goodCount || 0,
  streak: data.user.streak || 0,
  duplicateWarnings: data.user.duplicateWarnings || 0,
  isFlagged: data.user.isFlagged || false,
  levelProgress: data.user.levelProgress || null,
  achievements: data.user.achievements || [],
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('accessToken');
      if (storedUser && token) {
        return JSON.parse(storedUser);
      }
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
    return null;
  });

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    const userData = buildUserData(data);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const register = useCallback(async (formData) => {
    const data = await authService.register(formData);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const updateUserPoints = useCallback((pointsToDeductOrAdd) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, gp: Math.max(0, (prev.gp || 0) + pointsToDeductOrAdd) };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const syncUser = useCallback((serverData) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, ...serverData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const refreshUser = useCallback((newData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...newData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserPoints, syncUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
