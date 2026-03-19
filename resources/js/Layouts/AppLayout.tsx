import { PropsWithChildren } from 'react';

export function AppLayout({ children }: PropsWithChildren) {
  return <div className="min-h-screen bg-slate-50 text-slate-950">{children}</div>;
}
