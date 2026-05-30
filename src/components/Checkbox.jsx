import React, { useId } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/checkbox.css';

/* ============================================================
   Checkbox component — consumes CSS variable tokens
   ============================================================ */

/**
 * Checkbox — a single checkbox with an optional label and description.
 *
 * Usage:
 *   <Checkbox
 *     label="Can create calendar"
 *     checked={value}
 *     onChange={e => setValue(e.target.checked)}
 *   />
 */
export function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  indeterminate = false,
  className = '',
  id: externalId,
  name,
  value,
  ...rest
}) {
  const generatedId = useId();
  const id = externalId || generatedId;

  // Support indeterminate state via ref callback
  const refCallback = (el) => {
    if (el) el.indeterminate = indeterminate;
  };

  return (
    <label
      htmlFor={id}
      className={[
        'ds-checkbox-field',
        disabled ? 'ds-checkbox-field--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={refCallback}
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <span className="ds-checkbox-control" aria-hidden="true">
        {/* Checkmark SVG */}
        <svg
          className="ds-checkbox-checkmark"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Indeterminate dash */}
        <svg
          className="ds-checkbox-indeterminate"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2.5 6H9.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {(label || description) && (
        <span className="ds-checkbox-content">
          {label && <span className="ds-checkbox-label">{label}</span>}
          {description && <span className="ds-checkbox-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

/**
 * CheckboxGroup — wraps a set of Checkbox items.
 */
export function CheckboxGroup({ direction = 'vertical', className = '', children, ...rest }) {
  return (
    <div
      role="group"
      className={[
        'ds-checkbox-group',
        direction === 'horizontal' ? 'ds-checkbox-group--horizontal' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

// ---- Prop types ---------------------------------------------------------------
Checkbox.propTypes = {
  label:          PropTypes.string,
  description:    PropTypes.string,
  checked:        PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange:       PropTypes.func,
  disabled:       PropTypes.bool,
  indeterminate:  PropTypes.bool,
  className:      PropTypes.string,
  id:             PropTypes.string,
  name:           PropTypes.string,
  value:          PropTypes.string,
};

CheckboxGroup.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  className: PropTypes.string,
  children:  PropTypes.node,
};
