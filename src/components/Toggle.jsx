import React, { useId } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/toggle.css';

/**
 * Toggle — a styled checkbox rendered as a slide switch.
 *
 * Props:
 *   checked   – boolean (controlled)
 *   onChange  – (e) => void
 *   disabled  – boolean
 *   size      – 'sm' | 'md' | 'lg'  (default: 'md')
 *   label     – string | ReactNode shown beside the toggle
 *   labelPosition – 'left' | 'right'  (default: 'right')
 *   id        – optional id; auto-generated if omitted
 *   className – extra classes on the root element
 */
export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  labelPosition = 'right',
  id: idProp,
  className = '',
  ...rest
}) {
  const autoId = useId();
  const id = idProp ?? autoId;

  const rootClasses = [
    'ds-toggle',
    size !== 'md' ? `ds-toggle--${size}` : '',
    disabled ? 'ds-toggle--disabled' : '',
    label ? 'ds-toggle--labeled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const track = (
    <span className="ds-toggle__track" aria-hidden="true">
      <span className="ds-toggle__thumb" />
    </span>
  );

  return (
    <label className={rootClasses} htmlFor={id}>
      {label && labelPosition === 'left' && (
        <span className="ds-toggle__label">{label}</span>
      )}

      <input
        type="checkbox"
        id={id}
        className="ds-toggle__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {track}

      {label && labelPosition === 'right' && (
        <span className="ds-toggle__label">{label}</span>
      )}
    </label>
  );
}

Toggle.propTypes = {
  checked:       PropTypes.bool,
  onChange:      PropTypes.func,
  disabled:      PropTypes.bool,
  size:          PropTypes.oneOf(['sm', 'md', 'lg']),
  label:         PropTypes.node,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  id:            PropTypes.string,
  className:     PropTypes.string,
};
