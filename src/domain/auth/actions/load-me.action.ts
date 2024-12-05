import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { UserModel } from '@/domain/user/models/user.model';

export async function loadMeAction(): Promise<HttpResponse<UserModel>> {
  return apiClient.get<UserModel>("/auth/me");
}
