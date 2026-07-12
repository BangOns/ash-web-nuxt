export default defineEventHandler(async (event) => {
  try {
    const totalNews = await prisma.news.count();
    const totalAnnouncements = await prisma.announcement.count();
    const totalAgenda = await prisma.agenda.count();
    const totalGallery = await prisma.gallery.count();
    const totalMessages = await prisma.visitorMessage.count();

    const viewsResult = await prisma.news.aggregate({
      _sum: {
        totalViews: true,
      },
    });
    const totalViews = viewsResult._sum.totalViews || 0;

    // Popular news
    const popularNews = await prisma.news.findMany({
      orderBy: {
        totalViews: "desc",
      },
      take: 5,
    });

    // Recent messages
    const recentMessages = await prisma.visitorMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const stats = {
      totalNews,
      totalViews,
      totalAnnouncements,
      totalAgenda,
      totalGallery,
      totalMessages,
      popularNews,
      recentMessages,
    };

    return sendSuccess(event, "Dashboard stats retrieved successfully", stats);
  } catch (err: any) {
    throw sendErrorResponse(550, err.message || "Failed to retrieve dashboard stats");
  }
});
