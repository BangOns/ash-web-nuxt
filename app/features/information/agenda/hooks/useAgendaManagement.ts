import { computed } from "vue";

export const useAgendaManagement = async () => {
  const { data: rawAgendas } = await useAgendaApi().getAgenda();

  const groupedAgenda = computed(() => {
    if (!rawAgendas.value) return [];

    const groups: Record<string, any[]> = {};

    rawAgendas.value.forEach((item) => {
      const start = new Date(item.startDate);
      const end = new Date(item.endDate);
      const monthYear = start.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      const startDay = start.getDate().toString().padStart(2, "0");
      const endDay = end.getDate().toString().padStart(2, "0");
      const dateRangeStr =
        startDay === endDay ? startDay : `${startDay}-${endDay}`;

      groups[monthYear].push({
        date: dateRangeStr,
        title: item.title,
        time: item.time
          ? `${item.time} | Lokasi: ${item.location}`
          : `Lokasi: ${item.location}`,
        description: item.description,
      });
    });

    return Object.keys(groups).map((month) => ({
      month,
      events: groups[month],
    }));
  });

  return {
    rawAgendas,
    groupedAgenda,
  };
};
