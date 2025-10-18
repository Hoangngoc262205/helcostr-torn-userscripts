import { readCollection, writeCollection } from "@/lib/db";
import { User, UserRole } from "@/types";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

async function getUsers(): Promise<User[]> {
  return readCollection<User[]>("users", []);
}

export default async function UsersPage() {
  const token = cookies().get("admin_token")?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) return null;

  const users = await getUsers();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Người dùng</h1>
        <Link className="bg-blue-600 text-white rounded px-3 py-1" href="/admin/users/new">Thêm</Link>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Vai trò</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.roles.join(", ")}</td>
              <td className="p-2 border">{u.status}</td>
              <td className="p-2 border space-x-2">
                <Link className="text-blue-600 underline" href={`/admin/users/${u.id}`}>Sửa</Link>
                <Link className="text-red-600 underline" href={`/admin/users/${u.id}/delete`}>Xóa</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
