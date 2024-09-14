import axios from "axios";
import { IFeedback } from "@/models/Feedback";
import { FeedbackCreateType } from "@/schema";

const backendUrl = "http://localhost:8080";

export async function giveFeedback(
  value: FeedbackCreateType,
  orderId: number,
  accessToken: string,
) {
  try {
    const res = await axios.post<{ message: string; dto: IFeedback }>(
      `${backendUrl}/feedback`,
      {
        ...value,
        orderId: orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (e) {
    throw new Error("Unable to create feedback");
  }
}
