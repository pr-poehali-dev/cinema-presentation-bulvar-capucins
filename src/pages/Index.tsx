import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/2bf55140-c107-4927-8a64-d4db81a2870b/files/2e0ede3d-bdd1-498d-ade2-e5e64e928852.jpg",
  director: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Alla_Surikova_2020_%28cropped%29.jpg",
  saloon: "https://cdn.poehali.dev/projects/2bf55140-c107-4927-8a64-d4db81a2870b/files/e3409e77-9bd9-435d-82d7-165e6479cd39.jpg",
  projector: "https://cdn.poehali.dev/projects/2bf55140-c107-4927-8a64-d4db81a2870b/files/822a7722-fa03-4120-996c-df97fe58392b.jpg",
};

const ACTORS = [
  { name: "Андрей Миронов", role: "Мистер Фёст", note: "Благородный пропагандист кино", photo: "https://upload.wikimedia.org/wikipedia/commons/1/14/%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B9_%D0%9C%D0%B8%D1%80%D0%BE%D0%BD%D0%BE%D0%B2_%28cropped%29.jpg", year: "до 1987" },
  { name: "Александра Яковлева", role: "Диана", note: "Дочь хозяина салуна", photo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Aleksandra_Yakovleva%2C_May_2021_%28cropped%29.jpg", year: "2021" },
  { name: "Николай Караченцов", role: "Билли Кинг", note: "Бандит и злодей", photo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nikolai_Karachentsov_in_Chisinau_-_5_%281972%29._%289313087830%29.jpg", year: "1972" },
  { name: "Михаил Боярский", role: "Чёрный Джек", note: "Ковбой и авантюрист", photo: "https://upload.wikimedia.org/wikipedia/commons/d/df/%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB_%D0%91%D0%BE%D1%8F%D1%80%D1%81%D0%BA%D0%B8%D0%B9._%D0%A4%D0%BE%D1%82%D0%BE_%D0%90%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D0%B8%D0%B8_%D0%A4%D0%B5%D0%B4%D0%BE%D1%80%D0%B5%D0%BD%D0%BA%D0%BE.jpg", year: "" },
  { name: "Олег Табаков", role: "Мак-Кью", note: "Делец и циник", photo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/%D0%9E%D0%BB%D0%B5%D0%B3_%D0%A2%D0%B0%D0%B1%D0%B0%D0%BA%D0%BE%D0%B2_%281980%29.jpg", year: "1980" },
  { name: "Игорь Кваша", role: "Пастор", note: "Служитель церкви", photo: "https://upload.wikimedia.org/wikipedia/commons/4/44/%D0%98%D0%B3%D0%BE%D1%80%D1%8C_%D0%9A%D0%B2%D0%B0%D1%88%D0%B0_%D0%B8_%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0_%D0%94%D0%BE%D1%80%D0%BE%D0%BD%D0%B8%D0%BD%D0%B0_%28%D0%BD%D0%BE%D1%8F%D0%B1%D1%80%D1%8C_1959%29.jpg", year: "1959" },
];

const SONGS = [
  {
    title: "Синема",
    subtitle: "Главная тема фильма",
    lines: [
      "Синема, синема, синема —",
      "от тебя я без ума!",
      "Синема, синема —",
      "это чудо всех времён,",
      "лучший из миров.",
    ],
    icon: "Film",
  },
  {
    title: "Волшебный луч",
    subtitle: "Ода кинематографу",
    lines: [
      "Волшебный луч, волшебный луч",
      "пронзает темноту...",
      "И тает в нём, как в свете туч,",
      "мечта и красота.",
    ],
    icon: "Sparkles",
  },
  {
    title: "Была не была",
    subtitle: "Романс Дианы",
    lines: [
      "Была не была —",
      "гулять, так гулять!",
      "Была не была —",
      "любить, так любить!",
      "Эх, была не была...",
    ],
    icon: "Music",
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ParallaxBg({ src, opacity = 1 }: { src: string; opacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const img = inner.current;
    if (!el || !img) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      img.style.transform = `translateY(${(progress - 0.5) * 70}px) scale(1.14)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        ref={inner}
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, opacity, transition: "transform 0.1s linear" }}
      />
    </div>
  );
}

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const G = "#C9A84C";
  const BG = "#0D0906";
  const CREAM = "#F0E0C0";
  const ASH = "#9A8A78";
  const DARK_ASH = "#6A5A4A";

  return (
    <div style={{ background: BG, color: CREAM, minHeight: "100vh", overflowX: "hidden", fontFamily: "Cormorant Garamond, serif" }}>
      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{ opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} />

      {/* ══ HERO ══ */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ height: "100vh" }}>
        <div className="absolute top-0 left-0 right-0 z-20" style={{ height: "9vh", background: BG }} />
        <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "9vh", background: BG }} />

        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.hero})`, transform: `scale(${1 + scrollY * 0.00025})`, filter: "sepia(50%) brightness(0.5)", transition: "transform 0.1s linear" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${BG}88 0%, ${BG}22 40%, ${BG}E0 100%)` }} />
        </div>

        <div className="absolute z-30 left-0 right-0" style={{ top: "9vh", height: 1, background: `linear-gradient(90deg, transparent, ${G}, transparent)`, opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.6s" }} />
        <div className="absolute z-30 left-0 right-0" style={{ bottom: "9vh", height: 1, background: `linear-gradient(90deg, transparent, ${G}, transparent)`, opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.6s" }} />

        <div className="relative z-10 text-center px-4" style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 11, letterSpacing: "0.55em", color: G, textTransform: "uppercase", marginBottom: "1.2rem", opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 0.2s" }}>
            Алла Сурикова · 1987 · Мосфильм
          </p>
          <h1 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2.2rem, 7vw, 6.5rem)", fontWeight: 300, letterSpacing: "0.12em", lineHeight: 1.05, color: CREAM, textShadow: `0 0 60px ${G}55`, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)", transition: "opacity 1.4s ease 0.5s, transform 1.4s ease 0.5s" }}>
            ЧЕЛОВЕК<br />
            <span style={{ color: G }}>С БУЛЬВАРА</span><br />
            КАПУЦИНОВ
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "clamp(1rem, 2vw, 1.35rem)", color: ASH, marginTop: "1.8rem", letterSpacing: "0.08em", opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 1.2s" }}>
            «Кино делает людей лучше — или хуже. Это зависит от людей.»
          </p>
          <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 2s", marginTop: "3.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "Oswald, sans-serif", fontSize: 9, letterSpacing: "0.45em", color: DARK_ASH, textTransform: "uppercase" }}>Прокрутить</span>
            <div className="animate-pulse" style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${G}, transparent)` }} />
          </div>
        </div>
      </section>

      {/* ══ РЕЖИССЁР ══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="container" style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="relative">
                <div className="absolute" style={{ top: -12, left: -12, right: 12, bottom: 12, border: `1px solid ${G}28` }} />
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.director})`, filter: "sepia(30%) contrast(1.1)" }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG}BB 0%, transparent 60%)` }} />
                </div>
                <div className="absolute bottom-5 left-5 flex items-center gap-2">
                  <div style={{ width: 28, height: 1, background: G }} />
                  <span style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.45em", color: G, textTransform: "uppercase" }}>Режиссёр</span>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={180}>
              <div>
                <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.5em", color: G, textTransform: "uppercase", marginBottom: "1rem" }}>Постановщик</p>
                <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 300, letterSpacing: "0.12em", color: CREAM, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                  АЛЛА<br /><span style={{ color: G }}>СУРИКОВА</span>
                </h2>
                <div style={{ width: 56, height: 1, background: `${G}66`, marginBottom: "1.5rem" }} />
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.15rem", lineHeight: 1.8, color: ASH, fontStyle: "italic", marginBottom: "1.8rem" }}>
                  Советский и российский кинорежиссёр, мастер лирической комедии. «Человек с бульвара Капуцинов» (1987) стал её самой кассовой и любимой зрителями работой — музыкальный вестерн с блестящим актёрским ансамблем.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Заслуженный деятель искусств РСФСР",
                    "Приз зрительских симпатий — МКФ в Москве",
                    "Автор более 20 полнометражных фильмов",
                  ].map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: G, flexShrink: 0 }} />
                      <span style={{ fontFamily: "Oswald, sans-serif", fontSize: 11, letterSpacing: "0.28em", color: ASH, textTransform: "uppercase" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══ АКТЁРЫ ══ */}
      <section className="relative py-28" style={{ background: "#110D09" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G}88, transparent)` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G}88, transparent)` }} />
        <div className="container" style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.5em", color: G, textTransform: "uppercase", marginBottom: "1rem" }}>В главных ролях</p>
              <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, letterSpacing: "0.2em", color: CREAM }}>АКТЁРСКИЙ СОСТАВ</h2>
              <div style={{ width: 80, height: 1, background: `${G}66`, margin: "1.2rem auto 0" }} />
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2, background: `${G}18` }}>
            {ACTORS.map((actor, i) => (
              <RevealSection key={i} delay={i * 90}>
                <ActorCard actor={actor} index={i} G={G} BG="#110D09" CREAM={CREAM} ASH={ASH} DARK_ASH={DARK_ASH} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ СЮЖЕТ ══ */}
      <section className="relative py-32 overflow-hidden">
        <ParallaxBg src={IMAGES.saloon} opacity={0.25} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${BG}F2 40%, ${BG}B0 100%)` }} />
        <div className="relative z-10 container" style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <RevealSection>
            <div style={{ maxWidth: 680 }}>
              <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.5em", color: G, textTransform: "uppercase", marginBottom: "1.2rem" }}>О фильме</p>
              <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, letterSpacing: "0.15em", color: CREAM, lineHeight: 1.2, marginBottom: "2.5rem" }}>
                КИНО КАК<br /><span style={{ color: G }}>СПАСЕНИЕ МИРА</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", lineHeight: 1.8, color: ASH, fontStyle: "italic" }}>
                  <span style={{ color: G, fontSize: "1.6rem" }}>М</span>истер Фёст — просветлённый энтузиаст кино — приезжает в дикий западный городок с одной миссией: показать людям фильмы и сделать их лучше.
                </p>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", lineHeight: 1.8, color: ASH }}>
                  Бандиты, стрельба, любовь и волшебный свет проектора — кинематограф побеждает насилие силой красоты. Советский музыкальный вестерн, ставший культовым.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
                {["Музыкальный вестерн", "Комедия", "1987", "100 минут"].map((tag, i) => (
                  <span key={i} style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", border: `1px solid ${G}50`, color: G, padding: "0.4rem 1rem" }}>{tag}</span>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ КОМПОЗИТОР + ПЕСНИ ══ */}
      <section className="relative py-28 overflow-hidden">
        <ParallaxBg src={IMAGES.projector} opacity={0.18} />
        <div className="absolute inset-0" style={{ background: `${BG}D0` }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G}66, transparent)` }} />
        <div className="relative z-10 container" style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.5em", color: G, textTransform: "uppercase", marginBottom: "1rem" }}>Музыка к фильму</p>
              <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, letterSpacing: "0.2em", color: CREAM }}>
                ГЕННАДИЙ ГЛАДКОВ
              </h2>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.1rem", color: ASH, marginTop: "0.6rem" }}>Композитор · автор музыки</p>
              <div style={{ width: 80, height: 1, background: `${G}66`, margin: "1.2rem auto 0" }} />
              <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 11, letterSpacing: "0.35em", color: DARK_ASH, textTransform: "uppercase", marginTop: "0.8rem" }}>
                Слова песен — Юрий Ряшенцев
              </p>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {SONGS.map((song, i) => (
              <RevealSection key={i} delay={i * 140}>
                <div style={{ position: "relative", overflow: "hidden", padding: "2rem", border: `1px solid ${G}33`, background: `${G}08` }}>
                  <div style={{ position: "absolute", top: "-0.5rem", right: "1rem", fontFamily: "Oswald, sans-serif", fontSize: "6rem", fontWeight: 700, color: `${G}0A`, lineHeight: 1, userSelect: "none" }}>{i + 1}</div>
                  <div className="relative z-10">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <Icon name={song.icon as "Film" | "Sparkles" | "Music"} size={18} style={{ color: G }} />
                      <div>
                        <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", letterSpacing: "0.2em", color: CREAM, textTransform: "uppercase" }}>{song.title}</h3>
                        <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 9, letterSpacing: "0.35em", color: DARK_ASH, textTransform: "uppercase" }}>{song.subtitle}</p>
                      </div>
                    </div>
                    <div style={{ width: "100%", height: 1, background: `${G}33`, marginBottom: "1.2rem" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {song.lines.map((line, j) => (
                        <p key={j} style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: j === 0 ? G : ASH, lineHeight: 1.6 }}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ФИНАЛ ══ */}
      <section className="relative overflow-hidden" style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
        <ParallaxBg src={IMAGES.hero} opacity={0.35} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${BG}99, ${BG}DD)` }} />
        <div className="absolute top-0 left-0 right-0" style={{ height: "10%", background: BG }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "10%", background: BG }} />
        <div style={{ position: "absolute", top: "10%", left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
        <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />

        <div className="relative z-10" style={{ textAlign: "center", padding: "0 1.5rem" }}>
          <RevealSection>
            <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.55em", color: G, textTransform: "uppercase", marginBottom: "1.5rem" }}>Советский кинематограф</p>
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2.5rem,8vw,6.5rem)", fontWeight: 200, letterSpacing: "0.12em", color: CREAM, lineHeight: 1, marginBottom: "1rem" }}>
              СМОТРЕТЬ ФИЛЬМ
            </h2>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.2rem", color: ASH, marginBottom: "3rem" }}>
              «Если бы кино сделало людей лучше — это было бы чудо. Но оно делает мир красивее.»
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <button
                style={{ fontFamily: "Oswald, sans-serif", fontSize: 11, letterSpacing: "0.45em", textTransform: "uppercase", background: G, color: BG, padding: "1rem 3rem", cursor: "pointer", border: "none", transition: "background 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.background = CREAM)}
                onMouseLeave={e => (e.currentTarget.style.background = G)}
              >
                Смотреть онлайн
              </button>
              <button
                style={{ fontFamily: "Oswald, sans-serif", fontSize: 11, letterSpacing: "0.45em", textTransform: "uppercase", background: "transparent", color: G, padding: "1rem 3rem", cursor: "pointer", border: `1px solid ${G}80`, transition: "border-color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = G)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${G}80`)}
              >
                КиноПоиск
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: `1px solid ${G}20`, padding: "2.5rem 0" }}>
        <div className="container" style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.35em", color: DARK_ASH, textTransform: "uppercase" }}>© 1987 Мосфильм · Все права защищены</p>
          <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 11, letterSpacing: "0.4em", color: G, textTransform: "uppercase" }}>ЧЕЛОВЕК С БУЛЬВАРА КАПУЦИНОВ</p>
          <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.35em", color: DARK_ASH, textTransform: "uppercase" }}>Режиссёр: Алла Сурикова</p>
        </div>
      </footer>
    </div>
  );
}

