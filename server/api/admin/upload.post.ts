import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  try {
    const multipart = await readMultipartFormData(event);
    if (!multipart) {
      throw sendErrorResponse(400, "Tidak ada file yang diunggah");
    }

    const file = multipart.find((item) => item.name === "file");
    if (!file || !file.filename || !file.data) {
      throw sendErrorResponse(400, "File tidak valid atau tidak ditemukan");
    }

    // Create unique filename
    const ext = path.extname(file.filename);
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}${ext}`;

    // Ensure public/uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write file to public/uploads
    const filePath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(filePath, file.data);

    return sendSuccess(event, "File uploaded successfully", {
      url: `/uploads/${uniqueName}`,
    });
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Failed to upload file");
  }
});
