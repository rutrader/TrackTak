import dayjs from "dayjs";

export const noop = () => {};

export const customEventDate = dayjs().format("DD/MM/YYYY HH:mm");
