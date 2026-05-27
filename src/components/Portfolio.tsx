import { motion } from "motion/react";
import { Film, Award, Heart, Mail, Star, Play } from "lucide-react";

const SocialIcon = ({ d, label }: { d: string; label: string }) => (
  <svg viewBox="0 0 24 24" aria-label={label} className="w-5 h-5 fill-current"><path d={d} /></svg>
);
const SOCIALS = {
  instagram: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.99.05-1.53.21-1.89.35-.47.18-.81.4-1.17.76s-.58.7-.76 1.17c-.14.36-.3.9-.35 1.89C3.01 9.48 3 9.85 3 13s.01 3.52.07 4.76c.05.99.21 1.53.35 1.89.18.47.4.81.76 1.17s.7.58 1.17.76c.36.14.9.3 1.89.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.99-.05 1.53-.21 1.89-.35.47-.18.81-.4 1.17-.76s.58-.7.76-1.17c.14-.36.3-.9.35-1.89.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-.99-.21-1.53-.35-1.89a3.2 3.2 0 0 0-.76-1.17 3.2 3.2 0 0 0-1.17-.76c-.36-.14-.9-.3-1.89-.35C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.94zm0 1.8A3.14 3.14 0 1 0 12 15.2a3.14 3.14 0 0 0 0-6.34zm5.14-2.1a1.16 1.16 0 1 1 0 2.32 1.16 1.16 0 0 1 0-2.32z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  youtube: "M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C.1 8.4.1 12 .1 12s0 3.6.4 5.5a3 3 0 0 0 2.1 2.1c1.9.4 9.4.4 9.4.4s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-5.5.4-5.5s0-3.6-.4-5.5zM9.6 15.6V8.4l6.3 3.6z",
  facebook: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z",
};
import d1 from "@/assets/darshan-1.png";
import d2 from "@/assets/darshan-2.png";
import d3 from "@/assets/darshan-3.png";
import d4 from "@/assets/darshan-4.png";
import d5 from "@/assets/darshan-5.png";

const movies = [
  { title: "Majestic", year: "2002", poster: d1, note: "The film that birthed D-Boss" },
  { title: "Kariya", year: "2003", poster: d2, note: "Mass action breakthrough" },
  { title: "Kalasipalya", year: "2004", poster: d3, note: "Rugged blockbuster" },
  { title: "Anna Thangi", year: "2005", poster: d4, note: "Emotional family drama" },
  { title: "Gaja", year: "2008", poster: d5, note: "Mass entertainer" },
  { title: "Saarathi", year: "2011", poster: d1, note: "Romantic action comeback" },
  { title: "Sangolli Rayanna", year: "2012", poster: d2, note: "Historical war epic" },
  { title: "Bulbul", year: "2013", poster: d3, note: "Stylish romance" },
  { title: "Ambareesha", year: "2014", poster: d4, note: "Tribute commercial hit" },
  { title: "Mr. Airavata", year: "2015", poster: d5, note: "Police mass action" },
  { title: "Chakravarthy", year: "2017", poster: d1, note: "Gangster drama" },
  { title: "Kurukshetra", year: "2019", poster: d2, note: "Mythological epic — Duryodhana" },
  { title: "Roberrt", year: "2021", poster: d3, note: "Post-pandemic blockbuster" },
  { title: "Kaatera", year: "2023", poster: d4, note: "Rural emotional storm" },
  { title: "The Devil", year: "2025", poster: d5, note: "Dark mass spectacle" },
];

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
  { year: "2012", title: "Sangolli Rayanna", desc: "Historical war epic earns pan-Karnataka respect beyond commercial cinema" },
  { year: "2019", title: "Kurukshetra — Duryodhana", desc: "Bold mythological role praised for royal screen presence" },
  { year: "2023", title: "Kaatera Storm", desc: "Rural emotional drama shatters Kannada box office records" },
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
              Born <span className="text-amber-300 font-semibold">Hemanth Kumar</span> on 16 February 1977,
              the son of legendary character actor Thoogudeepa Srinivas grew up inside Kannada cinema —
              not in luxury, but in its hard work, stress and uncertainty.
            </p>
            <p>
              Rejected as "too rough" to be a hero, he fought through small TV roles and behind-the-scenes
              work until <em>Majestic</em> (2002) detonated theatres and turned him into the
              <span className="text-amber-300"> Challenging Star</span>. Today his army calls him
              <span className="text-amber-300"> D-Boss</span>, and his releases are festivals across Karnataka.
            </p>
            <p>
              From <em>Kariya</em> and <em>Kalasipalya</em> to <em>Sangolli Rayanna</em>,
              <em> Kurukshetra</em>, <em>Roberrt</em> and the record-shattering <em>Kaatera</em> —
              every role is a reminder of what star power truly means.
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
            { y: "2002", t: "Majestic", d: "Debut as lead — a rugged mass character explodes onto theatres and the D-Boss era is born." },
            { y: "2003", t: "Kariya", d: "Mass action smash — establishes him as the next big Kannada hero." },
            { y: "2005", t: "Anna Thangi", d: "Emotional family drama proves he is far more than an action star." },
            { y: "2012", t: "Sangolli Rayanna", d: "Historical war epic — patriotism, warrior energy and pan-Karnataka respect." },
            { y: "2019", t: "Kurukshetra", d: "Bold turn as Duryodhana — royal screen presence in a mythological scale." },
            { y: "2021", t: "Roberrt", d: "Post-pandemic blockbuster carrying a powerful father–son emotion." },
            { y: "2023", t: "Kaatera", d: "Rural emotional storm shatters Kannada box office records." },
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
                <div className="text-[11px] text-amber-100/60 mt-2 opacity-0 group-hover:opacity-100 transition">{m.note}</div>
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
              { d: SOCIALS.instagram, label: "Instagram" },
              { d: SOCIALS.twitter, label: "Twitter" },
              { d: SOCIALS.youtube, label: "YouTube" },
              { d: SOCIALS.facebook, label: "Facebook" },
            ].map(({ d, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="group w-14 h-14 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:border-amber-400 hover:text-black transition"
              >
                <SocialIcon d={d} label={label} />
              </a>
            ))}
            <a
              href="mailto:fan@dboss.test"
              aria-label="Email"
              className="group w-14 h-14 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:border-amber-400 hover:text-black transition"
            >
              <Mail className="w-5 h-5" />
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
