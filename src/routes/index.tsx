import { createFileRoute } from "@tanstack/react-router";
import heroGreen from "@/assets/hero-green.jpg";
import corn from "@/assets/corn.jpg";
import splash from "@/assets/splash.jpg";
import projTelemetry from "@/assets/project-telemetry.jpg";
import projProperty from "@/assets/project-property.jpg";
import projCarwash from "@/assets/project-carwash.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maxwell Sarfo — Full Stack Software Engineer" },
      { name: "description", content: "Full Stack Software Engineer specializing in highly distributed operational platforms, performant backend pipelines and immersive web systems." },
      { property: "og:title", content: "Maxwell Sarfo — Full Stack Software Engineer" },
      { property: "og:description", content: "Performant backend pipelines and immersive web systems built for enterprise scaling." },
    ],
  }),
  component: Index,
});

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference text-cream">
      <button className="eyebrow flex items-center gap-2">
        <span className="inline-block w-3 h-[1px] bg-current" />
        Menu
      </button>
      <a href="#contact" className="eyebrow">Contact</a>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      <img
        src={heroGreen}
        alt="Glossy black tablet floating in chlorophyll"
        className="absolute inset-0 w-full h-full object-cover opacity-95"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/40" />
      <div className="relative h-full flex flex-col justify-between p-6 md:p-10 text-cream">
        <div className="pt-20 flex items-start justify-between">
          <span className="eyebrow opacity-80">Core Infrastructure Architecture</span>
          <span className="eyebrow opacity-80 hidden md:block">MS / 026</span>
        </div>
        <div className="max-w-6xl">
          <h1 className="display-xl">Maxwell<br/>Sarfo<sup className="text-[0.3em] align-super opacity-70 ml-2">™</sup></h1>
          <p className="mt-6 max-w-md text-sm opacity-80 leading-relaxed">
            // Full Stack Software Engineer specializing in highly distributed operational platforms.
          </p>
        </div>
        <div className="flex items-end justify-between">
          <span className="eyebrow opacity-70">Scroll to initiate system ↓</span>
          <span className="eyebrow opacity-70 hidden md:block">v1.0 — 2026</span>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
      <div className="eyebrow text-muted-foreground mb-12">// Core Mission Statement</div>
      <h2 className="display-lg max-w-5xl">
        I develop performant backend pipelines and immersive web systems built for enterprise scaling parameters.
      </h2>
    </section>
  );
}

function Editorial() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 md:gap-10 items-center">
        <h3 className="col-span-12 md:col-span-3 text-4xl md:text-5xl tracking-tight leading-tight">
          Most<br/>engineers
        </h3>
        <div className="col-span-12 md:col-span-5 aspect-square overflow-hidden">
          <img src={corn} alt="Macro corn kernels" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <h3 className="col-span-12 md:col-span-4 text-4xl md:text-5xl tracking-tight leading-tight">
          never ship<br/>at scale.
        </h3>
        <div className="col-span-12 md:col-start-9 md:col-span-4 mt-6 md:mt-10">
          <p className="text-xs leading-relaxed text-muted-foreground max-w-xs">
            Most of what gets built never reaches production traffic — it stalls in
            review, leaks in the network, or breaks under load. I build the layer
            that doesn't.
          </p>
        </div>
      </div>
    </section>
  );
}

const stack = [
  ["SYS_01", "React / Next.js"],
  ["SYS_02", "Node.js Core"],
  ["SYS_03", "PostgreSQL"],
  ["SYS_04", "Python Architecture"],
  ["SYS_05", "AI Integration"],
];

