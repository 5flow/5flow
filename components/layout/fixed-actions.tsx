'use client';

import Link from '@/components/core/localized-link';
import { Mail, ArrowUp, PersonStanding } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Button } from '@/components/ui/button';

export function FixedActions() {
  const lenis = useLenis();
  const handleScrollTop = () => {
    const instance = lenis as unknown as
      | { scrollTo?: (to: number, opts?: { immediate?: boolean }) => void }
      | null
      | undefined;

    if (instance && typeof instance.scrollTo === 'function') {
      instance.scrollTo(0, { immediate: true });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="fixed top-1/2 right-0 z-50 flex -translate-y-1/2 flex-col gap-2">
      <Link href="/contact">
        <Button
          asChild
          aria-label="Email us"
          title="Email us"
          className="bg-success text-foreground hover:bg-success/90 size-16 rounded-none"
        >
          <Mail className="size-8" />
        </Button>
      </Link>
      <Button
        aria-label="Scan Eye"
        title="Scan Eye"
        className="bg-primary text-background hover:bg-primary/90 size-16 rounded-none"
      >
        <PersonStanding className="size-8" />
      </Button>
      <Button
        aria-label="Scroll to top"
        title="Scroll to top"
        className="bg-accent1 text-background hover:bg-accent1/90 size-16 rounded-none"
        onClick={handleScrollTop}
      >
        <ArrowUp className="size-8" />
      </Button>
    </div>
  );
}

export default FixedActions;
