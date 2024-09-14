import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { feedbackCreateSchema, FeedbackCreateType } from "@/schema";
import { feedbacks, FeedbackType } from "@/types/feedback-type";
import { giveFeedback } from "@/actions/feedback";
import { IOrder } from "@/models/Order";
import { useUserStore } from "@/store/user-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MAX_CHARACTERS = 500;

interface FeedbackFormProps {
  order: IOrder;
}

const FeedbackForm = ({ order }: FeedbackFormProps) => {
  const { currentUser } = useUserStore();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<FeedbackCreateType>({
    resolver: zodResolver(feedbackCreateSchema),
    defaultValues: {
      content: "",
      satisfactionRating: FeedbackType.NEUTRAL,
      attentive: 3,
      friendly: 3,
      professional: 3,
    },
  });

  const onSubmit = (data: FeedbackCreateType) => {
    setIsCreating(true);
    const createFeedback = giveFeedback(
      { ...data },
      order.id,
      currentUser?.accessToken!,
    );
    toast.promise(createFeedback, {
      loading: "Creating your order...",
      success: () => {
        router.push("/orders");
        return `Order has been created successfully.`;
      },
      error: () => {
        setIsCreating(false);
        return "Failed to create order";
      },
    });
  };

  const contentLength = form.watch("content")?.length || 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Feedback Content</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Please provide your feedback here..."
                    {...field}
                    className="min-h-[100px]"
                    maxLength={MAX_CHARACTERS}
                  />
                  <Badge
                    className="absolute bottom-0 right-0 bg-gray-200 m-2 text-gray-700"
                    variant="secondary"
                  >
                    {contentLength}/{MAX_CHARACTERS}
                  </Badge>
                </div>
              </FormControl>
              <FormDescription>
                Share your thoughts about our service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="satisfactionRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overall Satisfaction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your overall satisfaction" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {feedbacks.map((feedback) => (
                    <SelectItem key={feedback.value} value={feedback.value}>
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-2 ${feedback.classes}`}
                      >
                        <feedback.LucideIcon />
                        {feedback.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attentive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attentiveness</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>
                Rate from 1 (least attentive) to 5 (most attentive)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="friendly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Friendliness</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>
                Rate from 1 (least friendly) to 5 (most friendly)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="professional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professionalism</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>
                Rate from 1 (least professional) to 5 (most professional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isCreating}>
          Submit Feedback
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