function ActorCard({ actor, index, G, BG, CREAM, ASH, DARK_ASH }: {
  actor: { name: string; role: string; note: string; photo: string; year: string };
  index: number;
  G: string; BG: string; CREAM: string; ASH: string; DARK_ASH: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", cursor: "pointer" }}
    >
      {/* Фото актёра */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${actor.photo})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        filter: "grayscale(55%) sepia(25%) brightness(0.72)",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.7s ease, filter 0.5s ease",
      }} />
      {/* Градиент */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG}F5 0%, ${BG}70 45%, transparent 100%)` }} />
      {/* Hover золотой оверлей */}
      <div style={{ position: "absolute", inset: 0, opacity: hovered ? 1 : 0, transition: "opacity 0.4s", boxShadow: `inset 0 0 0 1px ${G}60` }} />

      {/* Год фото — сверху справа */}
      {actor.year && (
        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", fontFamily: "Oswald, sans-serif", fontSize: 9, letterSpacing: "0.4em", color: `${G}CC`, textTransform: "uppercase", background: `${BG}CC`, padding: "0.2rem 0.5rem" }}>
          {actor.year}
        </div>
      )}

      {/* Текст */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
        <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.15em", color: CREAM, textTransform: "uppercase", lineHeight: 1.2 }}>{actor.name}</h3>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", color: G, marginTop: "0.4rem" }}>{actor.role}</p>
        <p style={{ fontFamily: "Oswald, sans-serif", fontSize: 10, letterSpacing: "0.3em", color: DARK_ASH, textTransform: "uppercase", marginTop: "0.5rem" }}>{actor.note}</p>
      </div>
      {/* Золотая линия снизу при hover */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: G, transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.5s ease" }} />
    </div>
  );
}