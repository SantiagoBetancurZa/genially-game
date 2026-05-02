import './TitleBlock.css';

export type TitleBlockProps = {
  title: string;
  rule?: boolean;
  subtitle?: string;
  subtitleStyle?: 'normal' | 'italic-small';
};

export function TitleBlock({
  title,
  rule = true,
  subtitle,
  subtitleStyle = 'normal',
}: TitleBlockProps) {
  const subClass =
    subtitleStyle === 'italic-small'
      ? 'title-block__subtitle title-block__subtitle--italic-small'
      : 'title-block__subtitle';

  return (
    <header className="title-block">
      <h1>{title}</h1>
      {rule && <span className="title-block__rule" aria-hidden="true" />}
      {subtitle && <p className={subClass}>{subtitle}</p>}
    </header>
  );
}
