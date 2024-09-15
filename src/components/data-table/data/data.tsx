import {
  Ban,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  Loader,
  UserCheck,
  X,
} from "lucide-react";

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    classes: "border-yellow-400 text-yellow-700 bg-yellow-100",
    icon: Clock,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    classes: "border-red-400 text-red-700 bg-red-100",
    icon: X,
  },
  {
    value: "confirmed",
    label: "Confirmed",
    classes: "border-green-400 text-green-700 bg-green-100",
    icon: Check,
  },
  {
    value: "assigned",
    label: "Assigned",
    classes: "border-blue-400 text-blue-700 bg-blue-100",
    icon: UserCheck,
  },
  {
    value: "in-progressed",
    label: "In Progress",
    classes: "border-purple-400 text-purple-700 bg-purple-100",
    icon: Loader,
  },
  {
    value: "completed",
    label: "Completed",
    classes: "border-teal-400 text-teal-700 bg-teal-100",
    icon: CheckCircle,
  },
];

export const paymentStatuses = [
  {
    value: true,
    label: "Paid",
    classes: "border-green-400 text-green-700 bg-green-100",
    icon: DollarSign,
  },
  {
    value: false,
    label: "Unpaid",
    classes: "border-red-400 text-red-700 bg-red-100",
    icon: Ban,
  },
];
// export const statuses = [
//     {
//         value: "backlog",
//         label: "Backlog",
//         icon: QuestionMarkCircledIcon,
//     },
//     {
//         value: "todo",
//         label: "Todo",
//         icon: CircleIcon,
//     },
//     {
//         value: "in progress",
//         label: "In Progress",
//         icon: StopwatchIcon,
//     },
//     {
//         value: "done",
//         label: "Done",
//         icon: CheckCircledIcon,
//     },
//     {
//         value: "canceled",
//         label: "Canceled",
//         icon: CrossCircledIcon,
//     },
// ]

// export const priorities = [
//   {
//     label: "Low",
//     value: "low",
//     icon: ArrowDownIcon,
//   },
//   {
//     label: "Medium",
//     value: "medium",
//     icon: ArrowRightIcon,
//   },
//   {
//     label: "High",
//     value: "high",
//     icon: ArrowUpIcon,
//   },
// ];
