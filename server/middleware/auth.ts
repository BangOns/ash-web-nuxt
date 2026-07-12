export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // Protect all API routes under /api/admin/
  if (url.pathname.startsWith("/api/admin/")) {
    const sessionCookie = getCookie(event, "admin_session");

    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: "Tidak terautentikasi",
      });
    }

    const decrypted = decryptSession(sessionCookie);

    if (!decrypted) {
      throw createError({
        statusCode: 401,
        statusMessage: "Sesi tidak valid",
      });
    }

    const session = JSON.parse(decrypted);
    event.context.admin = session;
  }
});
