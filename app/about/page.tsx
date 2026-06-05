import { brand, team } from "@/lib/data";

export const metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[color:var(--card)] backdrop-blur-xl">
        <div className="grid gap-0 lg:grid-cols-[1fr,0.92fr]">
          <div className="p-8 text-white lg:p-12">
            <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">About Sweet Delights</p>
            <h1 className="mt-3 text-5xl font-semibold">A boutique bakery built around luxury, detail, and warm hospitality.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
              {brand.name} began with a simple vision: create cakes that look like art, taste unforgettable, and arrive with flawless service. Every order is treated like a signature celebration.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Metric title="Mission" value="Elegant cakes for meaningful moments" />
              <Metric title="Vision" value="Set the premium standard for celebratory desserts" />
              <Metric title="Promise" value="Fresh, precise, beautiful, and on time" />
            </div>
          </div>
          <img src="https://images.pexels.com/photos/20543564/pexels-photo-20543564.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1200" alt="Sweet Delights bakery interior" className="h-full min-h-[28rem] w-full object-cover" />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-8 text-white backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Our story</p>
          <h2 className="mt-3 text-3xl font-semibold">From artisan kitchen to a modern premium cake atelier.</h2>
          <p className="mt-4 text-sm leading-7 text-white/68">
            We combine classic pastry technique with modern presentation, using seasonal ingredients, refined packaging, and smooth digital experiences from browse to delivery.
          </p>
        </div>
        <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-8 text-white backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Our approach</p>
          <h2 className="mt-3 text-3xl font-semibold">Personal service with a luxury touch.</h2>
          <p className="mt-4 text-sm leading-7 text-white/68">
            We consult on flavors, delivery timing, presentation, and special requests so every cake arrives exactly as envisioned.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-[2.25rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Team</p>
        <h2 className="mt-3 text-4xl font-semibold">The people behind the pastry artistry.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
              <img src={member.image} alt={member.name} className="h-72 w-full object-cover" />
              <div className="p-5">
                <p className="text-xl font-semibold">{member.name}</p>
                <p className="mt-2 text-sm text-white/60">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{value}</p>
    </div>
  );
}