import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Button } from '@/components/ui/button';
import { Contact } from '@/components/layout';
import PodcastVideoPopup from '@/components/page/resources/PodcastVideoPopup';

const spotifyHref = 'https://open.spotify.com/';

const topics = [
  'Why this AI shift is different from past technology cycles',
  'What AI changes day-to-day for artwork, brand, and compliance teams',
  'Whether AI will replace packaging jobs',
  'The two workflow problems 5FLOW is tackling first: briefing and QC',
  'Why “moving the bottleneck” isn’t the same as solving it',
  'A four-step model for AI adoption in the enterprise',
  'How mature the packaging industry actually is on AI today',
  'What 5FLOW is building, and the four principles behind',
];

function QuoteCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto my-14 aspect-[700/190] w-full max-w-[700px] md:my-20">
      <Image
        src="/resources/Quotes Placeholder Podcast.png"
        alt=""
        fill
        sizes="(min-width: 768px) 700px, 100vw"
        className="object-contain"
      />
      <blockquote className="font-heading relative z-10 flex h-full items-center px-[21%] pr-[7%] text-lg leading-snug font-bold tracking-tight md:text-[21px]">
        {children}
      </blockquote>
    </div>
  );
}

function SpotifyButton() {
  return (
    <Button
      asChild
      size="lg"
      className="group/spotify active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 transition-all duration-300 hover:gap-0 active:ring-2 active:ring-offset-2"
    >
      <Link href={spotifyHref} target="_blank" rel="noopener noreferrer">
        <span className="bg-primary inline-flex h-[46px] w-[174px] items-center gap-2 px-3 text-white transition-all duration-300 group-hover/spotify:px-4">
          <Image
            src="/resources/spotify-logo.svg"
            width={36}
            height={36}
            alt=""
            aria-hidden="true"
            className="h-[35px] w-[35px] shrink-0"
          />
          <span className="flex flex-col items-start leading-none">
            <span className="text-[16px] leading-[0.8] font-semibold">Listen on</span>
            <span className="text-[22px] leading-[0.78] font-bold text-[#32D430]">Spotify</span>
          </span>
        </span>
        <span
          className="bg-primary text-primary-foreground inline-flex h-[46px] w-[46px] items-center justify-center"
          aria-hidden="true"
        >
          <Play className="h-6 w-6 fill-current" />
        </span>
      </Link>
    </Button>
  );
}

