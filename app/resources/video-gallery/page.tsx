import { Contact } from '@/components/layout';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/resources/Hero';
import FilterSection from '@/components/page/resources/FilterSection';

export default function VideoGallery() {
  const tabsData = [
    {
      value: 'product-demos',
      label: 'Product demos',
      icon: 'play',
      items: [
        {
          title: 'Demo: Quick Overview',
          desc: '5:12',
          image: '/product/rectangle.png',
          link: '/videos/product-demos/1',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Demo: Feature Deep Dive',
          desc: '8:24',
          image: '/product/rectangle.png',
          link: '/videos/product-demos/2',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Demo: Admin Walkthrough',
          desc: '6:40',
          image: '/product/rectangle.png',
          link: '/videos/product-demos/3',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Demo: Integration Tour',
          desc: '7:03',
          image: '/product/rectangle.png',
          link: '/videos/product-demos/4',
          buttonLabel: 'Watch Now',
        },
      ],
    },
    {
      value: 'customer-success',
      label: 'Customer success',
      icon: 'users',
      items: [
        {
          title: 'Customer Story: Retailer X',
          desc: '4:50',
          image: '/product/rectangle.png',
          link: '/videos/customer-success/1',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Customer Story: Pharma Y',
          desc: '5:35',
          image: '/product/rectangle.png',
          link: '/videos/customer-success/2',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Customer Story: F&B Z',
          desc: '6:10',
          image: '/product/rectangle.png',
          link: '/videos/customer-success/3',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Customer Story: Beauty A',
          desc: '3:58',
          image: '/product/rectangle.png',
          link: '/videos/customer-success/4',
          buttonLabel: 'Watch Now',
        },
      ],
    },
    {
      value: 'thought-leadership',
      label: 'Thought leadership',
      icon: 'lightbulb',
      items: [
        {
          title: 'Best Practices: Packaging',
          desc: '9:12',
          image: '/product/rectangle.png',
          link: '/videos/thought-leadership/1',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Trends: Automation',
          desc: '7:45',
          image: '/product/rectangle.png',
          link: '/videos/thought-leadership/2',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Panel: Compliance Today',
          desc: '11:03',
          image: '/product/rectangle.png',
          link: '/videos/thought-leadership/3',
          buttonLabel: 'Watch Now',
        },
        {
          title: 'Roundtable: Integration',
          desc: '8:30',
          image: '/product/rectangle.png',
          link: '/videos/thought-leadership/4',
          buttonLabel: 'Watch Now',
        },
      ],
    },
  ];

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader cmsSlug="video-gallery" title="video gallery" />

        <div className="flex flex-col gap-32">
          <Hero
            title="Learn faster, watch smarter"
            subtitle="Short, sharp videos on product walkthroughs, customer stories, and industry best practices."
            buttonLabel="Watch Videos"
          />
          <FilterSection tabsData={tabsData} />

          <Contact leadingText="Experience the full " highlightedText="solutions" trailingText=" live" />
        </div>
      </div>
    </div>
  );
}
