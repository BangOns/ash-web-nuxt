export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { title, subtitle, bgImage, btnText, btnLink } = body;

    const hero = await prisma.heroSettings.upsert({
      where: { id: "hero" },
      update: { title, subtitle, bgImage, btnText, btnLink },
      create: { id: "hero", title, subtitle, bgImage, btnText, btnLink },
    });

    return sendSuccess(event, "Hero settings saved successfully", hero);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to save hero settings");
  }
});
