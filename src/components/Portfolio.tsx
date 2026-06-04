import { motion } from "motion/react";
import { Film, Award, Heart, Star, Play, Gauge, Zap, Timer, IndianRupee } from "lucide-react";
import { filmography, type FilmographyItem } from "@/lib/filmography";

const SocialIcon = ({ d, label }: { d: string; label: string }) => (
  <svg viewBox="0 0 24 24" aria-label={label} className="w-5 h-5 fill-current"><path d={d} /></svg>
);
const SOCIALS = {
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};
import d1 from "@/assets/darshan-1.png";
import d2 from "@/assets/darshan-2.png";
import d3 from "@/assets/darshan-3.png";
import d4 from "@/assets/darshan-4.png";
import d5 from "@/assets/darshan-5.png";
import defender from "@/assets/cars/range-rover-defender.webp";
import aventador from "@/assets/cars/lamborghini-aventador-s.webp";
import urus from "@/assets/cars/lamborghini-urus.jpg";
import vellfire from "@/assets/cars/toyota-vellfire.webp";
import jaguar from "@/assets/cars/jaguar-xk.webp";
import mustang from "@/assets/cars/ford-mustang.webp";
import cayenne from "@/assets/cars/porsche-cayenne.webp";
import vogue from "@/assets/cars/range-rover-vogue.webp";
import countryman from "@/assets/cars/mini-cooper-countryman.webp";
import endeavour from "@/assets/cars/customized-ford-endeavour.webp";
import fortuner from "@/assets/cars/toyota-fortuner.webp";
import wrangler from "@/assets/cars/jeep-wrangler.webp";
import bmw from "@/assets/cars/bmw-520d.webp";
import audi from "@/assets/cars/audi-q7.webp";

const chapters = [
  { n: "I", title: "The Boy Who Grew Up Inside Cinema", body: "Born Hemanth Kumar on 16 February 1977 in Karnataka to veteran actor Thoogudeepa Srinivas. Behind the screen-fame was struggle, instability and pressure — yet a boy deeply attached to Karnataka, village life and animals." },
  { n: "II", title: "Struggle Before Stardom", body: "He didn't arrive as a hero. He worked behind the scenes, did small TV roles and faced rejection — 'too rough', 'not hero material'. But even in tiny scenes, his screen presence refused to be ignored." },
  { n: "III", title: "Majestic — The Turning Point", body: "2002. Directed by P. N. Sathya. A rugged underworld mass character that detonated theatres with whistles and fireworks. The foundation of the D-Boss era was laid." },
  { n: "IV", title: "The Rise of D-Boss", body: "He stopped being an actor. He became an emotion. Giant cutouts, milk abhisheka, drum celebrations, bike rallies — release day in Karnataka became a festival." },
  { n: "V", title: "Heart of the Common People", body: "Loved for his simplicity, directness, quiet help to workers and grounded village-style personality. Off screen — horses, birds, farms, wildlife. One among the people." },
  { n: "VI", title: "Legacy", body: "Mass cinema. Kannada pride. Rural strength. Loyalty to fans. Some actors become stars. Some stars become legends. Very few become emotions inside millions of hearts." },
];

const achievements = [
  { year: "2002", title: "Majestic Phenomenon", desc: "Debut as lead transforms him into a mass hero overnight" },
  { year: "2010", title: "Karnataka State Film Award", desc: "Best Actor — for outstanding performance" },
  { year: "2012", title: "Sangolli Rayanna", desc: "Historical war epic earns pan-Karnataka respect beyond commercial cinema" },
  { year: "2014", title: "SIIMA Award", desc: "Recognized at South Indian International Movie Awards" },
  { year: "2019", title: "Filmfare South", desc: "Honored for blockbuster Yajamana" },
  { year: "2019", title: "Kurukshetra — Duryodhana", desc: "Bold mythological role praised for royal screen presence" },
  { year: "2023", title: "Box Office King", desc: "Kaatera shatters Kannada box office records" },
  { year: "2023", title: "Kaatera Storm", desc: "Rural emotional drama connects deeply with farmers and villages" },
];

type Car = {
  name: string;
  image?: string;
  price?: string;
  power?: string;
  torque?: string;
  topSpeed?: string;
  color?: string;
};

