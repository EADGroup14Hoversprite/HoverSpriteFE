import { FrownIcon, icons, MehIcon, SmileIcon } from "lucide-react";

export enum FeedbackType {
  VERY_UNSATISFIED = "VERY_UNSATISFIED",
  UNSATISFIED = "UNSATISFIED",
  NEUTRAL = "NEUTRAL",
  SATISFIED = "SATISFIED",
  VERY_SATISFIED = "VERY_SATISFIED",
}
const dictFeedbackString: Record<FeedbackType, string> = {
  VERY_UNSATISFIED: "Very unsatisfied",
  UNSATISFIED: "Unsatisfied",
  NEUTRAL: "Neutral",
  SATISFIED: "Satisfied",
  VERY_SATISFIED: "Very satisfied",
};

const toFeedbackString = (feedbackType: FeedbackType) => {
  return dictFeedbackString[feedbackType];
};
export const feedbacks = [
  {
    value: "VERY_UNSATISFIED",
    label: "Very Unsatisfied",
    classes: "border-red-400 text-red-700 bg-red-100",
    icon: "FrownIcon" as keyof typeof icons,
    LucideIcon: FrownIcon,
  },
  {
    value: "UNSATISFIED",
    label: "Unsatisfied",
    classes: "border-orange-400 text-orange-700 bg-orange-100",
    icon: "FrownIcon" as keyof typeof icons,
    LucideIcon: FrownIcon,
  },
  {
    value: "NEUTRAL",
    label: "Neutral",
    classes: "border-yellow-400 text-yellow-700 bg-yellow-100",
    icon: "MehIcon" as keyof typeof icons,
    LucideIcon: MehIcon,
  },
  {
    value: "SATISFIED",
    label: "Satisfied",
    classes: "border-green-400 text-green-700 bg-green-100",
    icon: "SmileIcon" as keyof typeof icons,
    LucideIcon: SmileIcon,
  },
  {
    value: "VERY_SATISFIED",
    label: "Very Satisfied",
    classes: "border-emerald-400 text-emerald-700 bg-emerald-100",
    icon: "SmileIcon" as keyof typeof icons,
    LucideIcon: SmileIcon,
  },
];
