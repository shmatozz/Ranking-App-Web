import {UserShort} from "@/entities/user";

export const getAvgRating = (members: UserShort[]): number => {
  const ratings = members.map((member: UserShort) => member.rating);

  return ratings.reduce( function( x, y ){ return x + y }) / ratings.length
}
