import type { LucideIcon } from 'lucide-react';
import './TopBar.css';

export type TopBarAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
};

type TopBarProps = {
  left?: TopBarAction[];
  right?: TopBarAction[];
  iconSize?: number;
};

// Iconos en las esquinas superiores del Stage. Se posicionan absolute
// dentro de .stage-frame, así que TopBar debe ser hijo directo del Stage.
export function TopBar({ left = [], right = [], iconSize = 24 }: TopBarProps) {
  return (
    <>
      {left.length > 0 && (
        <div className="top-bar top-bar--left">
          {left.map((action) => (
            <ActionButton key={action.id} action={action} iconSize={iconSize} />
          ))}
        </div>
      )}
      {right.length > 0 && (
        <div className="top-bar top-bar--right" aria-label="Accesos rápidos">
          {right.map((action) => (
            <ActionButton key={action.id} action={action} iconSize={iconSize} />
          ))}
        </div>
      )}
    </>
  );
}

function ActionButton({ action, iconSize }: { action: TopBarAction; iconSize: number }) {
  const Icon = action.icon;
  return (
    <button
      className="top-bar__btn"
      aria-label={action.label}
      onClick={action.onClick}
      type="button"
    >
      <Icon size={iconSize} />
    </button>
  );
}
