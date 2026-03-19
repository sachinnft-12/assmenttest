import { T } from '@tolgee/react';
import { useEffect, useState } from 'react';
import { getTrackingConsent, setTrackingConsent, type TrackingConsent } from '@/lib/tracking-consent';

type Props = {
  onConsentChange: (value: TrackingConsent) => void;
};

export function CookieBanner({ onConsentChange }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getTrackingConsent() === null);
  }, []);

  const handleChoice = (value: TrackingConsent) => {
    setTrackingConsent(value);
    onConsentChange(value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-950">
            <T>Cookie preferences</T>
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            <T>We use tracking cookies to understand performance and improve this customer experience.</T>
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <T>Reject all</T>
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="rounded-xl bg-[hsl(232,99%,59%)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:opacity-95"
          >
            <T>Accept all</T>
          </button>
        </div>
      </div>
    </div>
  );
}
