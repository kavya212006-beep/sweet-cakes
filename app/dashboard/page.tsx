import { DashboardClient } from "@/components/commerce-clients";

export const metadata = {
  title: "Account Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2.5rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">User dashboard</p>
        <h1 className="mt-3 text-5xl font-semibold">Manage your Sweet Delights account.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">Log in, sign up, recover your password, view orders, saved addresses, wishlist items, and profile details.</p>
      </section>
      <DashboardClient />
    </div>
  );
}