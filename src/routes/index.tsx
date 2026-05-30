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
      { name: "description", content: "Full Stack Software Engineer specializing in highly distributed operational platforms, performant backend pipelines and immersive web systems." },
      { property: "og:title", content: "Maxwell Sarfo — Full Stack Software Engineer" },
      { property: "og:description", content: "Performant backend pipelines and immersive web systems built for enterprise scaling." },
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
        show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Nav ---------- */

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

/* ---------- Hero with idle float + scroll parallax ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: text moves faster than tablet
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const tabletY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const tabletScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const tabletRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-ink">
      {/* Background — slowest */}
      <motion.img
        src={heroBg}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] object-cover scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/50" />

      {/* Floating tablet — idle + parallax */}
      <motion.div
        style={{ y: tabletY, scale: tabletScale, rotate: tabletRotate }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.img
          src={tablet}
          alt="System artifact"
          className="w-[42vw] max-w-[520px] min-w-[200px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: [0, -18, 0],
            opacity: 1,
            rotateZ: [-2, 2, -2],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1.4, ease: EASE },
          }}
        />
      </motion.div>

      {/* Foreground text — fastest */}
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
          <span className="eyebrow opacity-80">Core Infrastructure Architecture</span>
          <span className="eyebrow opacity-80 hidden md:block">MS / 026</span>
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
            className="mt-6 max-w-md text-sm leading-relaxed"
          >
            // Full Stack Software Engineer specializing in highly distributed operational platforms.
          </motion.p>
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
            Scroll to initiate system ↓
          </motion.span>
          <span className="eyebrow hidden md:block">v1.0 — 2026</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Mission ---------- */

function Mission() {
  return (
    <section className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
      <Reveal>
        <div className="eyebrow text-muted-foreground mb-12">// Core Mission Statement</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="display-lg max-w-5xl">
          I develop performant backend pipelines and immersive web systems built for enterprise scaling parameters.
        </h2>
      </Reveal>
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
            Most<br/>engineers
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
            never ship<br/>at scale.
          </h3>
        </Reveal>
        <Reveal className="col-span-12 md:col-start-9 md:col-span-4 mt-6 md:mt-10" delay={0.45}>
          <p className="text-xs leading-relaxed text-muted-foreground max-w-xs">
            Most of what gets built never reaches production traffic — it stalls in
            review, leaks in the network, or breaks under load. I build the layer
            that doesn't.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Stack (staggered rows) ---------- */

const stack = [
  ["SYS_01", "React / Next.js"],
  ["SYS_02", "Node.js Core"],
  ["SYS_03", "PostgreSQL"],
  ["SYS_04", "Python Architecture"],
  ["SYS_05", "AI Integration"],
];

function Stack() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  return (
    <section className="px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow text-muted-foreground mb-16">// System Stack Matrix</div>
        </Reveal>
        <motion.ul
          ref={ref}
          className="divide-y divide-border border-y border-border"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {stack.map(([id, name]) => (
            <motion.li
              key={id}
              variants={fadeUp}
              className="grid grid-cols-12 gap-4 py-8 md:py-10 items-baseline group hover:bg-bone transition-colors duration-500"
            >
              <span className="col-span-2 md:col-span-1 eyebrow text-muted-foreground">{id}</span>
              <span className="col-span-10 md:col-span-9 text-3xl md:text-5xl tracking-tight">{name}</span>
              <span className="hidden md:block col-span-2 text-right eyebrow text-muted-foreground">Active</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------- Pinned horizontal projects ---------- */

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

function ProjectsPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Translate horizontally: from 0 to -(n-1)/n
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(100 * (projects.length - 1)) / projects.length}%`]);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <section
      ref={ref}
      className="relative bg-bone"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="px-6 md:px-10 pt-24 pb-6 flex items-baseline justify-between">
          <span className="eyebrow text-muted-foreground">// Distributed System Implementations</span>
          <span className="eyebrow text-muted-foreground hidden md:block">Scroll →</span>
        </div>
        <motion.div
          style={{ x: smoothX, width: `${projects.length * 100}%` }}
          className="flex flex-1"
        >
          {projects.map((p) => (
            <article
              key={p.n}
              className="w-screen shrink-0 h-full grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-10 items-center"
            >
              <div className="col-span-12 md:col-span-7 h-[55vh] md:h-[70vh] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="eyebrow text-muted-foreground">{p.tag}</span>
                  <span className="eyebrow text-muted-foreground">/ {p.n}</span>
                </div>
                <h3 className="text-4xl md:text-6xl tracking-tight leading-[0.95] mb-6">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">{p.desc}</p>
                <div className="mt-8 pt-6 border-t border-border space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Target Metric</span>
                    <span>{p.metric}</span>
                  </div>
                  <div className="flex justify-between text-xs gap-4">
                    <span className="text-muted-foreground">Engine Stack</span>
                    <span className="text-right">{p.stack}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Stats with count-up ---------- */

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const stats = [
    { v: 15, suffix: "+", label: "Completed Projects" },
    { v: 98, suffix: "%", label: "Client Satisfaction" },
    { v: 3, suffix: "+", label: "Years Experience" },
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
      <div className="absolute inset-0 bg-leaf-deep/25" />
      <div className="relative px-6 md:px-10 py-32 md:py-48">
        <div className="max-w-7xl mx-auto text-cream">
          <Reveal>
            <div className="eyebrow opacity-80 mb-16">// System Statistics</div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.15}>
                <div className="border-t border-cream/40 pt-6">
                  <div className="text-6xl md:text-8xl tracking-tight tabular-nums">
                    <CountUp to={s.v} suffix={s.suffix} />
                  </div>
                  <div className="eyebrow opacity-80 mt-4">{s.label}</div>
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
          <div className="eyebrow opacity-70 mb-16">// Immediate Communication Protocol</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-xl">Contact.</h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-lg text-sm opacity-80 leading-relaxed">
            Ready to deploy performance-optimized architectures. Initiate system
            handshake below.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <motion.a
            href="mailto:hello@maxwellsarfo.dev"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mt-16 inline-flex items-center gap-4 border border-cream/30 hover:border-cream hover:bg-cream hover:text-ink transition-colors duration-500 px-8 py-5 eyebrow"
          >
            Establish Secure Connection
            <span aria-hidden>→</span>
          </motion.a>
        </Reveal>
        <footer className="mt-32 pt-8 border-t border-cream/15 flex flex-col md:flex-row justify-between gap-4 eyebrow opacity-60">
          <span>© 2026 Maxwell Sarfo</span>
          <span>Built for scale.</span>
        </footer>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function Index() {
  // suppress unused warning for hook re-exports if vite-strict
  useMotionValueEvent;
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Mission />
      <Editorial />
      <Stack />
      <ProjectsPinned />
      <StatsSplash />
      <Contact />
    </main>
  );
}
