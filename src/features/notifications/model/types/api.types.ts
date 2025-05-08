import {Notification} from "@/features/notifications";

export type NotificationsResponse = {
  status: number;
  data: Notification[]
}

export type DeleteNotificationByIdParams = {
  id: number
}


export type DeleteNotificationsParams = {
  ids: number[]
}
