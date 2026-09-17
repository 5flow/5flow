interface InlineHighlightProps {
  children: React.ReactNode;
  className?: string;
}

const InlineHighlight = ({ children, className }: InlineHighlightProps) => {
  const base = 'bg-accent1 text-background relative inline box-decoration-clone px-1';
  return <span className={`${base}${className ? ` ${className}` : ''}`}>{children}</span>;
};

export default InlineHighlight;
