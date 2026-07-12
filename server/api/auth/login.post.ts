export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
      throw sendErrorResponse(400, "Email dan password wajib diisi");
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || !verifyPassword(password, admin.password)) {
      throw sendErrorResponse(401, "Email atau password salah");
    }

    const sessionData = JSON.stringify({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      createdAt: Date.now(),
    });

    const encryptedSession = encryptSession(sessionData);

    setCookie(event, "admin_session", encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return sendSuccess(event, "Login berhasil", {
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal melakukan login");
  }
});
