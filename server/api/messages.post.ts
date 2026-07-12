export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      throw sendErrorResponse(400, "Field wajib (Nama, Email, Judul, Pesan) harus diisi");
    }

    const visitorMessage = await prisma.visitorMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: "UNREAD",
      },
    });

    return sendSuccess(event, "Pesan Anda berhasil terkirim", visitorMessage, null, 201);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal mengirimkan pesan");
  }
});
