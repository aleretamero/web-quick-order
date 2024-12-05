import { HttpResponse } from '@/lib/http/http-response';
import { AuthLoginModel } from '@/domain/auth/models/auth-login.model';
import { apiClient } from '@/services/api/api-service';

export type AuthLoginDto = {
  email: string;
  password: string;
};

export async function loginAction(
  dto: AuthLoginDto,
): Promise<HttpResponse<AuthLoginModel>> {
  return apiClient.post<AuthLoginModel>('/auth/login', dto);
}
