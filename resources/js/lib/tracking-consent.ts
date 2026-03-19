export const TRACKING_CONSENT_STORAGE_KEY = 'tracking-consent-v1';
const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export type TrackingConsent = 'accepted' | 'rejected';

type StoredConsent = {
  value: TrackingConsent;
  expiresAt: number;
};

export function getTrackingConsent(): TrackingConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(TRACKING_CONSENT_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredConsent;

    if (parsed.expiresAt <= Date.now()) {
      window.localStorage.removeItem(TRACKING_CONSENT_STORAGE_KEY);
      return null;
    }

    return parsed.value;
  } catch {
    window.localStorage.removeItem(TRACKING_CONSENT_STORAGE_KEY);
    return null;
  }
}

export function setTrackingConsent(value: TrackingConsent): void {
  if (typeof window === 'undefined') {
    return;
  }

  const payload: StoredConsent = {
    value,
    expiresAt: Date.now() + THIRTY_DAYS_IN_MS,
  };

  window.localStorage.setItem(TRACKING_CONSENT_STORAGE_KEY, JSON.stringify(payload));
}
