"use client";

import { logout } from "./logoutAction";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="w-full text-left text-red-300 hover:text-red-200 text-sm"
      >
        Log Out
      </button>
    </form>
  );
}
