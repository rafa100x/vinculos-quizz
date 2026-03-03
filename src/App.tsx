import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Target, User, MessageSquare, AlertCircle, CheckCircle2, ArrowRight, Lock, Star, ChevronRight, Menu, X, Phone } from 'lucide-react';

// --- Types ---
type View = 'quiz' | 'calculating' | 'landing';

// --- Components ---

const Quiz = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const steps = [
    {
      id: 1,
      type: 'intro',
      title: "No soltaste a cualquiera.",
      subtitle: "Soltaste a la mamá de tu hijo. Y eso dolió. Dios mío, cómo dolió.",
      button: "INICIAR DIAGNÓSTICO"
    },
    {
      id: 2,
      type: 'choice',
      question: "¿Qué te pesa más hoy?",
      options: [
        { id: 'A', text: "La culpa de ver a mis hijos en dos casas." },
        { id: 'B', text: "El vacío de la ilusión que se rompió." },
        { id: 'C', text: "Haber aguantado tanto tiempo sin respeto." }
      ]
    },
    {
      id: 3,
      type: 'choice',
      question: "¿Sentís que al quedarte 'por ellos', en realidad les estabas enseñando a aceptar migajas de amor?",
      options: [
        { id: 'yes', text: "Sí" },
        { id: 'sometimes', text: "A veces" },
        { id: 'no', text: "No me di cuenta" }
      ]
    },
    {
      id: 4,
      type: 'choice',
      question: "¿Cuántas veces al día un mensaje de ella te saca de tu centro y te arruina el foco?",
      options: [
        { id: 'low', text: "Frecuencia Baja" },
        { id: 'medium', text: "Frecuencia Media" },
        { id: 'high', text: "Frecuencia Alta" }
      ]
    },
    {
      id: 5,
      type: 'choice',
      question: "¿Quién sos hoy fuera de ese conflicto?",
      options: [
        { id: 'hostage', text: "Sigo siendo un rehén" },
        { id: 'rebuilding', text: "Estoy tratando de reconstruirme" },
        { id: 'noidea', text: "No tengo idea" }
      ]
    },
    {
      id: 6,
      type: 'final',
      question: "¿Estás listo para dejar de sanar en silencio y empezar a liderar tu vida como un hombre soberano?",
      button: "DAME MI HOJA DE RUTA"
    }
  ];

  const handleNext = (answer?: string) => {
    if (answer) setAnswers({ ...answers, [step]: answer });
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const currentStep = steps[step - 1];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-navy">
      <div className="max-w-2xl w-full">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-1">
            {steps.map((s, idx) => (
              <div 
                key={s.id} 
                className={`h-1 w-12 transition-all duration-500 ${idx + 1 <= step ? 'bg-crimson' : 'bg-white/10'}`}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Paso 0{step} / 0{steps.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-panel p-8 md:p-12 tactical-border relative overflow-hidden"
          >
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {currentStep.type === 'intro' && (
              <div className="text-center space-y-8">
                <h1 className="text-4xl md:text-5xl font-black leading-none">{currentStep.title}</h1>
                <p className="text-xl text-white/70 font-light italic">{currentStep.subtitle}</p>
                <button onClick={() => handleNext()} className="tactical-btn w-full md:w-auto">
                  {currentStep.button}
                </button>
              </div>
            )}

            {currentStep.type === 'choice' && (
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">{currentStep.question}</h2>
                <div className="grid gap-4">
                  {currentStep.options?.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleNext(opt.id)}
                      className="w-full text-left p-6 glass-panel hover:bg-white/10 border border-white/10 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg font-medium">{opt.text}</span>
                      <ChevronRight className="w-5 h-5 text-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep.type === 'final' && (
              <div className="text-center space-y-8">
                <Shield className="w-16 h-16 text-crimson mx-auto mb-4" />
                <h2 className="text-3xl font-bold leading-tight">{currentStep.question}</h2>
                <button onClick={() => handleNext()} className="tactical-btn w-full">
                  {currentStep.button}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Calculating = ({ onFinished }: { onFinished: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analizando perfil psicológico...");

  useEffect(() => {
    const statuses = [
      "Analizando perfil psicológico...",
      "Evaluando impacto en el legado familiar...",
      "Identificando bloqueos de soberanía...",
      "Calculando ruta de escape táctica...",
      "Generando Hoja de Ruta D.E.S.A.T.A.R..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinished, 500);
          return 100;
        }
        if (prev % 20 === 0 && prev > 0) {
          current++;
          setStatus(statuses[current] || statuses[statuses.length - 1]);
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
            <circle 
              cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" 
              strokeDasharray={377} 
              strokeDashoffset={377 - (377 * progress) / 100} 
              className="text-crimson transition-all duration-100" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl">
            {progress}%
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-crimson font-display uppercase tracking-widest text-sm animate-pulse">Calculando Estrategia Táctica</p>
          <p className="text-white/60 font-mono text-xs">{status}</p>
        </div>
      </div>
    </div>
  );
};

const CHECKOUT_URL = "https://goodsana.com/checkouts/cn/hWN9OLEZt2rgRPA8j3ffn8Rm/es-ar?_r=AQABh35obymE4wjHubkA7qDAKXQ1Wf6CywxTzOWacR-MCpY&cart_link_id=TrBsONxt";

const LandingPage = () => {
  const handleCheckout = () => {
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="bg-navy overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-crimson" />
            <span className="font-display font-black text-xl tracking-tighter">MÉTODO D.E.S.A.T.A.R.</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-display uppercase tracking-widest font-bold">
            <a href="#metodo" className="hover:text-crimson transition-colors">El Método</a>
            <a href="#bonos" className="hover:text-crimson transition-colors">Bonos</a>
            <a href="#testimonios" className="hover:text-crimson transition-colors">Testimonios</a>
          </div>
          <button onClick={handleCheckout} className="bg-crimson px-4 py-2 text-[10px] font-display font-bold uppercase tracking-widest cursor-pointer">Acceso Inmediato</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-crimson rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-1 border border-crimson/50 bg-crimson/10 text-crimson text-xs font-display font-bold uppercase tracking-[0.3em] mb-4">
              Hoja de Ruta Táctica para Padres
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
              DEJASTE DE SER SU REHÉN PARA SER EL <span className="text-crimson">PADRE QUE ELLOS MERECEN</span>
            </h1>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              No soltaste a cualquiera. Soltaste a la mujer con la que soñaste un futuro. El dolor es real, pero quedarte en un lugar sin paz es el peor legado para tus hijos.
            </p>
            <div className="pt-8">
              <button onClick={handleCheckout} className="tactical-btn text-xl px-12 py-6 w-full md:w-auto cursor-pointer">
                QUIERO MI SOBERANÍA AHORA
              </button>
              <p className="mt-4 text-xs font-mono text-white/40 flex items-center justify-center lg:justify-start gap-2">
                <Lock className="w-3 h-3" /> Pago Seguro & Acceso Instantáneo
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-crimson/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <img 
              src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/METODO_CORE_EMOCIONAL_PAZ_HIJOS.jpg?v=1770753490" 
              alt="Método D.E.S.A.T.A.R." 
              className="relative tactical-border w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Truth Bomb */}
      <section className="py-20 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <AlertCircle className="w-12 h-12 text-crimson mx-auto" />
          <h2 className="text-3xl md:text-5xl font-black italic">"Sanar no es una opción, es tu deber táctico"</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Quedarse atrapado en el resentimiento o la culpa no te hace "buen padre". Te hace un hombre ausente en cuerpo presente. Tus hijos no necesitan un mártir, necesitan un líder sano que les enseñe qué es el respeto propio.
          </p>
        </div>
      </section>

      {/* El Método - 5 Módulos */}
      <section id="metodo" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black">La Estructura del <span className="text-crimson">D.E.S.A.T.A.R.</span></h2>
            <p className="text-white/50 font-mono uppercase tracking-widest text-sm">5 Fases de Reconstrucción Masculina</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { title: "Desvincular", desc: "Corte de lazos emocionales y dependencia reactiva." },
              { title: "Estabilizar", desc: "Recuperar el control de tu sistema nervioso y foco." },
              { title: "Soberanía", desc: "Reclamar tu identidad fuera del rol de 'ex'." },
              { title: "Arquitectura", desc: "Diseño de tu nueva vida y entorno seguro." },
              { title: "Trascender", desc: "Liderar a tus hijos desde la paz, no desde la herida." }
            ].map((module, idx) => (
              <div key={idx} className="glass-panel p-8 tactical-border group hover:bg-crimson/5 transition-colors">
                <span className="text-5xl font-black text-white/5 group-hover:text-crimson/20 transition-colors block mb-4">0{idx + 1}</span>
                <h3 className="text-xl font-bold mb-3">{module.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonos */}
      <section id="bonos" className="py-24 px-4 bg-crimson/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-black">Arsenal <span className="text-crimson">Extra</span></h2>
              <p className="text-white/50 font-mono uppercase tracking-widest text-sm">Bonos de Acción Inmediata</p>
            </div>
            <div className="bg-white text-navy px-4 py-2 font-display font-black uppercase text-sm">Valor Total: +$100.000 ARS</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, title: "La Herida Invisible", desc: "Cómo sanar el trauma generacional de la ausencia.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B1_Herida_Invisible.jpg?v=1770753039" },
              { id: 2, title: "Superar la Traición", desc: "Protocolo para hombres que fueron engañados.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B2_Traicion.jpg?v=1770753038" },
              { id: 3, title: "Ex con Nueva Pareja", desc: "Gestión táctica de la ira y el ego herido.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B3_Ex_con_Pareja.jpg?v=1770753039" },
              { id: 4, title: "Padre en Guardia", desc: "Leyes y límites sanos en la coparentalidad.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B4_Padre_en_Guardia.jpg?v=1770753039" },
              { id: 5, title: "Protocolo de Estabilidad", desc: "Rutinas de alto rendimiento para días oscuros.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B5_Protocolo_Estabilidad.jpg?v=1770753039" }
            ].map((bono) => (
              <div key={bono.id} className="glass-panel overflow-hidden tactical-border group">
                <img 
                  src={bono.img} 
                  alt={bono.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 space-y-2">
                  <h4 className="font-bold text-lg">Bono #{bono.id}: {bono.title}</h4>
                  <p className="text-sm text-white/50">{bono.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Hombres en el <span className="text-crimson">Frente</span></h2>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-crimson text-crimson" />)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { name: "Diego", text: "Pensé que nunca iba a poder verla sin que me tiemble el pulso. Hoy fui a buscar a los nenes, me dijo de todo y yo ni pestañeé. El método funciona, brother.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_diego.jpg?v=1771112219" },
              { name: "Nicolas", text: "La culpa me estaba matando. Sentía que les fallé a mis hijos. D.E.S.A.T.A.R. me dio la estructura que necesitaba para volver a ser yo.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_nicolas.jpg?v=1771112219" },
              { name: "Martin", text: "Lo mejor son los bonos. El de 'Ex con nueva pareja' me salvó de cometer una locura. Gracias por hablarle claro a los hombres.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_martin.jpg?v=1771112220" },
              { name: "Lucas", text: "Recuperé mi centro. Mis hijos ahora ven a un padre presente y no a un hombre roto por el conflicto. Es impagable.", img: "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_lucas.jpg?v=1771112219" }
            ].map((t, idx) => (
              <div key={idx} className="glass-panel p-6 tactical-border flex gap-4 items-start">
                <img 
                  src={t.img} 
                  alt={t.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-crimson/30 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{t.name}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded uppercase font-bold tracking-tighter">Verificado</span>
                  </div>
                  <p className="text-white/70 italic leading-relaxed text-sm">"{t.text}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Screenshots */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/CHAT_01.png?v=1771105594",
              "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/CHAT_02.png?v=1771105594",
              "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/CHAT_03.png?v=1771105594"
            ].map((chat, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -inset-1 bg-crimson/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={chat} 
                  alt={`Chat Testimonial ${idx + 1}`} 
                  className="relative tactical-border w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Guarantee */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-crimson/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <img 
              src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/FULL_PACK_EMOCIONAL_FINAL.jpg?v=1770753608" 
              alt="Full Pack D.E.S.A.T.A.R." 
              className="relative tactical-border w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="glass-panel p-8 md:p-12 tactical-border text-center space-y-10 relative order-1 lg:order-2">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-crimson px-6 py-2 font-display font-black uppercase tracking-widest text-sm shadow-xl whitespace-nowrap">
              Oferta de Lanzamiento
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black">RECLAMÁ TU <span className="text-crimson">CENTRO</span></h2>
              <p className="text-white/60">Acceso de por vida al Método D.E.S.A.T.A.R. + Los 5 Bonos Exclusivos.</p>
            </div>

            <div className="space-y-2">
              <div className="text-white/30 line-through text-2xl font-display">$100.000 ARS</div>
              <div className="text-7xl font-black text-white">$18.990 <span className="text-2xl font-display text-white/50">ARS</span></div>
              <p className="text-crimson font-bold uppercase tracking-widest text-sm">Pago único. Sin suscripciones.</p>
            </div>

            <button onClick={handleCheckout} className="tactical-btn w-full text-xl py-6 cursor-pointer">
              SÍ, QUIERO SER UN HOMBRE SOBERANO
            </button>

            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="flex items-center gap-4 text-left">
                <Shield className="w-12 h-12 text-crimson shrink-0" />
                <div>
                  <h4 className="font-bold uppercase text-sm">7 Días de Soberanía</h4>
                  <p className="text-xs text-white/50">Si el método no te da la paz que buscás, te devolvemos el 100%.</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/Captura_de_pantalla_2026-02-10_a_la_s_07.35.08.png?v=1770719727" 
                  alt="Sello de Seguridad" 
                  className="h-16 w-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Pagá de forma segura con:</p>
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/mercadopago_logo.jpg?v=1772498390" 
                    alt="Mercado Pago" 
                    className="h-10 w-auto rounded-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 opacity-50">
          <Shield className="w-4 h-4" />
          <span className="font-display font-black text-sm tracking-tighter">MÉTODO D.E.S.A.T.A.R.</span>
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-widest">
          © {new Date().getFullYear()} - Todos los derechos reservados. No somos parte de Facebook o Google.
        </p>
      </footer>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('quiz');

  return (
    <main className="min-h-screen bg-navy selection:bg-crimson selection:text-white">
      {view === 'quiz' && (
        <Quiz onComplete={() => setView('calculating')} />
      )}
      
      {view === 'calculating' && (
        <Calculating onFinished={() => setView('landing')} />
      )}

      {view === 'landing' && (
        <LandingPage />
      )}
    </main>
  );
}
