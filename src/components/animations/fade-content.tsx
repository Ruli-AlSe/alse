'use client';

// Imported from: https://www.reactbits.dev/

import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

import { FadeContentProps } from '@/interfaces/animations';

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  config = { tension: 50, friction: 25 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  className = '',
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const directions: Record<'vertical' | 'horizontal', string> = {
    vertical: 'Y',
    horizontal: 'X',
  };

  const springProps = useSpring({
    from: {
      transform: `translate${directions[direction]}(${
        reverse ? `-${distance}px` : `${distance}px`
      }) scale(${scale})`,
      opacity: animateOpacity ? initialOpacity : 1,
    },
    to: inView ? { transform: 'translateY(0px) scale(1)', opacity: 1 } : undefined,
    config,
  });

  return (
    // @ts-expect-error - TODO: Fix this
    <animated.div ref={ref} style={springProps}>
      <div className={className}>{children}</div>
    </animated.div>
  );
};

export default FadeContent;
