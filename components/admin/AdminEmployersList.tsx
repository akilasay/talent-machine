'use client';

import { useState } from 'react';
import { updateEmployerApproval } from '@/lib/actions/employer.actions';
import type { EmployerProfile } from '@/lib/actions/employer.actions';

export default function AdminEmployersList({ employers }: { employers: EmployerProfile[] }) {
  const [list, setList] = useState(employers);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleToggle = async (employerId: string, currentApproval: boolean) => {
    setUpdatingId(employerId);
    setMessage(null);
    const result = await updateEmployerApproval(employerId, !currentApproval);
    if (result.success) {
      setList((prev) =>
        prev.map((e) => (e.id === employerId ? { ...e, approval_enabled: !currentApproval } : e))
      );
      setMessage({ type: 'success', text: currentApproval ? 'Employer unapproved.' : 'Employer approved.' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Update failed' });
    }
    setUpdatingId(null);
  };

  if (list.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        No employer profiles yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`rounded-lg px-4 py-2 ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Company</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.map((employer) => (
                <tr key={employer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{employer.company_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{employer.contact_person}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{employer.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        employer.approval_enabled ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {employer.approval_enabled ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={updatingId === employer.id}
                      onClick={() => handleToggle(employer.id, employer.approval_enabled)}
                      className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        employer.approval_enabled
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } disabled:opacity-50`}
                    >
                      {updatingId === employer.id ? '…' : employer.approval_enabled ? 'Revoke' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
