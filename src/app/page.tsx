import { getFriends } from '@/lib/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const friends = getFriends();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">👋 친구들 근황</h1>
        <p className="text-gray-400">총 {friends.length}명의 근황을 확인하세요</p>
      </div>

      {friends.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">아직 등록된 사람이 없어요</p>
          <Link href="/add" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            첫 번째 친구 등록하기
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {friends.map((friend) => (
            <Link
              key={friend.id}
              href={`/edit/${encodeURIComponent(friend.name)}`}
              className="card-gradient rounded-xl p-5 hover:border-blue-500/30 transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                  {friend.name[0]}
                </div>
                <span className="text-xs text-gray-500">{friend.updatedAt}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition">
                {friend.name}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{friend.job || '직업 미입력'}</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {friend.status || '근황 미입력'}
              </p>
              {friend.contact && (
                <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-white/5">
                  📞 {friend.contact}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
