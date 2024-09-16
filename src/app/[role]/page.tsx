import { notFound } from "next/navigation";

export default function Page({ params }: { params: { role: string } }) {
  const roles = ["farmer", "sprayer", "receptionist"];
  console.log(params.role);
  if (!roles.includes(params.role)) {
    notFound();
  }
}