const cars: Car[] = [
  { name: "Range Rover Defender", image: defender, price: "1.2 Crore", power: "400 bhp", torque: "650 Nm", topSpeed: "240 km/h" },
  { name: "Lamborghini Aventador S", image: aventador, price: "6.5 Crore", power: "700 bhp", torque: "690 Nm", topSpeed: "349 km/h", color: "White" },
  { name: "Toyota Vellfire", image: vellfire, price: "85 Lakh", power: "115 bhp", torque: "198 Nm", topSpeed: "170 km/h" },
  { name: "Jaguar XK", image: jaguar, price: "88 Lakh", power: "300 bhp", torque: "680 Nm", topSpeed: "280 km/h" },
  { name: "Ford Mustang", image: mustang, price: "75 Lakh", power: "396 bhp", torque: "515 Nm", topSpeed: "250 km/h" },
  { name: "Lamborghini Urus", image: urus, price: "1.5 Crore", power: "550 bhp", torque: "770 Nm", topSpeed: "300 km/h" },
  { name: "Porsche Cayenne", image: cayenne, price: "2.75 Crore", power: "335 bhp", torque: "730 Nm", topSpeed: "209 km/h" },
  { name: "Range Rover Vogue", image: vogue, price: "38 Lakh", power: "189 bhp", torque: "230 Nm", topSpeed: "210 km/h" },
  { name: "Mini Cooper Countryman", image: countryman, price: "42 Lakh", power: "197 bhp", torque: "420 Nm", topSpeed: "180 km/h" },
  { name: "Customized Ford Endeavour", image: endeavour, price: "38 Lakh", power: "174 bhp", torque: "420 Nm", topSpeed: "180 km/h" },
  { name: "Toyota Fortuner", image: fortuner, price: "53 Lakh", power: "263 bhp", torque: "400 Nm", topSpeed: "180 km/h" },
  { name: "Jeep Wrangler", image: wrangler, price: "61 Lakh", power: "187 bhp", torque: "400 Nm", topSpeed: "238 km/h" },
  { name: "BMW 520D", image: bmw, price: "85.52 Lakh", power: "187 bhp", torque: "400 Nm", topSpeed: "238 km/h" },
  { name: "Audi Q7", image: audi },
];

const fanQuotes = [
  { name: "Raghu • Mysuru", text: "Boss is not just an actor, he is an emotion for every Kannadiga. Abhimani for life!" },
  { name: "Chandrashekhar • Bengaluru", text: "From Majestic to Kaatera — every film is a celebration. Hats off Challenging Star!" },
  { name: "Kiran • Hassan", text: "Darshan sir's swag, dialogues and screen presence — nobody can match. D-Boss forever!" },
];

const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`relative px-6 py-24 sm:py-32 ${className}`}>
    <div className="mx-auto max-w-7xl">{children}</div>
  </section>
);

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8 }}
    className="mb-14 text-center"
  >
    <p className="font-display text-amber-300/80 tracking-[0.4em] text-xs mb-4">{eyebrow}</p>
    <h2 className="font-display gold-gradient text-4xl sm:text-5xl md:text-6xl font-bold">{title}</h2>
    <div className="mx-auto mt-6 h-px w-32 gold-line" />
  </motion.div>
);

const posterThemes = [
  ["#09090b", "#7c2d12", "#f59e0b"],
  ["#020617", "#1d4ed8", "#fde68a"],
  ["#111827", "#7f1d1d", "#fbbf24"],
  ["#0f172a", "#581c87", "#facc15"],
  ["#111111", "#166534", "#fef3c7"],
  ["#1c1917", "#92400e", "#fcd34d"],
];

const escapeSvg = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const posterTitleLines = (title: string) => {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 17 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines.slice(0, 3);
};

