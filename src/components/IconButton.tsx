import Link from 'next/link';

interface IconButtonProps {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  external?: boolean;
}

export const IconButton = ({
  href,
  ariaLabel,
  icon,
  external = false,
}: IconButtonProps) => {
  const className =
    'flex size-12 items-center justify-center rounded-full border-2 border-borderSubtle bg-white text-textSecondary transition-all duration-200 hover:border-teal hover:text-teal hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white dark:hover:border-[#34D1AC] dark:hover:text-[#34D1AC]';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
      >
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {icon}
    </Link>
  );
};
