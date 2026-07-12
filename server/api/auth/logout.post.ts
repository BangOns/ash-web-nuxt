export default defineEventHandler(async (event) => {
  try {
    deleteCookie(event, "admin_session", {
      path: "/",
    });
    return sendSuccess(event, "Berhasil logout", { success: true });
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Gagal melakukan logout");
  }
});
