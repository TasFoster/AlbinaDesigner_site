export const stats = [
  { label: "Новые заявки", value: "7", trend: "+3 за неделю", direction: "up" },
  { label: "Заявки за месяц", value: "24", trend: "+18%", direction: "up" },
  { label: "Черновики блога", value: "3", trend: "без изменений", direction: "flat" },
  { label: "Просмотры сайта", value: "1 284", trend: "-4% за неделю", direction: "down" },
];

export const statusColors = {
  "новая": "#c5432c",
  "в работе": "#dda63f",
  "подтверждена": "#7a7233",
  "завершена": "#3c332c",
  "отменена": "#a89b8b",
};

export const leads = [
  { name: "Марина К.", service: "Капсула онлайн", date: "16.08.2026", phone: "+7 900 ····-45-12", status: "новая" },
  { name: "Ольга П.", service: "Сопровождение на шопинг", date: "15.08.2026", phone: "+7 903 ····-21-08", status: "в работе" },
  { name: "Наталья С.", service: "Шоп-тур", date: "12.08.2026", phone: "+7 917 ····-90-33", status: "подтверждена" },
  { name: "Ирина В.", service: "Капсула онлайн", date: "10.08.2026", phone: "+7 926 ····-77-51", status: "завершена" },
  { name: "Светлана Р.", service: "Сопровождение на шопинг", date: "08.08.2026", phone: "+7 985 ····-14-60", status: "отменена" },
];

export const adminServices = [
  { title: "Капсула онлайн", price: "3 000 ₽" },
  { title: "Сопровождение на шопинг", price: "5 000 ₽ / час" },
  { title: "Шоп-тур", price: "от 30 000 ₽" },
];

export const blogDrafts = [
  { title: "Как фотографировать примерочную для соцсетей", updated: "14.08.2026", status: "черновик" },
  { title: "Осенняя капсула: с чего начать", updated: "10.08.2026", status: "черновик" },
  { title: "Почему я не ищу вдохновение в трендах", updated: "12.08.2026", status: "опубликовано" },
];
