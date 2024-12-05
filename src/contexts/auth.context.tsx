import * as React from "react";
import { useLocation, useNavigate } from "react-router";
import { UserModel } from "@/domain/user/models/user.model";
import { loadMeAction } from "@/domain/auth/actions/load-me.action";
import { TokenService } from "@/services/api/tokens-service";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthLoginDto, loginAction } from "@/domain/auth/actions/login.action";
import { AuthLoginModel } from "@/domain/auth/models/auth-login.model";
import { logoutAction } from "@/domain/auth/actions/logout.action";

interface AuthContextProps {
  logout: () => void;
  login: UseMutationResult<AuthLoginModel, Error, AuthLoginDto, unknown>;
  dataUser: UserModel | null;
  isLogged?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataUser, setDataUser] = React.useState<UserModel | null>(null);
  const isLogged = !!dataUser;

  const logged = React.useCallback(
    (data: UserModel) => {
      setDataUser(data);
      navigate(`${location.pathname}${location.search}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate]
  );

  const logout = React.useCallback(async () => {
    try {
      await logoutAction();
    } finally {
      setDataUser(null);
      TokenService.removeTokens();
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useMutation({
    mutationFn: (dto: AuthLoginDto) =>
      loginAction(dto).then((response) => response.data),
    onSuccess: async (data) => {
      TokenService.saveTokens(data);
      await getUser();
      navigate("/home");
    },
  });

  const getUser: () => Promise<void> = React.useCallback(async () => {
    try {
      if (TokenService.hasTokens()) {
        const response = await loadMeAction();

        if (response.status === 200) {
          return logged(response.data);
        }
      }

      if (isLogged) {
        logout();
      }
    } catch {
      logout();
    }
  }, [isLogged, logged, logout]);

  React.useEffect(() => {
    if (TokenService.hasTokens()) {
      getUser();
    }
  }, [getUser]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        dataUser,
        isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