const createGeneratedPoster = (movie: FilmographyItem, index: number) => {
  const [dark, mid, gold] = posterThemes[index % posterThemes.length];
  const titleLines = posterTitleLines(movie.title);
  const title = titleLines
    .map(
      (line, lineIndex) =>
        `<tspan x="48" y="${330 + lineIndex * 48}">${escapeSvg(line.toUpperCase())}</tspan>`,
    )
    .join("");
  const role = escapeSvg(movie.role.toUpperCase());
  const verdict = escapeSvg(movie.verdict.toUpperCase());
  const initials = escapeSvg(
    movie.title
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase(),
  );

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${dark}"/>
      <stop offset="52%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <radialGradient id="flare" cx="50%" cy="28%" r="58%">
      <stop offset="0%" stop-color="${gold}" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="${gold}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${gold}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.14"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="800" height="1200" fill="url(#bg)"/>
  <rect width="800" height="1200" fill="url(#flare)"/>
  <rect width="800" height="1200" filter="url(#grain)" opacity="0.25"/>
  <circle cx="650" cy="145" r="260" fill="none" stroke="${gold}" stroke-opacity="0.22" stroke-width="3"/>
  <circle cx="135" cy="905" r="330" fill="none" stroke="${gold}" stroke-opacity="0.12" stroke-width="2"/>
  <path d="M83 840 C210 675 308 662 438 492 C555 338 617 199 734 98" fill="none" stroke="${gold}" stroke-opacity="0.45" stroke-width="9"/>
  <path d="M73 862 C231 701 339 688 482 518 C594 385 671 212 759 137" fill="none" stroke="#fff7ed" stroke-opacity="0.2" stroke-width="2"/>
  <text x="48" y="92" fill="${gold}" font-family="Georgia, serif" font-size="34" font-weight="700" letter-spacing="9">${escapeSvg(movie.year)}</text>
  <text x="48" y="158" fill="#fff7ed" opacity="0.72" font-family="Arial, sans-serif" font-size="20" letter-spacing="5">D-BOSS CINEMATIC FILE</text>
  <text x="400" y="610" text-anchor="middle" fill="${gold}" opacity="0.18" font-family="Georgia, serif" font-size="225" font-weight="700">${initials}</text>
  <text fill="#fff7ed" font-family="Georgia, serif" font-size="42" font-weight="700" letter-spacing="2">${title}</text>
  <text x="48" y="505" fill="${gold}" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="4">ROLE</text>
  <text x="48" y="542" fill="#fff7ed" opacity="0.88" font-family="Arial, sans-serif" font-size="26" font-weight="700">${role}</text>
  <rect x="48" y="960" width="704" height="112" rx="26" fill="#000" opacity="0.48" stroke="${gold}" stroke-opacity="0.35"/>
  <text x="82" y="1008" fill="${gold}" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="5">VERDICT</text>
  <text x="82" y="1048" fill="#fff7ed" font-family="Arial, sans-serif" font-size="24" font-weight="700">${verdict}</text>
  <text x="48" y="1140" fill="#fff7ed" opacity="0.42" font-family="Arial, sans-serif" font-size="16" letter-spacing="7">AI GENERATED TRIBUTE POSTER</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export function Portfolio() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-background text-foreground"
    >
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-black/40 border-b border-amber-500/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="font-display gold-gradient text-lg sm:text-xl font-bold tracking-widest">D • BOSS</a>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.25em] text-amber-100/70">
            <a href="#about" className="hover:text-amber-300 transition">About</a>
            <a href="#story" className="hover:text-amber-300 transition">Story</a>
            <a href="#career" className="hover:text-amber-300 transition">Career</a>
            <a href="#movies" className="hover:text-amber-300 transition">Films</a>
            <a href="#cars" className="hover:text-amber-300 transition">Cars</a>
            <a href="#awards" className="hover:text-amber-300 transition">Awards</a>
            <a href="#fans" className="hover:text-amber-300 transition">Fans</a>
            <a href="/fan-army" className="text-red-400 hover:text-amber-300 transition font-bold">Fan Army</a>
            <a href="#contact" className="hover:text-amber-300 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={d5} alt="" className="h-full w-full object-cover object-top opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/60" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="font-display text-amber-300 tracking-[0.5em] text-xs sm:text-sm mb-6">CHALLENGING STAR</p>
            <h1 className="font-display gold-gradient glow-gold text-6xl sm:text-7xl md:text-8xl font-bold leading-[0.95]">
              DARSHAN
            </h1>
            <p className="mt-8 max-w-xl text-base sm:text-lg text-amber-100/70 leading-relaxed">
              The roar of Kannada cinema. A storm on screen, a king in hearts.
              A tribute crafted by fans, for the legend who carries Sandalwood on his shoulders.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#movies" className="group inline-flex items-center gap-3 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-black tracking-wider uppercase hover:bg-amber-300 transition shadow-[0_0_40px_rgba(245,200,80,0.4)]">
                <Play className="w-4 h-4 fill-black" /> Explore Films
              </a>
              <a href="#about" className="inline-flex items-center gap-3 rounded-full border border-amber-400/50 px-7 py-3 text-sm font-semibold text-amber-200 tracking-wider uppercase hover:bg-amber-400/10 transition">
                Discover Story
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="hidden md:block relative"
          >
            <div className="relative aspect-[3/4] max-w-sm ml-auto">
              <div className="absolute -inset-4 gold-gradient opacity-30 blur-3xl rounded-full" />
              <img src={d1} alt="Darshan" className="relative h-full w-full object-cover rounded-lg border border-amber-500/30 glow-soft" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <SectionTitle eyebrow="THE LEGEND" title="About Darshan" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img src={d2} alt="" className="w-full max-w-md mx-auto rounded-lg border border-amber-500/20" />
            <div className="absolute -inset-2 border border-amber-500/30 rounded-lg translate-x-4 translate-y-4 -z-10" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5 text-amber-100/80 leading-relaxed"
          >
            <p className="text-lg">
              Born <span className="text-amber-300 font-semibold">Hemanth Kumar</span> on 16 February 1977,
              the son of legendary character actor Thoogudeepa Srinivas, he did not grow up inside Kannada
              cinema with comfort. He grew up watching its pressure, pain, rejection, and silent sacrifices.
            </p>
            <p>
              Cinema was around him, but success was never handed to him. He carried a famous surname,
              but he still had to fight like an outsider.
            </p>
            <p>
              Rejected as "too rough" to become a hero, ignored by many, and doubted by people who could
              not see the fire inside him, he kept moving. Small TV roles, behind-the-scenes work, endless
              waiting, silent humiliation, and years of struggle became his training ground.
            </p>
            <p>
              Then came <em>Majestic</em> (2002). It was not just a movie. It was the moment Kannada cinema
              witnessed the rise of a man who refused to break.
            </p>
            <p>
              From that day, Darshan was no longer just an actor's son. He became the
              <span className="text-amber-300"> Challenging Star</span>, a name earned through pain,
              patience, and pure mass power.
            </p>
            <p>
              His journey from rejection to celebration is the reason millions connect with him. People do
              not just see a star in him. They see struggle, attitude, loyalty, and survival.
            </p>
            <p>
              Today, his army calls him <span className="text-amber-300">D-Boss</span>, not just out of
              fandom, but out of emotion. His releases are not ordinary film releases; they become festivals
              across Karnataka. Theatres turn into celebrations, fans turn into family, and every poster
              becomes a symbol of loyalty.
            </p>
            <p>
              From <em>Kariya</em> and <em>Kalasipalya</em> to <em>Sangolli Rayanna</em>,
              <em> Kurukshetra</em>, <em>Roberrt</em>, and the record-shattering <em>Kaatera</em>, every role
              reminds us that real stardom is not created overnight.
            </p>
            <p className="border-l border-amber-400/40 pl-5 text-amber-200/90">
              It is built through rejection. It is built through struggle. It is built through pain that
              the world never sees.
            </p>
            <p>
              Darshan's story is not just about becoming a superstar. It is about proving that even when
              the world says "you can't," destiny waits for the one who says "watch me."
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-amber-500/15">
              <div><div className="font-display text-3xl gold-gradient font-bold">50+</div><div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">Films</div></div>
              <div><div className="font-display text-3xl gold-gradient font-bold">20+</div><div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">Years</div></div>
              <div><div className="font-display text-3xl gold-gradient font-bold">∞</div><div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">Fans</div></div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* STORY — chapters */}
      <Section id="story" className="bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
        <SectionTitle eyebrow="THE JOURNEY" title="Chapters of a Legend" />
        <div className="grid md:grid-cols-2 gap-6">
          {chapters.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="group relative p-8 rounded-lg border border-amber-500/20 bg-black/40 hover:border-amber-400/60 hover:-translate-y-1 transition overflow-hidden"
            >
              <div className="absolute -top-6 -right-2 font-display text-[6rem] leading-none text-amber-400/10 group-hover:text-amber-400/20 transition">
                {c.n}
              </div>
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.4em] text-amber-300/70">Chapter {c.n}</div>
                <h3 className="font-display gold-gradient text-2xl sm:text-3xl mt-3">{c.title}</h3>
                <p className="text-amber-100/70 mt-4 leading-relaxed">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* CAREER */}
      <Section id="career">
        <SectionTitle eyebrow="MILESTONES" title="Career Highlights" />
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
          {[
            { y: "Before 2002", t: "Early Struggle Phase", d: "Before becoming a mass icon, Darshan worked through small roles, television, behind-the-scenes experience, rejection, criticism, and years of struggle. This phase built the fire, patience, and raw screen presence that later became his identity." },
            { y: "2002", t: "Majestic", d: "Darshan's breakthrough as a lead hero changed everything. Majestic introduced him as a powerful mass hero and became the foundation of the Challenging Star image. It was the moment rejection turned into recognition." },
            { y: "2003", t: "Kariya", d: "Kariya gave Darshan a raw, emotional, underworld-style mass image. His look, attitude, and performance connected deeply with fans and made people feel he was born to be a mass hero." },
            { y: "2004", t: "Kalasipalya", d: "Kalasipalya strengthened Darshan's hold over mass audiences, expanded his fan base, and turned his screen presence into a festival for mass cinema lovers." },
            { y: "2008", t: "Gaja", d: "Gaja proved Darshan's box-office strength and gave him another powerful commercial identity. It showed that his films could pull large audiences through his name and mass appeal." },
            { y: "2008", t: "Navagraha", d: "Navagraha is remembered as a stylish crime-action cult film and a Thoogudeepa Productions milestone, showing Darshan's journey carried legacy, production, and vision beyond performance." },
            { y: "2011", t: "Saarathi", d: "Saarathi became a powerful comeback-style blockbuster. It was not just a hit; it was a roar that reminded Karnataka who Darshan was." },
            { y: "2012", t: "Krantiveera Sangolli Rayanna", d: "Darshan's portrayal of Sangolli Rayanna became one of his most respected performances, bringing historical pride, awards recognition, and deep pan-Karnataka respect." },
            { y: "2013", t: "Bulbul", d: "Bulbul showed Darshan in a softer, entertaining, family-friendly space and proved he could win hearts not only with power, but also with charm." },
            { y: "2015", t: "Mr. Airavata", d: "Mr. Airavata presented Darshan in a stylish police avatar filled with attitude, action, and fan energy." },
            { y: "2019", t: "Yajamana", d: "Yajamana became one of Darshan's biggest modern mass-family entertainers, carrying action, emotion, and a social message for both mass and family audiences." },
            { y: "2019", t: "Kurukshetra", d: "Darshan played Duryodhana in this grand mythological film, marking his 50th lead film and presenting his stardom on a royal scale." },
            { y: "2021", t: "Roberrt", d: "Roberrt brought stylish action, emotion, and a huge theatrical fan celebration, reminding everyone that when Darshan arrives, theatres do not stay silent." },
            { y: "2023", t: "Kranti", d: "Kranti focused on education and social responsibility while keeping Darshan's mass image alive, carrying message and heroism together." },
            { y: "2023", t: "Kaatera", d: "Kaatera became a record-breaking rural mass emotion, opening strongly and going on to collect around 105cr. It proved that Darshan's mass emotion still rules Karnataka." },
          ].map((m, i) => (
            <motion.div
              key={m.y + m.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative mb-12 flex ${i % 2 ? "md:flex-row-reverse" : ""} items-center`}
            >
              <div className="hidden md:block w-1/2" />
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_20px_rgba(245,200,80,0.8)]" />
              <div className={`w-full md:w-1/2 ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-10 md:pl-12`}>
                <div className="font-display gold-gradient text-3xl font-bold">{m.y}</div>
                <div className="text-amber-200 font-semibold mt-1">{m.t}</div>
                <p className="text-amber-100/60 text-sm mt-2 max-w-sm">{m.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* MOVIES */}
      <Section id="movies">
        <SectionTitle eyebrow="FILMOGRAPHY" title="Complete Movie Gallery" />
        <p className="mx-auto -mt-8 mb-14 max-w-3xl text-center text-sm leading-relaxed text-amber-100/60 sm:text-base">
          A full career timeline from early appearances to modern blockbusters, each presented with a
          unique AI-generated cinematic tribute poster.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filmography.map((m, i) => (
            <motion.div
              key={`${m.year}-${m.title}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative overflow-hidden rounded-lg border border-amber-500/15 bg-black"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img src={createGeneratedPoster(m, i)} alt={`${m.title} AI-generated poster`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition">
                <div className="font-display text-amber-200 text-lg leading-tight">{m.title}</div>
                <div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">{m.year} / {m.role}</div>
                <div className="mt-2 inline-flex rounded-full border border-amber-400/30 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-amber-300/80">
                  {m.verdict}
                </div>
                <div className="line-clamp-3 text-[11px] leading-relaxed text-amber-100/65 mt-2 opacity-0 group-hover:opacity-100 transition">{m.about}</div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <Play className="w-8 h-8 text-amber-300 fill-amber-300/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CAR COLLECTION */}
      <Section id="cars" className="bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
        <SectionTitle eyebrow="THE GARAGE" title="Darshan's Car Collection" />
        <p className="mx-auto -mt-8 mb-14 max-w-3xl text-center text-sm leading-relaxed text-amber-100/60 sm:text-base">
          A closer look at the machines associated with D-Boss: luxury cruisers, rugged off-roaders,
          and pure performance icons.
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car, i) => (
            <motion.article
              key={car.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group overflow-hidden rounded-lg border border-amber-500/20 bg-black/50 hover:-translate-y-1 hover:border-amber-400/60 transition"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-amber-950/50 via-black to-black">
                {car.image ? (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-8 text-center">
                    <div>
                      <div className="font-display gold-gradient text-3xl font-bold">URUS</div>
                      <div className="mt-3 text-[10px] uppercase tracking-[0.35em] text-amber-100/45">Image coming soon</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300/70">Garage {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display mt-1 text-xl font-bold text-amber-100">{car.name}</h3>
                  {car.color && <div className="mt-1 text-xs uppercase tracking-widest text-amber-200/70">{car.color}</div>}
                </div>
              </div>
              {car.price ? (
                <div className="grid grid-cols-2 gap-px bg-amber-500/15">
                  {[
                    { icon: IndianRupee, label: "Price", value: car.price },
                    { icon: Zap, label: "Power", value: car.power },
                    { icon: Gauge, label: "Torque", value: car.torque },
                    { icon: Timer, label: "Top Speed", value: car.topSpeed },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-black/90 p-4">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-amber-100/45">
                        <Icon className="h-3.5 w-3.5 text-amber-400" /> {label}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-amber-100">{value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-xs uppercase tracking-[0.25em] text-amber-100/50">
                  Collection details awaited
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section id="awards" className="bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
        <SectionTitle eyebrow="HONORS" title="Achievements" />
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative p-8 rounded-lg border border-amber-500/20 bg-gradient-to-br from-amber-950/30 to-transparent hover:border-amber-400/50 transition"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-[0_0_30px_rgba(245,200,80,0.3)]">
                  <Award className="w-7 h-7 text-black" />
                </div>
                <div>
                  <div className="font-display text-amber-300 text-sm tracking-widest">{a.year}</div>
                  <div className="font-display text-2xl text-amber-100 mt-1">{a.title}</div>
                  <p className="text-amber-100/60 mt-2 text-sm">{a.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAN LOVE */}
      <Section id="fans">
        <SectionTitle eyebrow="THE ABHIMANIGALU" title="Fan Love" />
        <div className="grid md:grid-cols-3 gap-6">
          {fanQuotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 rounded-lg border border-amber-500/20 bg-black/40 hover:border-amber-400/50 hover:-translate-y-1 transition"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-amber-100/80 italic leading-relaxed">"{q.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs uppercase tracking-widest text-amber-300">{q.name}</span>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="bg-gradient-to-b from-transparent to-amber-950/20">
        <div className="text-center max-w-3xl mx-auto">
          <SectionTitle eyebrow="JOIN THE ARMY" title="Connect & Follow" />
          <p className="text-amber-100/70 mb-10">
            Be a part of the D-Boss family. Share love, share memories, and celebrate the Challenging Star.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://x.com/chandra__dev"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow on X"
              className="group inline-flex items-center gap-3 rounded-full border border-amber-500/30 px-6 py-4 text-amber-300 hover:bg-amber-400 hover:border-amber-400 hover:text-black transition"
            >
              <SocialIcon d={SOCIALS.x} label="X" />
              <span className="text-sm font-semibold uppercase tracking-[0.25em]">Follow on X</span>
            </a>
          </div>
          <div className="mt-16 pt-10 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest text-amber-100/40">
            <div className="flex items-center gap-2"><Film className="w-3 h-3" /> A Fan Tribute Site</div>
            <div>© 2026 • Made with <Heart className="inline w-3 h-3 fill-amber-400 text-amber-400" /> for D-Boss</div>
          </div>
        </div>
      </Section>
    </motion.main>
  );
}
