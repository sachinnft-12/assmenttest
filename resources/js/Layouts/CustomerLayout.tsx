import { PropsWithChildren, useMemo, useState } from 'react';
import { CookieBanner } from '@/Components/CookieBanner';
import { TrackingScripts } from '@/Components/TrackingScripts';
import { getTrackingConsent, type TrackingConsent } from '@/lib/tracking-consent';

type TrackingCode = {
  id: number;
  name: string;
  script: string;
};

type Props = PropsWithChildren<{
  trackingCodes: TrackingCode[];
}>;

export function CustomerLayout({ children, trackingCodes }: Props) {
  const [consent, setConsent] = useState<TrackingConsent | null>(() => getTrackingConsent());
  const enabled = useMemo(() => consent === 'accepted', [consent]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <TrackingScripts enabled={enabled} trackingCodes={trackingCodes} />
      <main>{children}</main>
      <CookieBanner onConsentChange={setConsent} />
    </div>
  );
}
