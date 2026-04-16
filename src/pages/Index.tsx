import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/2bf55140-c107-4927-8a64-d4db81a2870b/files/e4d34ba8-5d66-4e45-ab18-19e36d775aa2.jpg",
  director: "https://cdn.poehali.dev/projects/2bf55140-c107-4927-8a64-d4db81a2870b/files/7a5f2d71-f257-43c0-bc61-cdcc901df0a0.jpg",
  scene: "https://cdn.poehali.dev/projects/2bf55140-c107-4927-8a64-d4db81a2870b/files/abbbfbae-112a-49a0-a527-821aff7cce1b.jpg",
  cast: "https://cdn.poehali.dev/projects/2bf55140-c107-4927-8a64-d4db81a2870b/files/c772fb22-ee04-4ad7-b1ea-d62cec9c2e6a.jpg",
};

const ACTORS = [
  { name: "Алексей Серов", role: "Следователь Кравцов", award: "Лауреат премии «Ника»" },
  { name: "Марина Волкова", role: "Елена Данилова", award: "Номинант БАФТА" },
  { name: "Виктор Чернов", role: "Профессор Остров", award: "Заслуженный артист РФ" },
  { name: "Ирина Беляева", role: "Анна Крест", award: "Лауреат «Золотого орла»" },
];

