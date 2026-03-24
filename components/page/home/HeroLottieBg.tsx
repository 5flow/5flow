'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import HeroBg from './HeroBg';

const TOTAL_FRAMES = 61;
const SKIP_INITIAL_FRAMES = 5;
const INTRO_DURATION_MS = 2000;

const getFrameSrc = (frame: number) =>
  `/landing%20commence/landing%20commence%20new_${String(frame).padStart(5, '0')}.webp`;

const HeroLottieBg = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [mode, setMode] = useState<'loading' | 'playing' | 'finished' | 'scrub'>('loading');
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMq = window.matchMedia('(max-width: 767px)');

    const syncReduced = () => setReduced(reducedMq.matches);
    const syncMobile = () => setIsMobile(mobileMq.matches);

    syncReduced();
    syncMobile();

    reducedMq.addEventListener?.('change', syncReduced);
    mobileMq.addEventListener?.('change', syncMobile);

    return () => {
      reducedMq.removeEventListener?.('change', syncReduced);
      mobileMq.removeEventListener?.('change', syncMobile);
    };
  }, []);

  const frameIndices = useMemo(() => {
    const allFrames = Array.from({ length: TOTAL_FRAMES }, (_, index) => index).slice(SKIP_INITIAL_FRAMES);
    if (!isMobile) return allFrames;

    const mobileFrames = allFrames.filter(index => index % 2 === 0);
    if (mobileFrames[mobileFrames.length - 1] !== TOTAL_FRAMES - 1) {
      mobileFrames.push(TOTAL_FRAMES - 1);
    }
    return mobileFrames;
  }, [isMobile]);

  useEffect(() => {
    if (reduced) {
      setCurrentFrame(frameIndices[frameIndices.length - 1]);
      setReady(true);
      setFirstFrameLoaded(true);
      setMode('scrub');
      return;
    }

    let mounted = true;
    let loaded = 0;

    setReady(false);
    setFirstFrameLoaded(false);
    setMode('loading');
    framesRef.current = [];

    const frames = frameIndices.map(frameNumber => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = getFrameSrc(frameNumber);
      img.onload = () => {
        loaded += 1;
        if (!mounted) return;

        if (frameNumber === frameIndices[0]) {
          setCurrentFrame(frameNumber);
          setReady(true);
          setFirstFrameLoaded(true);
        }

        if (loaded === frameIndices.length) {
          framesRef.current = frames;
          setMode('playing');
        }
      };
      return img;
    });

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameIndices, reduced]);

  useEffect(() => {
    if (mode !== 'playing' || reduced) return;

    const start = performance.now();
    const lastFrameIndex = frameIndices.length - 1;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / INTRO_DURATION_MS, 1);
      const sequenceIndex = Math.min(Math.floor(progress * lastFrameIndex), lastFrameIndex);
      setCurrentFrame(frameIndices[sequenceIndex]);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrentFrame(frameIndices[lastFrameIndex]);
        setMode('finished');
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameIndices, mode, reduced]);

  useEffect(() => {
    if (mode === 'loading') return;

    let ticking = false;
    const lastFrameIndex = frameIndices.length - 1;
    const SCROLL_FINISH_THRESHOLD = 0.95;
    const MIN_SCRUB_FRAME = Math.min(5, lastFrameIndex); // avoid earliest frames where gaps are most visible

    const calcProgress = () => {
      const el = containerRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const scrolled = Math.min(Math.max(vh - rect.top, 0), total);
      return Math.min(Math.max(scrolled / total, 0), 1);
    };

    const update = () => {
      ticking = false;
      const progress = calcProgress();

      // Keep final animation done frame once user moves out; avoid bounce to early frames that show gaps.
      if (mode === 'finished' && progress >= SCROLL_FINISH_THRESHOLD) {
        setCurrentFrame(frameIndices[lastFrameIndex]);
        return;
      }

      if (progress >= SCROLL_FINISH_THRESHOLD) {
        setCurrentFrame(frameIndices[lastFrameIndex]);
        if (mode !== 'finished') setMode('finished');
        return;
      }

      const sequenceIndex = Math.floor((1 - progress) * lastFrameIndex);
      const clampedIndex = Math.min(Math.max(sequenceIndex, MIN_SCRUB_FRAME), lastFrameIndex);
      setCurrentFrame(frameIndices[clampedIndex]);
      if (mode !== 'scrub') setMode('scrub');
    };

    const onScroll = () => {
      if (mode === 'playing') {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (mode === 'scrub') {
      requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [frameIndices, mode]);

  const showTileBackground = !firstFrameLoaded || mode === 'loading';

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10">
      {showTileBackground && (
        <HeroBg
          defaultColor="#ffffff"
          tileColors={[
            [undefined, undefined, undefined, '#D1DAFD', 'var(--accent1)', 'var(--success)', 'var(--primary)'],
            [undefined, undefined, undefined, undefined, '#D1DAFD', 'var(--accent2)', 'var(--success)', 'var(--primary)'],
            [undefined, undefined, undefined, undefined, '#D1DAFD', 'var(--accent1)', 'var(--accent2)', 'var(--primary)'],
            [undefined, undefined, undefined, '#D1DAFD', '#D1DAFD', '#D1DAFD', 'var(--accent1)', 'var(--primary)'],
          ]}
        />
      )}

      {firstFrameLoaded && (
        <div className="absolute inset-0 -mt-22 overflow-hidden">
          <img
            src={getFrameSrc(currentFrame)}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      )}
    </div>
  );
};

export default HeroLottieBg;
