'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { EnquiryRow } from '@/lib/site-settings-types';
import { getAdminToken } from '@/lib/admin-site-settings';

type SourceFilter = 'ALL' | 'CONTACT' | 'APPOINTMENT';
type StatusFilter = 'ALL' | EnquiryRow['status'];

const statusLabel: Record<EnquiryRow['status'], string> = {
  NEW: 'New',
  IN_PROGRESS: 'In progress',
  CLOSED: 'Closed',
};

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok || !Array.isArray(data)) {
        setMessage('Could not load submissions.');
        return;
      }
      setRows(data as EnquiryRow[]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (sourceFilter !== 'ALL' && r.source !== sourceFilter) return false;
      if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
      return true;
    });
  }, [rows, sourceFilter, statusFilter]);

  async function updateStatus(id: string, status: EnquiryRow['status']) {
    const token = getAdminToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setUpdatingId(id);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not update status.');
        setToast({ type: 'error', text: data?.message ?? 'Could not update status.' });
        return;
      }
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      setToast({ type: 'success', text: 'Status updated successfully.' });
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteEnquiry(id: string) {
    const token = getAdminToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }
    const confirmed = window.confirm('Delete this submission permanently?');
    if (!confirmed) return;
    setDeletingId(id);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not delete submission.');
        setToast({ type: 'error', text: data?.message ?? 'Could not delete submission.' });
        return;
      }
      setRows((prev) => prev.filter((r) => r.id !== id));
      setToast({ type: 'success', text: 'Submission deleted successfully.' });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminLayout
      title="Submissions"
      description="All contact and appointment form entries from the website."
    >
      {toast && (
        <div
          className={cn(
            'fixed top-5 right-5 z-[9999] rounded-lg px-4 py-3 text-sm shadow-lg border',
            toast.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200',
          )}
        >
          {toast.text}
        </div>
      )}
      <div className="space-y-6">
        <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              <select
                className="min-w-0 w-full rounded-md border border-stone-200 px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-600"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value as SourceFilter)}
              >
                <option value="ALL">All sources</option>
                <option value="CONTACT">Contact</option>
                <option value="APPOINTMENT">Appointment</option>
              </select>
              <select
                className="min-w-0 w-full rounded-md border border-stone-200 px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              >
                <option value="ALL">All statuses</option>
                <option value="NEW">New</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full text-[10px] font-black uppercase tracking-widest"
              onClick={load}
              aria-label="Reload submissions from server"
            >
              Refresh
            </Button>
          </div>
          {message && (
            <p className="mt-3 text-sm font-medium text-red-600">{message}</p>
          )}
        </div>

        <div className="rounded-md border border-stone-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-stone-100 text-[11px] font-black uppercase tracking-widest text-deep-midnight-navy">
            {filtered.length} submission{filtered.length === 1 ? '' : 's'}
          </div>
          {loading ? (
            <div className="p-6 text-sm text-stone-500">Loading submissions…</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-sm text-stone-500">No submissions found.</div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filtered.map((row) => (
                <div key={row.id} className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-deep-midnight-navy">
                        {row.fullName}
                      </p>
                      <p className="text-xs text-stone-500">{row.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest',
                          row.source === 'APPOINTMENT'
                            ? 'bg-muted-burgundy-rose/10 text-muted-burgundy-rose'
                            : 'bg-deep-midnight-navy/10 text-deep-midnight-navy',
                        )}
                      >
                        {row.source.toLowerCase()}
                      </span>
                      <select
                        className="rounded-md border border-stone-200 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-stone-600"
                        value={row.status}
                        disabled={updatingId === row.id}
                        onChange={(e) =>
                          updateStatus(row.id, e.target.value as EnquiryRow['status'])
                        }
                      >
                        <option value="NEW">{statusLabel.NEW}</option>
                        <option value="IN_PROGRESS">{statusLabel.IN_PROGRESS}</option>
                        <option value="CLOSED">{statusLabel.CLOSED}</option>
                      </select>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-8 rounded-md border-red-200 text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50"
                        disabled={deletingId === row.id}
                        onClick={() => deleteEnquiry(row.id)}
                      >
                        {deletingId === row.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {new Date(row.createdAt).toLocaleString()}
                  </p>
                  <div className="grid gap-2 text-sm text-stone-700 md:grid-cols-2">
                    <p>
                      <span className="font-semibold">Location:</span>{' '}
                      {row.location || '—'}
                    </p>
                    <p>
                      <span className="font-semibold">Subject:</span>{' '}
                      {row.subject || row.inquiryType || '—'}
                    </p>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">{row.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
