import * as React from 'react';
import { cn } from '@/lib/utils';

interface PlasticCardProps {
  className?: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  variant?: 'gold' | 'navy';
}

export function PlasticCard({
  className,
  cardNumber = '•••• •••• •••• 8472',
  cardHolder = 'MEMBER NAME',
  expiryDate = '12/28',
  variant = 'gold',
}: PlasticCardProps) {
  const isGold = variant === 'gold';
  const cardRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState('');
  const [glare, setGlare] = React.useState({ x: 50, y: 50, opacity: 0, angle: 135 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const pageX = e.clientX;
    const pageY = e.clientY;

    const offsetX = 0.52 - (pageX - rect.left) / w;
    const offsetY = 0.52 - (pageY - rect.top) / h;

    const dy = (pageY - rect.top) - h / 2;
    const dx = (pageX - rect.left) - w / 2;

    const wMultiple = 320 / w;
    const yRotate = (offsetX - dx) * (0.03 * wMultiple);
    const xRotate = (dy - offsetY) * (0.04 * wMultiple);

    const arad = Math.atan2(dy, dx);
    const angle = (arad * 180 / Math.PI - 90 + 360) % 360;

    // Holographic opacity - stronger at edges, dynamic with movement
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = Math.sqrt((w / 2) * (w / 2) + (h / 2) * (h / 2));
    const edgeFactor = distanceFromCenter / maxDistance;
    const baseOpacity = 0.3 + edgeFactor * 0.4; // 0.3 to 0.7 range

    setTransform(`rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlare({
      x: offsetX * 100,
      y: offsetY * 100,
      opacity: baseOpacity,
      angle,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('');
    setGlare({ x: 50, y: 50, opacity: 0, angle: 135 });
  };

  React.useEffect(() => {
    if (wrapperRef.current) {
      const w = wrapperRef.current.clientWidth || wrapperRef.current.offsetWidth || wrapperRef.current.scrollWidth;
      wrapperRef.current.style.transform = `perspective(${w * 3}px)`;
    }
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[420px] mx-auto" style={{ transformStyle: 'preserve-3d' }}>
      {/* Shadow layer */}
      <div
        className={cn(
          'absolute rounded-2xl transition-all duration-200 pointer-events-none',
          isHovered
            ? 'top-[5%] left-[5%] w-[90%] h-[90%] shadow-[0_45px_100px_rgba(14,21,47,0.4),0_16px_40px_rgba(14,21,47,0.4)]'
            : 'top-[5%] left-[5%] w-[90%] h-[90%] shadow-[0_8px_30px_rgba(14,21,47,0.6)]'
        )}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      className={cn(
        'relative aspect-[1.586/1] w-full rounded-2xl p-6 sm:p-8',
        'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_8px_16px_-8px_rgba(0,0,0,0.4),0_0_0_1px_rgba(201,162,78,0.25),0_0_30px_-5px_rgba(201,162,78,0.2)]',
        isGold
          ? 'bg-gradient-to-br from-[#0a0f1a] via-[#0d1219] to-[#050810] border border-primary/30'
          : 'bg-gradient-to-br from-[#0a0f1a] via-[#0d1219] to-[#050810]',
        className
      )}
      style={{
        transform: transform || 'rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d',
        transition: transform ? 'transform 0.1s ease-out' : 'transform 0.2s ease-out',
      }}
    >
      {/* Holographic foil effect - color shifts with angle */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-100"
        style={{
          background: `linear-gradient(${glare.angle}deg,
            rgba(201, 162, 78, ${glare.opacity * 0.4}) 0%,
            rgba(255, 215, 120, ${glare.opacity * 0.3}) 20%,
            rgba(201, 162, 78, ${glare.opacity * 0.5}) 40%,
            rgba(255, 255, 255, ${glare.opacity * 0.2}) 50%,
            transparent 80%)`,
          opacity: glare.opacity > 0 ? 1 : 0,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Subtle metallic base shimmer */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(201, 162, 78, 0.15) 50%, transparent 100%)',
        }}
      />

      {/* Subtle noise texture for premium tactile feel */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]" />

      {/* Chip */}
      <div className="relative mb-6 sm:mb-8 flex items-start justify-between">
        <div
          className={cn(
            'size-12 rounded-lg border backdrop-blur-sm',
            isGold
              ? 'bg-gradient-to-br from-primary/15 via-primary/8 to-primary/5 border-primary/50 shadow-[0_2px_8px_rgba(201,162,78,0.2)]'
              : 'bg-gradient-to-br from-blue-200/20 to-blue-600/20 border-white/30'
          )}
        >
          {/* Chip pattern */}
          <svg
            viewBox="0 0 48 48"
            className="size-full p-2"
            fill="none"
          >
            <rect
              x="8"
              y="8"
              width="32"
              height="32"
              rx="4"
              className={isGold ? 'stroke-primary/60' : 'stroke-white/60'}
              strokeWidth="1.5"
            />
            <path
              d="M16 8v32M24 8v32M32 8v32M8 16h32M8 24h32M8 32h32"
              className={isGold ? 'stroke-primary/40' : 'stroke-white/40'}
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Contactless indicator */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            'size-8',
            isGold ? 'text-primary/70' : 'text-white/70'
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 2a9 9 0 0 1 9 9" />
          <path d="M12 6a5 5 0 0 1 5 5" />
          <path d="M12 10a1 1 0 0 1 1 1" />
        </svg>
      </div>

      {/* Card number */}
      <div
        className={cn(
          'relative mb-6 sm:mb-8 font-mono text-lg sm:text-2xl font-semibold tracking-wider',
          'text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.2)]'
        )}
      >
        {cardNumber}
      </div>

      {/* Cardholder and expiry */}
      <div className="relative flex items-end justify-between gap-4 z-10">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-wider text-white/60">
            Card Holder
          </div>
          <div
            className={cn(
              'text-sm sm:text-base font-semibold uppercase tracking-wide text-white truncate',
              isGold && 'text-primary drop-shadow-[0_0_8px_rgba(201,162,78,0.4)]'
            )}
          >
            {cardHolder}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-[10px] font-medium uppercase tracking-wider text-white/60">
            Expires
          </div>
          <div className="font-mono text-sm font-semibold text-white">
            {expiryDate}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
