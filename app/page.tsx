import { Contact } from '@/components/layout';
import Hero from '@/components/page/home/Hero';
import What from '@/components/page/home/What';
import How from '@/components/page/home/How';
import Why from '@/components/page/home/Why';
import Who from '@/components/page/home/Who';
import New from '@/components/page/home/New';
import InlineHighlight from '@/components/core/inline-highlight';
import type { Metadata } from 'next';
import { getHomepage } from '@/lib/cms/homepage';

export const metadata: Metadata = {
  title: 'Artwork Workflow Automation Platform | 5Flow',
  description:
    "Streamline packaging and creative operations with 5Flow's artwork workflow automation platform, enabling faster approvals, compliance tracking and collaboration.",
};
export default async function Home() {
  const cms = await getHomepage('home').catch(() => null);
  const whatItems = cms?.what?.items.map(item => ({
    title: item.title || '',
    desc: item.body_html || item.bodyHtml || '',
    sub: item.subtitle,
    iconKey: item.icon_key || item.iconKey,
  }));
  const howItems = cms?.how?.items.map(item => ({
    title: item.title || '',
    lead: item.subtitle,
    desc: item.body_html || item.bodyHtml || '',
    link: item.link_url || item.linkUrl || item.link || item.button_url || item.buttonUrl,
    iconKey: item.icon_key || item.iconKey,
  }));
  const whyCards = cms?.why?.items.map(item => ({
    title: item.title || '',
    subtitle: item.subtitle,
    bodyHtml: item.body_html || item.bodyHtml,
    buttonText: item.button_text || item.buttonText,
    link: item.link_url || item.linkUrl || '/ai-solutions',
    iconKey: item.icon_key || item.iconKey,
  }));

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <Hero
          title={cms?.hero?.title}
          subTitle={cms?.hero?.subtitle}
          bodyHtml={cms?.hero?.bodyHtml}
          buttonText={cms?.hero?.ctaText}
          buttonUrl={cms?.hero?.ctaUrl}
        />
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-20">
          <What
            title={cms?.what?.title}
            subtitle={cms?.what?.subtitle}
            description={cms?.what?.description}
            imageUrl={cms?.what?.imageUrl}
            ctaTitle={cms?.what?.ctaTitle}
            ctaText={cms?.what?.ctaText}
            items={whatItems}
          />
        </div>
      </div>

      <div className="bg-primary/5 pb-10">
        <div className="container mx-auto">
          <How title={cms?.how?.title} subtitle={cms?.how?.subtitle} desc={cms?.how?.bodyHtml} items={howItems} />
        </div>
      </div>

      <div className="container mx-auto mb-12">
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-32">
          <Why
            title={cms?.why?.title}
            highlight={cms?.why?.highlight}
            bodyHtml={cms?.why?.bodyHtml}
            imageUrl={cms?.why?.imageUrl}
            cards={whyCards}
          />
          <Who
            title={cms?.who?.title || 'Trusted by packaging leaders'}
            clients={cms?.who?.clients.length ? cms.who.clients : undefined}
          />
          <New title={cms?.news?.title} description={cms?.news?.description} />
          <Contact
            heading={
              <>
                Ready for <InlineHighlight>better flow?</InlineHighlight>
              </>
            }
            subheading="Bring packaging to market. Without the chaos."
          />
        </div>
      </div>
    </div>
  );
}
