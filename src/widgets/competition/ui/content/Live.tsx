import React from "react";
import {useCompetitionStore} from "@/features/competition/get";
import {getEmbedStreamUrl} from "@/shared/lib";

export const Live = () => {
  const { competition } = useCompetitionStore();
  const streamUrl = competition?.videoLink;

  const embedUrl = streamUrl ? getEmbedStreamUrl(streamUrl) : null;

  return (
    <div className="flex flex-col items-center p-4">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          scrolling="no"
          height="378"
          width="620"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="rounded shadow-md w-full max-w-3xl aspect-video"
        />
      ) : (
        <div className="text-gray-500 text-center">
          {streamUrl
            ? "Невозможно встроить указанную трансляцию"
            : "Трансляция ещё не добавлена"}
        </div>
      )}
    </div>
  );
};
