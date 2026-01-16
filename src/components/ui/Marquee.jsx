import { cn } from '../../utils/cn'

export function Marquee({
  children,
  className,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
}) {
  const animationStyle = {
    animationDuration: `${speed}s`,
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
  }

  return (
    <div
      className={cn(
        'marquee',
        pauseOnHover && '[&:hover_.marquee-content]:pause',
        className
      )}
    >
      <div className="marquee-content" style={animationStyle}>
        {children}
      </div>
      <div className="marquee-content" aria-hidden="true" style={animationStyle}>
        {children}
      </div>
    </div>
  )
}
