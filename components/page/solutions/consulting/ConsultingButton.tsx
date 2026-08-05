import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ConsultingButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export default function ConsultingButton({
  href = '#consulting-contact',
  label = 'Talk to a consultant',
  className = '',
}: ConsultingButtonProps) {
  const targetHref = href === '/contact' ? '#consulting-contact' : href;

  return (
    <Button
      asChild
      className={`group/consulting-cta active:ring-primary/50 active:ring-offset-background font-body inline-flex origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 text-sm font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 has-[>svg]:px-0 ${className}`}
    >
      <Link href={targetHref}>
        <span className="bg-primary text-primary-foreground group-hover/consulting-cta:bg-primary/90 inline-flex h-10 items-center px-6 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/consulting-cta:px-7">
          {label}
        </span>
        <span
          className="bg-primary text-primary-foreground group-hover/consulting-cta:bg-primary/90 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </Button>
  );
}
