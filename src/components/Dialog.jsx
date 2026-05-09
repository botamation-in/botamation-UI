import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog as HDialog, Transition } from '@headlessui/react';
import Button from './Button';
import '../styles/components/dialog.css';

const sizeMap = {
  sm:   'ds-dialog__panel--sm',
  md:   'ds-dialog__panel--md',
  lg:   'ds-dialog__panel--lg',
  xl:   'ds-dialog__panel--xl',
  '2xl': 'ds-dialog__panel--2xl',
  '3xl': 'ds-dialog__panel--3xl',
  '4xl': 'ds-dialog__panel--4xl',
  '7xl': 'ds-dialog__panel--7xl',
};

/**
 * Dialog — generic modal shell with backdrop, animated panel, header and body.
 *
 * Props:
 *   isOpen          – boolean (required)
 *   onClose         – () => void (required)
 *   title           – string | ReactNode
 *   children        – body content
 *   size            – 'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'7xl'  (default: 'md')
 *   showCloseButton – show × button  (default: true)
 *   className       – extra classes on the panel
 */
export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
}) {
  return (
    <Transition appear show={!!isOpen} as={Fragment}>
      <HDialog as="div" style={{ position: 'relative', zIndex: 'var(--z-modal)' }} onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="ds-dialog__backdrop" onClick={onClose} />
        </Transition.Child>

        {/* Scroll + centre container */}
        <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', zIndex: 'var(--z-modal)' }}>
          <div style={{ display: 'flex', minHeight: '100%', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HDialog.Panel
                className={['ds-dialog__panel', sizeMap[size] ?? sizeMap.md, className]
                  .filter(Boolean).join(' ')}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="ds-dialog__header">
                    {title && (
                      <HDialog.Title as="h3" className="ds-dialog__title">
                        {title}
                      </HDialog.Title>
                    )}
                    {showCloseButton && (
                      <button
                        type="button"
                        className="ds-dialog__close"
                        onClick={onClose}
                        aria-label="Close"
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* Body */}
                <div className="ds-dialog__body">{children}</div>
              </HDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HDialog>
    </Transition>
  );
}

Dialog.propTypes = {
  isOpen:          PropTypes.bool.isRequired,
  onClose:         PropTypes.func.isRequired,
  title:           PropTypes.node,
  children:        PropTypes.node,
  size:            PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '7xl']),
  showCloseButton: PropTypes.bool,
  className:       PropTypes.string,
};

// ─── Variant config ────────────────────────────────────────────────────────────

const variantConfig = {
  warning: {
    iconClass:  'ds-confirm__icon--warning',
    btnVariant: 'primary',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    ),
  },
  danger: {
    iconClass:  'ds-confirm__icon--danger',
    btnVariant: 'danger',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    ),
  },
  info: {
    iconClass:  'ds-confirm__icon--info',
    btnVariant: 'primary',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
};

/**
 * ConfirmationDialog — opinionated confirm / cancel dialog matching the lead app design.
 *
 * Props:
 *   isOpen          – boolean (required)
 *   onConfirm       – () => void (required)
 *   onCancel        – () => void (required)
 *   title           – string
 *   message         – string
 *   confirmText     – string  (default: 'Confirm')
 *   cancelText      – string  (default: 'Cancel')
 *   variant         – 'warning' | 'danger' | 'info'  (default: 'warning')
 *   showCloseButton – boolean  (default: false)
 *   isLoading       – boolean  (default: false)
 *   loadingText     – string   (default: 'Processing...')
 *   detailsContent  – ReactNode
 *   warningText     – string
 */
export function ConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText     = 'Confirm',
  cancelText      = 'Cancel',
  variant         = 'warning',
  showCloseButton = false,
  isLoading       = false,
  loadingText     = 'Processing...',
  detailsContent,
  warningText,
}) {
  const cfg = variantConfig[variant] ?? variantConfig.warning;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCancel}
      size="md"
      showCloseButton={showCloseButton}
    >
      {/* Icon */}
      <div className={`ds-confirm__icon ${cfg.iconClass}`}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {cfg.icon}
        </svg>
      </div>

      {/* Content */}
      <div className="ds-confirm__content">
        <h3 className="ds-confirm__title">{title}</h3>
        <p className="ds-confirm__message">{message}</p>

        {detailsContent && <div style={{ marginTop: 'var(--space-4)' }}>{detailsContent}</div>}

        {warningText && (
          <p className={`ds-confirm__warning-text ds-confirm__warning-text--${variant}`}>
            {warningText}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="ds-confirm__actions">
        <Button
          variant="secondary"
          scheme={cfg.btnVariant}
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant={cfg.btnVariant}
          onClick={onConfirm}
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? loadingText : confirmText}
        </Button>
      </div>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  isOpen:          PropTypes.bool.isRequired,
  onConfirm:       PropTypes.func.isRequired,
  onCancel:        PropTypes.func.isRequired,
  title:           PropTypes.string,
  message:         PropTypes.string,
  confirmText:     PropTypes.string,
  cancelText:      PropTypes.string,
  variant:         PropTypes.oneOf(['warning', 'danger', 'info']),
  showCloseButton: PropTypes.bool,
  isLoading:       PropTypes.bool,
  loadingText:     PropTypes.string,
  detailsContent:  PropTypes.node,
  warningText:     PropTypes.string,
};
