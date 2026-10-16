import { getPageMetadata } from '@/lib/cms/seo';
import { FoodBeveragesPage, metadata as fallbackMetadata } from '@/app/applications/industry/food-beverages/content';



export default function GermanFoodBeverages() {
  return <FoodBeveragesPage cmsSlug="food-beverages-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('food-beverages-2', fallbackMetadata, 'de');
}
