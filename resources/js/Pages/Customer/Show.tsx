import { T } from '@tolgee/react';
import { CustomerLayout } from '@/Layouts/CustomerLayout';

type TrackingCode = {
  id: number;
  name: string;
  script: string;
};

type Props = {
  creator: {
    id: number;
    name: string;
    slug: string;
  };
  trackingCodes: TrackingCode[];
};

export default function CustomerShow({ creator, trackingCodes }: Props) {
  return (
    <CustomerLayout trackingCodes={trackingCodes}>
      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
            <T>Customer page</T>
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-white">{creator.name}</h1>
            <p className="max-w-2xl text-lg text-slate-300">
              <T>This basic customer-facing page demonstrates where consent-aware tracking scripts are loaded.</T>
            </p>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