const SCENES = [
  { title: "Допрос", desc: "Сцена психологического противостояния в подвале старого особняка" },
  { title: "Бегство", desc: "Ночная погоня по заснеженным улицам портового города" },
  { title: "Откровение", desc: "Финальное столкновение с правдой в заброшенном театре" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
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
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ParallaxImage({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * 80;
      img.style.transform = `translateY(${offset}px) scale(1.15)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        ref={imgRef}
        className="w-full h-full bg-cover bg-center transition-transform duration-100"
        style={{ backgroundImage: `url(${src})` }}
      />
    </div>
  );
}

export default function Index() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-film-dark text-film-cream min-h-screen font-display overflow-x-hidden">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[10vh] bg-film-dark z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-film-dark z-20" />

        {/* BG with zoom */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${IMAGES.hero})`,
              transform: `scale(${1 + scrollY * 0.0003})`,
              transition: "transform 0.1s linear",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-film-dark/70 via-film-dark/40 to-film-dark/90" />
        </div>

        {/* Gold lines */}
        <div
          className="absolute top-[10vh] left-0 right-0 h-[1px] z-30"
          style={{
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 2s ease 0.5s",
          }}
        />
        <div
          className="absolute bottom-[10vh] left-0 right-0 h-[1px] z-30"
          style={{
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 2s ease 0.5s",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div
            className="font-heading text-xs tracking-[0.5em] text-film-gold mb-6 uppercase"
            style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 1.5s ease 0.3s" }}
          >
            Премьера сезона · 2024
          </div>
          <h1
            className="font-heading text-[clamp(3rem,10vw,8rem)] font-light tracking-[0.15em] leading-none text-film-cream uppercase"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1.5s ease 0.6s, transform 1.5s ease 0.6s",
              textShadow: "0 0 80px rgba(201,168,76,0.3)",
            }}
          >
            ТЕНИ
            <br />
            <span className="text-film-gold" style={{ animation: "title-flicker 4s ease-in-out infinite" }}>ПРОШЛОГО</span>
          </h1>
          <div
            className="font-display italic text-[clamp(0.9rem,2vw,1.3rem)] text-film-ash mt-6 tracking-widest"
            style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 1.5s ease 1.2s" }}
          >
            «Правда не умирает. Она только ждёт.»
          </div>

          <div
            className="mt-16 flex flex-col items-center gap-2"
            style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 2s" }}
          >
            <span className="font-heading text-[10px] tracking-[0.4em] text-film-ash uppercase">Прокрутить</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-film-gold to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════ РЕЖИССЁР ═══════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection delay={0}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-film-gold/20" />
                <div className="aspect-[3/4] overflow-hidden">
                  <ParallaxImage src={IMAGES.director} className="w-full h-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-film-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="w-8 h-[1px] bg-film-gold inline-block mr-3 mb-1" />
                  <span className="font-heading text-[10px] tracking-[0.4em] text-film-gold uppercase">Режиссёр</span>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="space-y-8">
                <div>
                  <div className="font-heading text-[10px] tracking-[0.5em] text-film-gold uppercase mb-4">Постановщик фильма</div>
                  <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-light tracking-wider text-film-cream leading-none">
                    АНДРЕЙ<br />
                    <span className="text-film-gold">МИРОНОВ</span>
                  </h2>
                </div>

                <div className="w-16 h-[1px] bg-film-gold/40" />

                <p className="font-display text-film-ash text-lg leading-relaxed italic">
                  Лауреат Каннского фестиваля, чьи работы отличаются беспощадной честностью
                  к человеческой природе. Новый фильм — это вершина двадцатилетней карьеры.
                </p>

                <div className="space-y-3">
                  {["Каннский фестиваль — Гран-при жюри", "Берлинский кинофестиваль — Серебряный медведь", "Премия «Золотой орёл» — Лучший режиссёр"].map((award, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-film-gold flex-shrink-0" />
                      <span className="font-heading text-[11px] tracking-[0.3em] text-film-ash uppercase">{award}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="font-display italic text-film-cream/60 text-sm border-l-2 border-film-gold pl-4">
                    «Каждый кадр — это исповедь. Я не снимаю фильмы, я извлекаю правду.»
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══════════ СЮЖЕТ ═══════════ */}
      <section className="relative py-32 overflow-hidden">
        <ParallaxImage src={IMAGES.scene} className="absolute inset-0 w-full h-full opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-film-dark via-film-dark/80 to-film-dark" />

        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent 10%, #C9A84C40 50%, transparent 90%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent 10%, #C9A84C40 50%, transparent 90%)" }} />

        <div className="relative z-10 container max-w-6xl mx-auto px-6">
          <RevealSection>
            <div className="max-w-3xl">
              <div className="font-heading text-[10px] tracking-[0.5em] text-film-gold uppercase mb-6">Сюжет и интрига</div>
              <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-light tracking-wider text-film-cream leading-tight mb-10">
                КОГДА ПРОШЛОЕ<br />
                <span className="text-film-gold">ВОЗВРАЩАЕТСЯ</span>
              </h2>

              <div className="space-y-6 text-film-ash font-display text-xl leading-relaxed">
                <p>
                  <span className="text-film-gold italic text-2xl">С</span>ледователь Кравцов приезжает в заснеженный приморский город,
                  чтобы раскрыть самоубийство известного профессора. Но чем глубже он копает,
                  тем яснее становится: здесь никто не тот, кем кажется.
                </p>
                <p>
                  За фасадами респектабельных домов скрываются десятилетия тайн, предательств
                  и преступлений, которые давно считались забытыми. И кто-то очень хочет,
                  чтобы они такими и оставались.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {["Триллер", "Психологическая драма", "16+", "138 минут"].map((tag, i) => (
                  <span key={i} className="font-heading text-[10px] tracking-[0.3em] uppercase border border-film-gold/30 text-film-gold px-4 py-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ АКТЁРЫ ═══════════ */}
      <section className="relative py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-20">
              <div className="font-heading text-[10px] tracking-[0.5em] text-film-gold uppercase mb-4">В главных ролях</div>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-light tracking-wider text-film-cream">
                АКТЁРСКИЙ СОСТАВ
              </h2>
              <div className="w-24 h-[1px] bg-film-gold/40 mx-auto mt-6" />
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {ACTORS.map((actor, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div className="group relative overflow-hidden aspect-[3/4] bg-film-charcoal cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${IMAGES.cast})`,
                      backgroundPosition: `${(i % 2) * 50}% ${Math.floor(i / 2) * 50}%`,
                      filter: "grayscale(60%) contrast(1.1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-film-dark via-film-dark/20 to-transparent" />
                  <div className="absolute inset-0 bg-film-gold/0 group-hover:bg-film-gold/10 transition-colors duration-500" />

                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-film-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="font-heading text-[9px] tracking-[0.4em] text-film-gold uppercase mb-2">{actor.award}</div>
                    <h3 className="font-heading text-xl font-light tracking-wider text-film-cream leading-tight">{actor.name}</h3>
                    <p className="font-display italic text-film-ash text-sm mt-1">{actor.role}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ КЛЮЧЕВЫЕ СЦЕНЫ ═══════════ */}
      <section className="relative py-32 bg-film-charcoal">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #C9A84C60, transparent)" }} />
        <div className="container max-w-6xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-20">
              <div className="font-heading text-[10px] tracking-[0.5em] text-film-gold uppercase mb-4">Из фильма</div>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-light tracking-wider text-film-cream">
                КЛЮЧЕВЫЕ СЦЕНЫ
              </h2>
              <div className="w-24 h-[1px] bg-film-gold/40 mx-auto mt-6" />
            </div>
          </RevealSection>

          <div className="space-y-2">
            {SCENES.map((scene, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="group relative overflow-hidden" style={{ aspectRatio: "16/6" }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${i === 0 ? IMAGES.hero : i === 1 ? IMAGES.scene : IMAGES.director})`,
                      filter: "grayscale(40%) brightness(0.6)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-film-dark/80 via-transparent to-film-dark/40" />

                  <div className="absolute top-0 left-0 right-0 h-[8%] bg-film-dark" />
                  <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-film-dark" />

                  <div className="absolute inset-[8%] flex items-center">
                    <div className="flex items-center gap-8">
                      <div className="font-heading text-[clamp(3rem,6vw,5rem)] font-light text-film-gold/20 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-heading text-[clamp(1.2rem,3vw,2rem)] font-light tracking-[0.2em] text-film-cream uppercase">{scene.title}</h3>
                        <p className="font-display italic text-film-ash text-sm mt-1">{scene.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute right-8 inset-y-[8%] flex items-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-12 h-12 rounded-full border border-film-gold/60 flex items-center justify-center">
                        <Icon name="Play" size={16} className="text-film-gold ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ФИНАЛ / CTA ═══════════ */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center animate-zoom-slow"
            style={{
              backgroundImage: `url(${IMAGES.scene})`,
              filter: "grayscale(80%) brightness(0.3)",
            }}
          />
          <div className="absolute inset-0 bg-film-dark/70" />
        </div>

        <div className="relative z-10 text-center px-6">
          <RevealSection>
            <div className="font-heading text-[10px] tracking-[0.5em] text-film-gold uppercase mb-6">Скоро в кино</div>
            <h2 className="font-heading text-[clamp(2.5rem,8vw,7rem)] font-light tracking-[0.15em] text-film-cream leading-none mb-4">
              14 НОЯБРЯ
            </h2>
            <div className="font-display italic text-film-ash text-xl mb-12">Некоторые тайны лучше не раскрывать</div>

            <button className="font-heading text-[11px] tracking-[0.5em] uppercase text-film-dark bg-film-gold px-12 py-4 hover:bg-film-cream transition-colors duration-300 cursor-pointer">
              Купить билет
            </button>

            <div className="mt-16 flex justify-center gap-12 flex-wrap">
              {["12+", "Русские субтитры", "IMAX доступен"].map((info, i) => (
                <div key={i} className="font-heading text-[9px] tracking-[0.4em] text-film-ash uppercase">{info}</div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-film-gold/10 py-12">
        <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-heading text-xs tracking-[0.4em] text-film-ash uppercase">
            © 2024 Киностудия «Меридиан» · Все права защищены
          </div>
          <div className="font-heading text-[10px] tracking-[0.3em] text-film-gold uppercase">
            ТЕНИ ПРОШЛОГО
          </div>
          <div className="font-heading text-xs tracking-[0.3em] text-film-ash uppercase">
            Возрастное ограничение: 16+
          </div>
        </div>
      </footer>
    </div>
  );
}
