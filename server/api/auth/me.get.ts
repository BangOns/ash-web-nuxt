export default defineEventHandler(async (event) => {
  try {
    const sessionCookie = getCookie(event, "admin_session");

    if (!sessionCookie) {
      throw sendErrorResponse(401, "Tidak terautentikasi");
    }

    const decrypted = decryptSession(sessionCookie);

    if (!decrypted) {
      throw sendErrorResponse(401, "Sesi tidak valid");
    }

    const session = JSON.parse(decrypted);

    const admin = await prisma.admin.findUnique({
      where: { id: session.id },
    });

    if (!admin) {
      throw sendErrorResponse(401, "Admin tidak ditemukan");
    }

    return sendSuccess(event, "User terautentikasi", {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    });
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal memverifikasi user");
  }
});
