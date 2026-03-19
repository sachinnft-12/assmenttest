import { T } from '@tolgee/react';
import { Link, useForm } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { TrackingCodeFormFields } from '@/Components/TrackingCodeFormFields';

export default function CreateTrackingCode() {
  const form = useForm({
    name: '',
    script: '',
  });

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <Link href="/settings/tracking-codes" className="text-sm font-medium text-[hsl(232,99%,59%)]">
            <T>Back to Tracking Codes</T>
          </Link>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">
            <T>Add Tracking Code</T>
          </h1>
        </div>

        <form
          onSubmit={(event: any) => {
            event.preventDefault();
            form.post('/settings/tracking-codes');
          }}
          className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <TrackingCodeFormFields
            data={form.data}
            errors={form.errors}
            onChange={(field, value) => form.setData(field, value)}
          />
          <div className="flex justify-end gap-3">
            <Link href="/settings/tracking-codes" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
              <T>Cancel</T>
            </Link>
            <button className="rounded-xl bg-[hsl(232,99%,59%)] px-4 py-3 text-sm font-semibold text-white">
              <T>Save Tracking Code</T>
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
