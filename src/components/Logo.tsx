import React from 'react';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="sp-logo-wrap">
      <div className="sp-logo-mark">
        <img src="/images/sp-logo.png" alt="SonkoPatriot Forge" className="sp-logo-brand" />
      </div>
      {!compact && (
        <div className="sp-logo-copy">
          <strong>SonkoPatriot</strong>
          <span>Forge</span>
        </div>
      )}
    </div>
  );
}
