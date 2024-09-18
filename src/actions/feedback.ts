import { IFeedback } from "@/models/Feedback";
import { FeedbackCreateType } from "@/schema";
import API from "@/utils/axiosClient";

const backendUrl = "http://localhost:8080";

export async function giveFeedback(
  value: FeedbackCreateType,
  orderId: number,
  accessToken: string,
) {
  try {
    const formData = new FormData();
    formData.append("content", value.content.toString());
    formData.append("satisfactionRating", value.satisfactionRating.toString());
    formData.append("attentive", value.attentive.toString());
    formData.append("friendly", value.friendly.toString());
    formData.append("professional", value.professional.toString());
    formData.append("orderId", orderId.toString());

    // Add images
    value.images.forEach((image, index) => {
      formData.append(`images`, image, `hehe-${index}`);
    });

    const res = await API.post<{ message: string; dto: IFeedback }>(
      `${backendUrl}/feedback`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (e) {
    throw new Error("Unable to create feedback");
  }
}

export async function getFeedback(orderId: number) {
  try {
    const res = await API.get<{ message: string; feedbacks: IFeedback[] }>(
      `/feedback?orderId=${orderId}`,
    );
    return res.data;
  } catch (e) {
    throw new Error("Unable to get feedback");
  }
}
