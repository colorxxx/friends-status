'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Friend } from '@/types';

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const name = decodeURIComponent(params.name as string);

  const [form, setForm] = useState<Friend>({
    id: '',
    name: name,
    job: '',
    status: '',
    contact: '',
    updatedAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/friends/${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.friend) setForm(data.friend);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const res = await fetch('/api/friends', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('✅ 저장됨!');
      setTimeout(() => router.push('/'), 1000);
    } else {
      setMessage('❌ 저장 실패');
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">✏️ {name} 근황 수정</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">이름</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none transition"
            required
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
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-lg font-medium transition"
          >
            {saving ? '저장 중...' : '저장'}
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
