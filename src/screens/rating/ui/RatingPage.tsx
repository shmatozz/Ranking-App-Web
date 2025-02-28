import React from "react";
import {RatingsHeader, RatingsList} from "@/widgets/rating";

export const RatingPage = () => {
  return (
    <div className="content-container flex-col gap-4">
      <RatingsHeader/>
      <RatingsList/>
    </div>
  )
}
