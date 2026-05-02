import { ChevronRight } from 'lucide-react';
import type { DialogContent, DialogSegment } from '../../types/game';
import './DialogBox.css';

export type DialogBoxProps = {
  content: DialogContent;
  onContinue?: () => void;
  continueLabel?: string;
  showCaret?: boolean;
};

function renderSegments(segments: DialogSegment[]) {
  return segments.map((seg, i) => {
    if (seg.kind === 'highlight') {
      return (
        <span key={i} className="dialog-box__highlight">
          {seg.value}
        </span>
      );
    }
    return <span key={i}>{seg.value}</span>;
  });
}

export function DialogBox({
  content,
  onContinue,
  continueLabel = 'Continuar',
  showCaret = true,
}: DialogBoxProps) {
  const badgeClass =
    content.speaker.tone === 'gold'
      ? 'dialog-box__badge dialog-box__badge--gold'
      : 'dialog-box__badge dialog-box__badge--neutral';

  return (
    <div className="dialog-box">
      <span className={badgeClass}>{content.speaker.label}</span>
      <div className="dialog-box__card">
        {showCaret && <span className="dialog-box__caret" aria-hidden="true" />}
        <p className="dialog-box__body">{renderSegments(content.segments)}</p>
        {onContinue && (
          <div className="dialog-box__footer">
            <button
              type="button"
              className="dialog-box__continue"
              onClick={onContinue}
            >
              {continueLabel}
              <ChevronRight size={18} aria-hidden="true" strokeWidth={2.25} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
