import { T } from '@tolgee/react';
import { Link, router } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { AppLayout } from '@/Layouts/AppLayout';

type TrackingCode = {
  id: number;
  name: string;
  script: string;
  is_active: boolean;
  updated_at: string;
};

export default function TrackingCodesIndex({ trackingCodes }: { trackingCodes: TrackingCode[] }) {
  const handleDelete = (trackingCodeId: number) => {
    if (!window.confirm('Delete this tracking code?')) {
      return;
    }

    router.delete(`/settings/tracking-codes/${trackingCodeId}`);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(232,99%,59%)]">
              <T>Settings</T>
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">
              <T>Tracking Codes</T>
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              <T>Manage scripts that can run on your customer-facing pages after consent.</T>
            </p>
          </div>
          <Link
            href="/settings/tracking-codes/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(232,99%,59%)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30"
          >
            <PlusIcon className="h-4 w-4" />
            <T>Add Tracking Code</T>
          </Link>
        </div>

        <div className="grid gap-4">
          {trackingCodes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                <T>No tracking codes yet</T>
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                <T>Create your first tracking code to start managing analytics or ad pixels.</T>
              </p>
            </div>
          ) : (
            trackingCodes.map((trackingCode) => (
              <div key={trackingCode.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-slate-950">{trackingCode.name}</h2>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {trackingCode.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-3 max-w-3xl rounded-2xl bg-slate-50 px-4 py-3 font-mono text-xs text-slate-600">
                      {trackingCode.script}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/settings/tracking-codes/${trackingCode.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <T>Edit</T>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(trackingCode.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <T>Delete</T>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
