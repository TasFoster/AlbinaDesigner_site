import { createContext, useContext } from "react";
import { api } from "../api";
import { useApi } from "../hooks/useApi";

const ProfileContext = createContext({ profile: null, loading: true, error: null });

export function ProfileProvider({ children }) {
  const { data, loading, error } = useApi(() => api.getProfile(), []);
  return <ProfileContext.Provider value={{ profile: data, loading, error }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  return useContext(ProfileContext);
}
