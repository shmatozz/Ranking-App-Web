import {UserShort} from "@/entities/user";

export const getAvgRating = (members: UserShort[]): number | string => {
  if (members.length === 0) {
    return "-";
  }

  const sum = members.reduce((total, member) => total + member.rating, 0);
  return sum / members.length;
};
