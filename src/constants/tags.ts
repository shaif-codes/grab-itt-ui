import { orderStatus } from "./order";
export const TAGS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

const orderStatusTags = {
  [orderStatus.DELIVERED]: TAGS.SUCCESS,
  [orderStatus.PENDING]: TAGS.SECONDARY,
  [orderStatus.CANCELLED]: TAGS.ERROR,
} as const;

export const getOrderStatusTag = (status: keyof typeof orderStatus) => {
  return orderStatusTags[status];
};