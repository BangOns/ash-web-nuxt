import type { LoginResponse, StandardResponse } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useState<LoginResponse["user"] | null>("admin_user", () => null);

  if (user.value) return;

  try {
    const headers = useRequestHeaders(["cookie"]);
    const res = await $fetch<StandardResponse<LoginResponse["user"]>>("/api/auth/me", {
      headers,
    });
    user.value = res.data;
  } catch (error) {
    user.value = null;
    return navigateTo("/admin/login");
  }
});
