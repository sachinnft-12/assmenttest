import { T } from '@tolgee/react';

type TrackingCodeFormData = {
  name: string;
  script: string;
};

type Props = {
  data: TrackingCodeFormData;
  errors: Partial<Record<keyof TrackingCodeFormData, string>>;
  onChange: (field: keyof TrackingCodeFormData, value: string) => void;
};

export function TrackingCodeFormFields({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900">
          <T>Name</T>
        </label>
        <input
          value={data.name}
          onChange={(event: any) => onChange('name', event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 shadow-sm outline-none ring-0 transition focus:border-[hsl(232,99%,59%)]"
          placeholder="Meta Pixel"
        />
        {errors.name ? <p className="text-sm text-red-600">{errors.name}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900">
          <T>Tracking Code Script</T>
        </label>
        <textarea
          value={data.script}
          onChange={(event: any) => onChange('script', event.target.value)}
          className="min-h-56 w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm shadow-sm outline-none ring-0 transition focus:border-[hsl(232,99%,59%)]"
          placeholder="window.dataLayer = window.dataLayer || [];"
        />
        <p className="text-sm text-slate-500">
          <T>Paste the JavaScript only. Script tags are added automatically.</T>
        </p>
        {errors.script ? <p className="text-sm text-red-600">{errors.script}</p> : null}
      </div>
    </div>
  );
}
