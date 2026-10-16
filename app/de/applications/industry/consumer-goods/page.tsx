import { getPageMetadata } from '@/lib/cms/seo';
import { ConsumerGoodsPage, metadata as fallbackMetadata } from '@/app/applications/industry/consumer-goods/content';



export default function GermanConsumerGoods() {
  return <ConsumerGoodsPage cmsSlug="consumer-goods-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('consumer-goods-2', fallbackMetadata, 'de');
}