export default function EpisodeOnePage() {
  return (
    <div className="font-heading relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-0">
        <FullBleedLines className="mt-32 flex w-full justify-end gap-8 md:mt-50">
          <b className="text-foreground text-4xl leading-none tracking-tight md:text-5xl">podcast</b>
          <div className="bg-primary h-10 w-10" />
        </FullBleedLines>

        <section className="mt-16 md:mt-24">
          <FullBleedLines>
            <article className="grid items-start overflow-hidden rounded-2xl border md:grid-cols-[1.55fr_1fr]">
              <PodcastVideoPopup />

              <div className="flex flex-col items-start gap-3 p-5 md:p-6">
                <div>
                  <p className="text-lg tracking-tight font-bold">Episode 01</p>
                  <h1 className="mt-1 text-3xl leading-[0.96] font-bold tracking-tight md:text-4xl">
                    Rebuilding packaging workflows with AI
                  </h1>
                </div>

                <p className="font-body text-base leading-snug tracking-tight md:text-xl">
                  with Sriram Upadhyayula
                  <br />
                  [Chief Technology Officer 5Flow]
                </p>

                <p className="font-body text-sm leading-relaxed tracking-tight md:text-base">
                  In the first episode of Under Review, Sriram Upadhyayula, CTO of Propelis and president of 5FLOW,
                  argues that AI has already changed the packaging and branding industry, and that the gap between
                  leaders and laggards is widening by the day. His core point is that the value of AI doesn&apos;t
                  come from adopting tools, but from rebuilding workflows around them. For packaging, brand, and
                  artwork teams, that means AI taking over the repetitive, “dirty work” (structuring messy briefs,
                  cleaning files, manual QC) so people can focus on strategic work instead.
                </p>

                <SpotifyButton />
              </div>
            </article>
          </FullBleedLines>
        </section>

        <main className="mx-auto max-w-6xl py-16 md:py-24">
          <article className="font-body space-y-14 text-sm leading-5 tracking-tight md:text-[20px] md:leading-[28px]">
            <section>
              <h2 className="font-heading text-xl font-bold tracking-tight md:text-2xl">Topics discussed:</h2>
              <ul className="mt-5 list-disc space-y-2 pl-6">
                {topics.map(topic => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold md:text-2xl">Why is this AI shift different from past technology cycles?</h2>
              <div className="mt-5 space-y-4">
                <p>
                  Sriram has spent 25 years leading digital transformation, data, and AI projects for Fortune 500
                  companies, and he frames the current moment as bigger than any technology cycle he&apos;s worked
                  through.
                </p>
                <p>
                  AI, he says, is starting to reshape how organizations operate, compete, and create value, and the
                  distance between the companies acting on it and the ones waiting is expanding daily.
                </p>
                <p>
                  His advice to teams sitting on the fence is blunt: don&apos;t wait for the perfect moment or
                  perfect clarity because starting, in packaging specifically, even small improvements across the
                  lifecycle compound into a large impact at scale, which is why the cost of waiting is higher than it
                  looks.
                </p>
              </div>
            </section>

            <QuoteCallout>
              “The shift isn&apos;t coming anymore. It is already here.
              <br />
              We need to move now.”
            </QuoteCallout>

            <section>
              <h2 className="font-heading text-xl font-bold md:text-2xl">What does AI actually change for packaging and brand teams?</h2>
              <div className="mt-5 space-y-4">
                <p>
                  The biggest near-term shift, according to Sriram, is the removal of friction that artwork
                  operators, project managers, compliance managers, and QC analysts deal with every day. A large
                  share of their time goes to work they shouldn&apos;t have to do, such as reorganizing briefs that
                  arrive in inconsistent formats, hunting for and cleaning files, or bridging systems that were
                  never built to talk to each other.
                </p>
                <p>
                  His framing is that AI is an opportunity rather than a threat: it strips out that grunt work and
                  gives people their time back for strategic thinking. He returns to a line he likes as the clearest
                  way to settle the fear about job loss.
                </p>
              </div>
            </section>

            <QuoteCallout>“AI will not replace people. People who use AI will replace people who don&apos;t use AI.”</QuoteCallout>

            <section>
              <h2 className="font-heading text-xl font-bold md:text-2xl">Which workflow problems is 5FLOW solving with AI first?</h2>
              <div className="mt-5 space-y-4">
                <p>
                  Sriram points to two concrete bottlenecks. The first is briefing: client briefs arrive as Word
                  documents, templates, emails, and other unstructured formats, and the nuance gets lost or
                  re-interpreted person by person. AI can ingest those briefs, structure them, and pass clear
                  instructions downstream so everyone is working from the same understanding.
                </p>
                <p>
                  The second is quality control. When a regulation changes, hundreds of SKUs may need updating, and
                  each one has to be checked. Today, that is done largely by hand. That manual QC is the biggest
                  bottleneck in moving a brand from idea to shelf, which is why 5FLOW is building AI-assisted QC to
                  speed it up.
                </p>
                <p>
                  He&apos;s also clear that point fixes aren&apos;t enough. If one team adopts AI and produces
                  content five times faster while the next team still reviews everything manually, the end-to-end
                  process hasn&apos;t improved: the bottleneck has simply moved from step one to step two. The real
                  gain comes from reimagining the workflow as AI-native, end to end.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold md:text-2xl">What does AI adoption actually look like in practice?</h2>
              <div className="mt-5 space-y-4">
                <p>
                  Adoption starts slow, Sriram says, but it follows a hockey-stick curve once AI is embedded in the
                  workflow and people see bottlenecks disappear. He lays out a four-step path: first, give people AI
                  as a standalone tool to get comfortable and remove the fear; second, integrate AI into the workflow
                  so it&apos;s seamless rather than optional; third, move to AI-led but human-governed operations,
                  where the real value at scale appears; and fourth, do it faster still, freeing people almost
                  entirely for strategic work. Most organizations, he estimates, are somewhere between steps one and
                  two.
                </p>
                <p>
                  He grounds this in a recent example from Propelis. After rolling out Copilot with 1,000 enterprise
                  licenses to employees worldwide, teams built 100 agents within four weeks, saving close to 6,000
                  hours and delivering an estimated half a million dollars in impact, all before any formal
                  methodology was in place. In his view, adoption itself isn&apos;t the obstacle: the only real
                  barrier is the initial inertia of trying something new.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold md:text-2xl">How mature is the packaging industry on AI right now?</h2>
              <div className="mt-5 space-y-4">
                <p>
                  Most companies are still early, Sriram says. He describes a landscape of ad hoc AI usage, missing
                  governance, no shared workflow, and fragmented adoption, with many employees deploying tools on
                  their own while their organizations lack a mandate, security oversight, or any way to measure
                  impact. That governance gap is the piece most often missing.
                </p>
                <p>
                  His message to anyone still unsure how seriously to take this is that the question has already been
                  answered. AI is changing the industry whether or not a given company participates; the only real
                  decision left is whether you actively shape how it affects your business.
                </p>
              </div>
            </section>

            <QuoteCallout>
              “Being an AI company isn&apos;t about throwing a pile of tools at the problem. It&apos;s about building
              closed-loop intelligence so that every job done is better than the one before it.”
            </QuoteCallout>

            <section>
              <h2 className="font-heading text-xl font-bold md:text-2xl">What is 5FLOW building?</h2>
              <div className="mt-5 space-y-4">
                <p>
                  5FLOW&apos;s product thinking runs on four principles, which Sriram sums up as augment, automate,
                  accelerate, and differentiate: Are we augmenting people with new capabilities? Automating a
                  repetitive process? Accelerating execution? Or differentiating with proprietary solutions in the
                  market? The team applies that lens to every bottleneck across the packaging workflow lifecycle.
                </p>
                <p>
                  He also makes the case for agentic AI as the unlock for scale. Where individual AI tools used to
                  each do a single job in isolation, agentic development connects multiple tools and systems into one
                  ecosystem, letting companies leapfrog and set up for scale. Pilots alone, he argues, don&apos;t
                  deliver value; the value shows up when you scale. His closing view is that the future belongs not
                  to the companies experimenting, but to the ones that figure it out and scale.
                </p>
              </div>
            </section>
          </article>
        </main>

        <section className="pb-24 md:pb-40">
          <Contact headingWrapperClassName="hidden" />
        </section>
      </div>
    </div>
  );
}
