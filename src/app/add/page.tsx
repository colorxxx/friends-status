'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    id: '',
    name: '',
    job: '',
    status: '',
    contact: '',
    updatedAt: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMessage('❌ 이름을 입력해주세요');
      return;
    }
    setSaving(true);
    setMessage('');

    const res = await fetch('/api/friends', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('✅ 등록 완료!');
      setTimeout(() => router.push('/'), 1000);
    } else {
      setMessage('❌ 등록 실패');
    }
    setSaving(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">➕ 새 친구 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">이름 *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none transition"
            required
            placeholder="이름 입력"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">직업</label>
          <input
            type="text"
            value={form.job}
            onChange={(e) => setForm({ ...form, job: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none transition"
            placeholder="예: 개발자, 디자이너"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">근황</label>
          <textarea
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none transition min-h-[120px] resize-none"
            placeholder="요즘 뭐하고 지내?"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">연락처</label>
          <input
            type="text"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none transition"
            placeholder="전화번호 또는 이메일"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 rounded-lg font-medium transition"
          >
            {saving ? '등록 중...' : '등록'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
          >
            취소
          </button>
        </div>

        {message && (
          <p className="text-center text-sm mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
