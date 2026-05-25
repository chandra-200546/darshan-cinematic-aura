import { motion } from "motion/react";
import { Film, Award, Heart, Mail, Instagram, Twitter, Youtube, Facebook, Star, Play } from "lucide-react";
import d1 from "@/assets/darshan-1.png";
import d2 from "@/assets/darshan-2.png";
import d3 from "@/assets/darshan-3.png";
import d4 from "@/assets/darshan-4.png";
import d5 from "@/assets/darshan-5.png";

const movies = [
  { title: "Majestic", year: "2002", poster: d1 },
  { title: "Kariya", year: "2003", poster: d2 },
  { title: "Jothe Jotheyali", year: "2006", poster: d3 },
  { title: "Yajamana", year: "2019", poster: d4 },
  { title: "Roberrt", year: "2021", poster: d5 },
  { title: "Kranti", year: "2023", poster: d1 },
  { title: "Kaatera", year: "2023", poster: d2 },
  { title: "Devil", year: "2025", poster: d3 },
];

const achievements = [
  { year: "2010", title: "Karnataka State Film Award", desc: "Best Actor — for outstanding performance" },
  { year: "2014", title: "SIIMA Award", desc: "Recognized at South Indian International Movie Awards" },
  { year: "2019", title: "Filmfare South", desc: "Honored for blockbuster Yajamana" },
  { year: "2023", title: "Box Office King", desc: "Kaatera shatters Kannada box office records" },
];

const fanQuotes = [
  { name: "Raghu • Mysuru", text: "Boss is not just an actor, he is an emotion for every Kannadiga. Abhimani for life!" },
  { name: "Pavithra • Bengaluru", text: "From Majestic to Kaatera — every film is a celebration. Hats off Challenging Star!" },
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
            <a href="#career" className="hover:text-amber-300 transition">Career</a>
            <a href="#movies" className="hover:text-amber-300 transition">Films</a>
            <a href="#awards" className="hover:text-amber-300 transition">Awards</a>
            <a href="#fans" className="hover:text-amber-300 transition">Fans</a>
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
              Born Darshan Thoogudeepa, the <span className="text-amber-300 font-semibold">Challenging Star</span> rose
              from the lanes of Mysuru to become one of the most celebrated faces of Kannada cinema.
            </p>
            <p>
              With a career spanning over two decades and 50+ films, he has redefined mass entertainment in Sandalwood —
              blending raw intensity with heartfelt emotion. Known affectionately as <span className="text-amber-300">D-Boss</span> by
              his army of fans, his films are cultural events.
            </p>
            <p>
              From the cult <em>Majestic</em> to the record-shattering <em>Kaatera</em>, every role is a reminder of
              what star power truly means.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-amber-500/15">
              <div><div className="font-display text-3xl gold-gradient font-bold">50+</div><div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">Films</div></div>
              <div><div className="font-display text-3xl gold-gradient font-bold">20+</div><div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">Years</div></div>
              <div><div className="font-display text-3xl gold-gradient font-bold">∞</div><div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">Fans</div></div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CAREER */}
      <Section id="career" className="bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
        <SectionTitle eyebrow="MILESTONES" title="Career Highlights" />
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
          {[
            { y: "2001", t: "Debut", d: "Stepped into Kannada cinema with Majestic, an instant cult hit." },
            { y: "2006", t: "Romantic Storm", d: "Jothe Jotheyali wins hearts across Karnataka." },
            { y: "2014", t: "Mythological Marvel", d: "Brahma & Brindavana — back-to-back blockbusters." },
            { y: "2019", t: "Yajamana", d: "A box office tornado, cementing his pan-Karnataka dominance." },
            { y: "2023", t: "Kaatera", d: "Period action drama becomes the biggest Kannada hit." },
          ].map((m, i) => (
            <motion.div
              key={m.y}
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
        <SectionTitle eyebrow="FILMOGRAPHY" title="Movie Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative overflow-hidden rounded-lg border border-amber-500/15 bg-black"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img src={m.poster} alt={m.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition">
                <div className="font-display text-amber-200 text-lg leading-tight">{m.title}</div>
                <div className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">{m.year}</div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <Play className="w-8 h-8 text-amber-300 fill-amber-300/30" />
              </div>
            </motion.div>
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
            {[
              { I: Instagram, label: "Instagram" },
              { I: Twitter, label: "Twitter" },
              { I: Youtube, label: "YouTube" },
              { I: Facebook, label: "Facebook" },
              { I: Mail, label: "Email" },
            ].map(({ I, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="group w-14 h-14 rounded-full border border-amber-500/30 flex items-center justify-center hover:bg-amber-400 hover:border-amber-400 transition"
              >
                <I className="w-5 h-5 text-amber-300 group-hover:text-black transition" />
              </a>
            ))}
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
