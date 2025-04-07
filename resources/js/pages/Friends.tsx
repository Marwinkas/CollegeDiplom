import React from 'react';
import { useForm } from '@inertiajs/react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Главная',
        href: '/settings/profile',
    },
];
interface User {
  id: number;
  name: string;
  email: string;
}

interface FriendRequest {
  id: number;
  user: User;
}

interface FriendsIndexProps {
  friends: User[];
  requests: FriendRequest[];
  otherUsers: User[];
}

export default function FriendsIndex({ friends, requests, otherUsers }: FriendsIndexProps) {
  const { data, setData, processing, post } = useForm({ friend_id: '' });

  const sendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.friend_id) {
      post(`/friends/send/${data.friend_id}`);
    }
  };

  const acceptRequest = (id: number) => {
    post(`/friends/accept/${id}`);
  };

  const declineRequest = (id: number) => {
    post(`/friends/decline/${id}`);
  };

  return (
        <AppLayout breadcrumbs={breadcrumbs}>
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Мои друзья</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-black rounded-2xl shadow p-4 flex items-center justify-between"
            >
              <div>{friend.name}</div>
              <div className="text-sm text-gray-500">{friend.email}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">У вас пока нет друзей.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-8">Заявки в друзья</h2>
        <div className="space-y-4 mt-2">
          {requests.length > 0 ? (
            requests.map(({ id, user }) => (
              <div
                key={id}
                className="bg-black  border border-yellow-200 rounded-2xl shadow p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => acceptRequest(id)}
                    disabled={processing}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl"
                  >
                    Принять
                  </button>
                  <button
                    onClick={() => declineRequest(id)}
                    disabled={processing}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl"
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Нет новых заявок.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-8">Добавить в друзья</h2>
        <form onSubmit={sendRequest} className="mt-4 flex gap-4 items-center">
        <select
            className="bg-black text-white border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={data.friend_id}
            onChange={(e) => setData('friend_id', e.target.value)}
          >
            <option value="">Выберите пользователя</option>
            {otherUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={processing || !data.friend_id}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Добавить
          </button>
        </form>
      </div>
    </div>
    </AppLayout>
  );
}
