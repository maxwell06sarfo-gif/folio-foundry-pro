import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import tablet from "@/assets/tablet.png";
import corn from "@/assets/corn.jpg";
import splash from "@/assets/splash.jpg";
import projTelemetry from "@/assets/project-telemetry.jpg";
import projProperty from "@/assets/project-property.jpg";
import projCarwash from "@/assets/project-carwash.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maxwell Sarfo — Full Stack Software Engineer" },
      {
        name: "description",
        content:
          "Full Stack Software Engineer specializing in Next.js, TypeScript, Node.js, C# .NET, React and scalable enterprise systems. 3+ years building secure, high-performance platforms.",
      },
      { property: "og:title", content: "Maxwell Sarfo — Full Stack Software Engineer" },
      {
        property: "og:description",
        content:
          "Secure, scalable full-stack systems handling 10M+ concurrent users. Available for hire.",
      },
    ],
  }),
  component: Index,
});

/* ---------- Shared motion helpers ---------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.1, ease: EASE, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}


/* ---------- Nav ---------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference text-cream">
        <button
          className="eyebrow flex items-center gap-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="inline-block w-3 h-[1px] bg-current" />
          {open ? "Close" : "Menu"}
        </button>
        <a href="#contact" className="eyebrow">
          Hire Me
        </a>
      </nav>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-ink/95 flex flex-col items-center justify-center gap-10"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-cream text-5xl md:text-7xl tracking-tight hover:opacity-60 transition-opacity"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const tabletY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const tabletScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const tabletRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-ink">
      <motion.img
        src={heroBg}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] object-cover scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />

      <motion.div
        style={{ y: tabletY, scale: tabletScale, rotate: tabletRotate }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.img
          src={tablet}
          alt="System artifact"
          className="w-[42vw] max-w-[520px] min-w-[200px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: [0, -18, 0], opacity: 1, rotateZ: [-2, 2, -2] }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1.4, ease: EASE },
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative h-full flex flex-col justify-between p-6 md:p-10 text-cream"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="pt-20 flex items-start justify-between"
        >
          <span className="eyebrow opacity-80">Full Stack Software Engineer</span>
          <span className="eyebrow opacity-80 hidden md:block">MS / 2026</span>
        </motion.div>

        <div className="max-w-6xl">
          <h1 className="display-xl">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              style={{ display: "inline-block" }}
            >
              Maxwell
            </motion.span>
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
              style={{ display: "inline-block" }}
            >
              Sarfo
              <sup className="text-[0.3em] align-super opacity-70 ml-2">™</sup>
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="mt-6 max-w-lg text-sm leading-relaxed"
          >
            // Building enterprise-grade, highly secure systems that scale to{" "}
            <span className="opacity-100 font-medium text-cream">10M+ concurrent users</span>.
            Next.js · TypeScript · Node.js · C# .NET · React · SQL
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#work"
              className="eyebrow border border-cream/40 hover:border-cream hover:bg-cream hover:text-ink transition-colors duration-300 px-6 py-3"
            >
              View Work →
            </a>
            <a
              href="https://github.com/maxwell06sarfo-gif"
              target="_blank"
              rel="noreferrer"
              className="eyebrow opacity-60 hover:opacity-100 transition-opacity"
            >
              GitHub ↗
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="flex items-end justify-between"
        >
          <motion.span
            className="eyebrow"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll to explore ↓
          </motion.span>
          <span className="eyebrow hidden md:block">v1.0 — 2026</span>
        </motion.div>
      </motion.div>
    </section>
  );
}


/* ---------- About / Mission ---------- */

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
      <Reveal>
        <div className="eyebrow text-muted-foreground mb-12">// Who I Am</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="display-lg max-w-5xl">
          I engineer systems that are{" "}
          <em className="not-italic opacity-50">fast, resilient</em> and{" "}
          <em className="not-italic opacity-50">built to last</em>.
        </h2>
      </Reveal>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl">
        <Reveal delay={0.2}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I'm Maxwell Sarfo, a Full Stack Software Engineer with{" "}
            <span className="text-foreground font-medium">3+ years of professional experience</span>{" "}
            designing and shipping production-grade software used by real businesses and real users.
            From fuel station management platforms to geo-spatial real-estate engines, I specialise in
            turning complex requirements into clean, scalable codebases.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            My systems are engineered with{" "}
            <span className="text-foreground font-medium">
              maximum-layer security architecture
            </span>{" "}
            — multi-tier authentication, encrypted data pipelines, rate-limiting, and attack-surface
            hardening that makes unauthorised access extremely difficult. Every application I ship is
            stress-tested to handle{" "}
            <span className="text-foreground font-medium">10 million+ concurrent users</span> without
            degradation.
          </p>
        </Reveal>
      </div>

      {/* Value pillars */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Security First", desc: "Multi-layer, hardened architecture on every project." },
          { label: "Scale by Design", desc: "10M+ concurrent users without breaking a sweat." },
          { label: "Clean Code", desc: "Readable, maintainable, well-documented systems." },
          { label: "On-Time Delivery", desc: "Reliable shipping with real-world production quality." },
        ].map((p, i) => (
          <Reveal key={p.label} delay={i * 0.1}>
            <div className="border-t border-border pt-6">
              <div className="text-sm font-medium mb-2">{p.label}</div>
              <div className="text-xs leading-relaxed text-muted-foreground">{p.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Editorial row ---------- */

function Editorial() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 md:gap-10 items-center">
        <Reveal className="col-span-12 md:col-span-3">
          <h3 className="text-4xl md:text-5xl tracking-tight leading-tight">
            Most<br />engineers
          </h3>
        </Reveal>
        <Reveal className="col-span-12 md:col-span-5" delay={0.15}>
          <div className="aspect-square overflow-hidden">
            <motion.img
              src={corn}
              alt="Macro corn kernels"
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </div>
        </Reveal>
        <Reveal className="col-span-12 md:col-span-4" delay={0.3}>
          <h3 className="text-4xl md:text-5xl tracking-tight leading-tight">
            never ship<br />at scale.
          </h3>
        </Reveal>
        <Reveal
          className="col-span-12 md:col-start-9 md:col-span-4 mt-6 md:mt-10"
          delay={0.45}
        >
          <p className="text-xs leading-relaxed text-muted-foreground max-w-xs">
            Most of what gets built never reaches production traffic — it stalls in review, leaks in
            the network, or breaks under load. I build the layer that doesn't. Robust, efficient, and
            reliable applications that hold their ground at any volume.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- Stack ---------- */

const stack = [
  { id: "SYS_01", name: "Next.js", desc: "App Router, SSR, edge caching, full-stack deployments" },
  { id: "SYS_02", name: "TypeScript", desc: "Strict typing, DX-optimised, zero runtime surprises" },
  { id: "SYS_03", name: "React / Vite", desc: "High-performance UI, component architecture, fast builds" },
  { id: "SYS_04", name: "Node.js", desc: "Event-driven APIs, microservices, real-time pipelines" },
  { id: "SYS_05", name: "C# · .NET", desc: "Enterprise backends, gRPC services, IoT ingestion layers" },
  { id: "SYS_06", name: "SQL / PostgreSQL", desc: "Relational schemas, PostGIS, query optimisation, migrations" },
  { id: "SYS_07", name: "HTML / CSS", desc: "Semantic markup, accessibility, pixel-perfect interfaces" },
];

function Stack() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  return (
    <section id="stack" className="px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow text-muted-foreground mb-4">// Technical Stack</div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-sm text-muted-foreground mb-16 max-w-md">
            Every tool chosen for a reason. No filler — just the technologies that ship reliable,
            production-ready software.
          </p>
        </Reveal>
        <motion.ul
          ref={ref}
          className="divide-y divide-border border-y border-border"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {stack.map(({ id, name, desc }) => (
            <motion.li
              key={id}
              variants={fadeUp}
              className="grid grid-cols-12 gap-4 py-7 md:py-9 items-baseline group hover:bg-bone transition-colors duration-500"
            >
              <span className="col-span-2 md:col-span-1 eyebrow text-muted-foreground">{id}</span>
              <span className="col-span-10 md:col-span-5 text-2xl md:text-4xl tracking-tight">{name}</span>
              <span className="col-span-12 md:col-span-5 text-xs text-muted-foreground leading-relaxed md:pt-1">
                {desc}
              </span>
              <span className="hidden md:block col-span-1 text-right eyebrow text-leaf-deep">Active</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}


/* ---------- Projects ---------- */

const projects = [
  {
    n: "01",
    title: "Fuel System Management Service",
    tag: "Enterprise Operations Platform",
    url: "https://fsms.vercel.app",
    desc:
      "Full-scale fuel station management platform deployed by filling stations to handle live sales tracking, inventory control and multi-service operations — fuel pumps, washing bay, lube bay, alignment, mart and more. Real-time dashboards, automated record-keeping and role-based access built for high-volume daily operations.",
    metric: "Multi-Service Live Tracking",
    stack: "Next.js · TypeScript · Node.js · PostgreSQL · Tailwind",
    img: projTelemetry,
    badge: "Live Product",
  },
  {
    n: "02",
    title: "Real Estate Engine",
    tag: "Geo-Spatial Property Marketplace",
    url: "https://real-estate06.vercel.app",
    desc:
      "High-capacity property marketplace where landlords and real estate managers list properties for rent or sale, and buyers browse, filter and connect. Optimised PostGIS spatial queries, Next.js edge caching and a clean search experience designed to handle millions of listing requests.",
    metric: "10M+ Request Capacity",
    stack: "Next.js · PostgreSQL · PostGIS · TypeScript · Tailwind",
    img: projProperty,
    badge: "Live Product",
  },
  {
    n: "03",
    title: "Payment Subscription System",
    tag: "Multi-Platform Payment Infrastructure",
    url: "https://payment-system-ebon.vercel.app",
    desc:
      "Embeddable payment and subscription engine that any developer can plug into a web app, mobile app or any platform. Manages subscription plans, billing cycles, webhooks and payment status — a complete backend-as-a-service for monetising products and services.",
    metric: "Platform-Agnostic Integration",
    stack: "Node.js · TypeScript · Next.js · SQL · REST API",
    img: projProperty,
    badge: "Live Product",
  },
  {
    n: "04",
    title: "CarWash Tracker Pro",
    tag: "Edge AI Visual Metrics — Desktop App",
    url: null,
    desc:
      "Desktop application that connects to a live CCTV camera feed to automatically detect, track and log vehicles entering a carwash. Performs real-time classifications by car type and colour, auto-calculates service totals and generates detailed reports — replacing manual counting entirely.",
    metric: "99% Detection Accuracy",
    stack: "C# · .NET · OpenCV · gRPC · SQL",
    img: projCarwash,
    badge: "Desktop App",
  },
];

function ProjectsPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(100 * (projects.length - 1)) / projects.length}%`]
  );
  const smoothX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <section
      id="work"
      ref={ref}
      className="relative bg-bone"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="px-6 md:px-10 pt-24 pb-4 flex items-baseline justify-between">
          <span className="eyebrow text-muted-foreground">// Selected Work</span>
          <span className="eyebrow text-muted-foreground hidden md:block">Scroll →</span>
        </div>
        <Reveal className="px-6 md:px-10 pb-6">
          <p className="text-xs text-muted-foreground max-w-sm">
            A selection of live products. There are many more web apps, desktop apps and tools I've
            built —{" "}
            <a
              href="https://github.com/maxwell06sarfo-gif"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              explore all on GitHub ↗
            </a>
          </p>
        </Reveal>
        <motion.div
          style={{ x: smoothX, width: `${projects.length * 100}%` }}
          className="flex flex-1"
        >
          {projects.map((p) => (
            <article
              key={p.n}
              className="w-screen shrink-0 h-full grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-10 items-center"
            >
              <div className="col-span-12 md:col-span-7 h-[45vh] md:h-[65vh] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="eyebrow text-muted-foreground">{p.tag}</span>
                  <span className="eyebrow text-muted-foreground">/ {p.n}</span>
                </div>
                <h3 className="text-3xl md:text-5xl tracking-tight leading-[0.95] mb-4">
                  {p.title}
                </h3>
                <div className="mb-4">
                  <span className="eyebrow text-xs border border-leaf-deep/40 text-leaf-deep px-2 py-1">
                    {p.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">{p.desc}</p>
                <div className="mt-6 pt-5 border-t border-border space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Highlight</span>
                    <span>{p.metric}</span>
                  </div>
                  <div className="flex justify-between text-xs gap-4">
                    <span className="text-muted-foreground">Stack</span>
                    <span className="text-right">{p.stack}</span>
                  </div>
                </div>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 eyebrow border border-ink/30 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300 px-5 py-3"
                  >
                    View Live ↗
                  </a>
                ) : (
                  <span className="mt-6 inline-flex items-center gap-2 eyebrow border border-border px-5 py-3 text-muted-foreground cursor-not-allowed">
                    Desktop App
                  </span>
                )}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ---------- Security & Scale Section ---------- */

function SecurityScale() {
  const pillars = [
    {
      id: "SEC_01",
      title: "Multi-Layer Security",
      body:
        "Every system is hardened with multi-tier authentication (JWT, OAuth, session management), encrypted transport layers, input sanitisation, SQL injection prevention, rate-limiting and OWASP-aligned attack surface reduction. Extremely difficult for bad actors to penetrate.",
    },
    {
      id: "SEC_02",
      title: "10M+ Concurrent Users",
      body:
        "Architectures are stress-tested and load-balanced for 10 million+ simultaneous users. Horizontal scaling, caching strategies, optimised database queries and CDN delivery ensure zero degradation under peak traffic.",
    },
    {
      id: "SEC_03",
      title: "Robust & Reliable",
      body:
        "Uptime-first design with graceful error handling, automated recovery patterns, comprehensive logging and observability. Systems stay alive when things go wrong — because in production, they will.",
    },
    {
      id: "SEC_04",
      title: "Clean Architecture",
      body:
        "Separation of concerns, SOLID principles, modular codebase structure and thorough documentation. Code that your team can read, extend and maintain years after I've shipped it.",
    },
  ];

  return (
    <section className="px-6 md:px-10 py-28 md:py-40 bg-ink text-cream">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow opacity-60 mb-4">// Engineering Standards</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg max-w-4xl mb-20">
            Built to be attacked.<br />Built to survive.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className="border-t border-cream/20 pt-8">
                <div className="eyebrow text-cream/50 mb-4">{p.id}</div>
                <h3 className="text-2xl md:text-3xl tracking-tight mb-4">{p.title}</h3>
                <p className="text-sm leading-relaxed text-cream/60">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function StatsSplash() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const stats = [
    { v: 15, suffix: "+", label: "Shipped Products" },
    { v: 98, suffix: "%", label: "Client Satisfaction" },
    { v: 3, suffix: "+", label: "Years Experience" },
    { v: 10, suffix: "M+", label: "Users Supported" },
  ];
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        src={splash}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-leaf-deep/30" />
      <div className="relative px-6 md:px-10 py-32 md:py-48">
        <div className="max-w-7xl mx-auto text-cream">
          <Reveal>
            <div className="eyebrow opacity-80 mb-16">// By The Numbers</div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.12}>
                <div className="border-t border-cream/40 pt-6">
                  <div className="text-5xl md:text-7xl tracking-tight tabular-nums">
                    <CountUp to={s.v} suffix={s.suffix} />
                  </div>
                  <div className="eyebrow opacity-70 mt-4">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-32 md:py-48 bg-ink text-cream">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow opacity-70 mb-16">// Let's Build Something</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-xl">Contact.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-lg text-sm opacity-75 leading-relaxed">
            I'm available for full-time roles, contract work and technical consulting. If you're
            looking for a developer who ships secure, high-performance systems that scale — let's talk.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <motion.a
              href="mailto:maxwell06sarfo@gmail.com"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-4 border border-cream/30 hover:border-cream hover:bg-cream hover:text-ink transition-colors duration-500 px-8 py-5 eyebrow"
            >
              Send an Email
              <span aria-hidden>→</span>
            </motion.a>
            <a
              href="https://github.com/maxwell06sarfo-gif"
              target="_blank"
              rel="noreferrer"
              className="eyebrow opacity-60 hover:opacity-100 transition-opacity px-2 py-1"
            >
              GitHub Profile ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {[
              { label: "Email", value: "maxwell06sarfo@gmail.com", href: "mailto:maxwell06sarfo@gmail.com" },
              { label: "GitHub", value: "maxwell06sarfo-gif", href: "https://github.com/maxwell06sarfo-gif" },
              { label: "Available", value: "Full-time · Contract", href: null },
            ].map((c) => (
              <div key={c.label} className="border-t border-cream/15 pt-5">
                <div className="eyebrow opacity-50 mb-2">{c.label}</div>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-xs text-cream/80 hover:text-cream transition-colors break-all"
                  >
                    {c.value}
                  </a>
                ) : (
                  <span className="text-xs text-cream/80">{c.value}</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <footer className="mt-32 pt-8 border-t border-cream/15 flex flex-col md:flex-row justify-between gap-4 eyebrow opacity-50">
          <span>© 2026 Maxwell Sarfo</span>
          <span>Built for scale. Secured by design.</span>
        </footer>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function Index() {
  useMotionValueEvent;
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Editorial />
      <Stack />
      <ProjectsPinned />
      <SecurityScale />
      <StatsSplash />
      <Contact />
    </main>
  );
}
