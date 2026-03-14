'use client';

import { Friend } from '@/types';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFriends = async () => {
    const res = await fetch('/api/friends');
    const data = await res.json();
    setFriends(data.friends || []);
    setLoading(false);
  };

  useEffect(() => {
    loadFriends();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name}을(를) 삭제할까요?`)) return;

    const res = await fetch(`/api/friends?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadFriends();
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">🔧 관리자 페이지</h1>
          <p className="text-gray-400 text-sm mt-1">총 {friends.length}명 관리</p>
        </div>
        <a
          href="/add"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition"
        >
          + 추가
        </a>
      </div>

      {friends.length === 0 ? (
        <p className="text-gray-500 text-center py-10">등록된 사람이 없습니다</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-gray-400">
                <th className="pb-3 pr-4">이름</th>
                <th className="pb-3 pr-4">직업</th>
                <th className="pb-3 pr-4">근황</th>
                <th className="pb-3 pr-4">연락처</th>
                <th className="pb-3 pr-4">수정일</th>
                <th className="pb-3">작업</th>
              </tr>
            </thead>
            <tbody>
              {friends.map((f) => (
                <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-3 pr-4 font-medium">{f.name}</td>
                  <td className="py-3 pr-4 text-gray-400 text-sm">{f.job || '-'}</td>
                  <td className="py-3 pr-4 text-sm max-w-[200px] truncate">{f.status || '-'}</td>
                  <td className="py-3 pr-4 text-gray-400 text-sm">{f.contact || '-'}</td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{f.updatedAt}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <a
                        href={`/edit/${encodeURIComponent(f.name)}`}
                        className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition"
                      >
                        수정
                      </a>
                      <button
                        onClick={() => handleDelete(f.id, f.name)}
                        className="text-xs px-3 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
