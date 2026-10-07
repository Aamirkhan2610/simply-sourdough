import { Brochure } from "@/components/home/Brochure";
import { getReviews } from "@/lib/store";

export default async function HomePage() {
  const reviews = await getReviews();
  return <Brochure reviews={reviews.filter((review) => review.featured)} />;
}
