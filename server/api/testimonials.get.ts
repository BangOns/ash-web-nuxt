export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.testimonial.findMany();
    return sendSuccess(event, "Testimonials retrieved successfully", data);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve testimonials");
  }
});
