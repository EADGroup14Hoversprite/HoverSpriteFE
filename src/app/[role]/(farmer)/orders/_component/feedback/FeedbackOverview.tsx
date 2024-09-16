import { getFeedback } from "@/actions/feedback";
import React from "react";
import { imageLoader } from "@/utils/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { feedbacks } from "@/types/feedback-type";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

interface FeedbackOverviewProps {
  feedbackPromise: ReturnType<typeof getFeedback>;
}
export default function FeedbackOverview({
  feedbackPromise,
}: FeedbackOverviewProps) {
  const res = React.use(feedbackPromise);
  const feedback = res.feedbacks[0];
  const feedbackSatisfactoryValue = feedbacks.find(
    (f) => f.value === feedback.satisfactionRating,
  );
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Feedback's images</p>
        {feedback.imageUrls.length > 0 ? (
          <div className="grid grid-cols-2">
            {feedback.imageUrls.map((imageUrl) => {
              return (
                <Image
                  loader={imageLoader}
                  className="!relative rounded-xl"
                  alt={feedback.id.toString()}
                  src={imageUrl}
                  loading="lazy"
                  layout="fill"
                />
              );
            })}
          </div>
        ) : (
          <p>No images</p>
        )}
        <Separator />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Feedback's content</p>
        <p className="italic">{feedback.content}</p>
        <Separator />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold">Feedback's satisfactory</p>
        {feedbackSatisfactoryValue && (
          <Badge
            variant="outline"
            className={`flex items-center gap-2 ${feedbackSatisfactoryValue.classes}`}
          >
            <feedbackSatisfactoryValue.LucideIcon />
            {feedbackSatisfactoryValue.label}
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">
          Attentiveness {feedback.attentive} / 5
        </p>
        <Slider
          min={1}
          max={5}
          step={1}
          value={[feedback.attentive]}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">
          Friendliness {feedback.friendly} / 5
        </p>
        <Slider min={1} max={5} step={1} value={[feedback.friendly]} disabled />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">
          Professional {feedback.professional} / 5
        </p>
        <Slider
          min={1}
          max={5}
          step={1}
          value={[feedback.professional]}
          disabled
        />
      </div>
    </div>
  );
}