function Stack() {
  return (
    <section className="px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto">
        <div className="eyebrow text-muted-foreground mb-16">// System Stack Matrix</div>
        <ul className="divide-y divide-border border-y border-border">
          {stack.map(([id, name]) => (
            <li key={id} className="grid grid-cols-12 gap-4 py-8 md:py-10 items-baseline group hover:bg-bone transition-colors duration-500">
              <span className="col-span-2 md:col-span-1 eyebrow text-muted-foreground">{id}</span>
              <span className="col-span-10 md:col-span-9 text-3xl md:text-5xl tracking-tight">{name}</span>
              <span className="hidden md:block col-span-2 text-right eyebrow text-muted-foreground">Active</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const projects = [
  {
    n: "01",
    title: "Fuel Telemetry Core",
    tag: "IoT Ingestion Pipeline",
    desc: "Asynchronous processing infrastructure built to stream asset telemetry with sub-100ms latency patterns.",
    metric: "99.99% Ingestion Uptime",
    stack: "C# .NET · RabbitMQ · Redis · TypeScript",
    img: projTelemetry,
  },
  {
    n: "02",
    title: "Property Engine",
    tag: "Geo-Spatial Architecture",
    desc: "High-capacity marketplace query structure deploying Next.js edge caching and optimized PostGIS maps.",
    metric: "10M+ Request Capacity",
    stack: "Next.js · PostgreSQL · PostGIS · Tailwind",
    img: projProperty,
  },
  {
    n: "03",
    title: "CarWash Tracker Pro",
    tag: "Edge AI Visual Metrics",
    desc: "Distributed business analysis system utilizing automated edge computer vision algorithms for local traffic logging.",
    metric: "99% Metric Accuracy",
    stack: "C# · OpenCV · gRPC · Next.js",
    img: projCarwash,
  },
];

function Projects() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-32 bg-bone">
      <div className="max-w-7xl mx-auto">
        <div className="eyebrow text-muted-foreground mb-16">// Distributed System Implementations</div>
        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <article key={p.n} className="grid grid-cols-12 gap-6 md:gap-10 items-end">
              <div className={`col-span-12 md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className={`col-span-12 md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
                <div className="flex items-baseline justify-between mb-8">
                  <span className="eyebrow text-muted-foreground">{p.tag}</span>
                  <span className="eyebrow text-muted-foreground">/ {p.n}</span>
                </div>
                <h3 className="text-4xl md:text-5xl tracking-tight leading-[0.95] mb-6">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">{p.desc}</p>
                <div className="mt-10 pt-6 border-t border-border space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Target Metric</span>
                    <span>{p.metric}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Engine Stack</span>
                    <span className="text-right max-w-[60%]">{p.stack}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSplash() {
  const stats = [
    ["15+", "Completed Projects"],
    ["98%", "Client Satisfaction"],
    ["3+", "Years Experience"],
  ];
  return (
    <section className="relative overflow-hidden">
      <img src={splash} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-leaf-deep/20" />
      <div className="relative px-6 md:px-10 py-32 md:py-48">
        <div className="max-w-7xl mx-auto text-cream">
          <div className="eyebrow opacity-80 mb-16">// System Statistics</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
            {stats.map(([n, label]) => (
              <div key={label} className="border-t border-cream/40 pt-6">
                <div className="text-6xl md:text-8xl tracking-tight">{n}</div>
                <div className="eyebrow opacity-80 mt-4">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-32 md:py-48 bg-ink text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="eyebrow opacity-70 mb-16">// Immediate Communication Protocol</div>
        <h2 className="display-xl">Contact.</h2>
        <p className="mt-10 max-w-lg text-sm opacity-80 leading-relaxed">
          Ready to deploy performance-optimized architectures. Initiate system
          handshake below.
        </p>
        <a
          href="mailto:hello@maxwellsarfo.dev"
          className="mt-16 inline-flex items-center gap-4 border border-cream/30 hover:border-cream hover:bg-cream hover:text-ink transition-all duration-500 px-8 py-5 eyebrow"
        >
          Establish Secure Connection
          <span aria-hidden>→</span>
        </a>
        <footer className="mt-32 pt-8 border-t border-cream/15 flex flex-col md:flex-row justify-between gap-4 eyebrow opacity-60">
          <span>© 2026 Maxwell Sarfo</span>
          <span>Built for scale.</span>
        </footer>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Mission />
      <Editorial />
      <Stack />
      <Projects />
      <StatsSplash />
      <Contact />
    </main>
  );
}
