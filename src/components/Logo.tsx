import React from 'react';
import spLogo from '../assets/images/sp-logo.png';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="sp-logo-wrap">
      <div className="sp-logo-mark">
        <img src={spLogo} alt="SonkoPatriot Forge" className="sp-logo-brand" />
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
