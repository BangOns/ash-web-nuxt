export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sejarah, visi, misi, sambutan } = body;

    const profile = await prisma.profileSettings.upsert({
      where: { id: "profile" },
      update: { sejarah, visi, misi, sambutan },
      create: { id: "profile", sejarah, visi, misi, sambutan },
    });

    return sendSuccess(event, "Profile settings saved successfully", profile);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to save profile settings");
  }
});
