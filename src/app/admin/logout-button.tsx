"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        window.location.reload();
      }}
      className="text-sm font-medium text-muted hover:text-foreground"
    >
      Sair
    </button>
  );
}
