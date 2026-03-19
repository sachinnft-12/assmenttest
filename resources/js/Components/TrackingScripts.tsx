import { useEffect } from 'react';

type TrackingCode = {
  id: number;
  name: string;
  script: string;
};

type Props = {
  enabled: boolean;
  trackingCodes: TrackingCode[];
};

export function TrackingScripts({ enabled, trackingCodes }: Props) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const appendedScripts = trackingCodes.map((trackingCode) => {
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.dataset.trackingCodeId = String(trackingCode.id);
      scriptElement.text = trackingCode.script;
      document.body.appendChild(scriptElement);
      return scriptElement;
    });

    return () => {
      appendedScripts.forEach((scriptElement) => scriptElement.remove());
    };
  }, [enabled, trackingCodes]);

  return null;
}
