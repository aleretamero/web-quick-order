import * as React from "react";
import { UserModel } from "@/domain/user/models/user.model";
import { loadMeAction } from "@/domain/auth/actions/load-me.action";
import { TokenService } from "@/services/api/tokens-service";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthLoginDto, loginAction } from "@/domain/auth/actions/login.action";
import { AuthLoginModel } from "@/domain/auth/models/auth-login.model";
import { logoutAction } from "@/domain/auth/actions/logout.action";
import { useToast } from "@/hooks/use-toast.hook";
import { HttpError } from "@/lib/http/http-error";

interface AuthContextProps {
  logout: () => void;
  login: UseMutationResult<AuthLoginModel, Error, AuthLoginDto, unknown>;
  dataUser: UserModel | null;
  isLogged?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const [dataUser, setDataUser] = React.useState<UserModel | null>(null);
  const [isLogged, setIsLogged] = React.useState<boolean>();

  const logged = React.useCallback((data: UserModel) => {
    setDataUser(data);
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await logoutAction();
    } finally {
      setDataUser(null);
      TokenService.removeTokens();
    }
  }, []);

  const login = useMutation({
    mutationFn: (dto: AuthLoginDto) =>
      loginAction(dto).then((response) => response.data),
    onSuccess: async (data) => {
      TokenService.saveTokens(data);
      await getUser();
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
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

  React.useEffect(() => {
    setIsLogged(!!dataUser);
  }, [dataUser]);

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
