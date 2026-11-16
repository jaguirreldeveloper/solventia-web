import React from 'react';
import { Calculator, Send, FileSignature, Wallet, ArrowRight } from 'lucide-react';

export default function HowItWorks({ setView }) {
  const steps = [
    {
      num: '01',
      icon: Calculator,
      title: 'Simula tu Cuota',
      desc: 'Elige el plan, ajusta el monto y plazo que necesitas. Conoce tu cuota exacta y el desglose de amortización.'
    },
    {
      num: '02',
      icon: Send,
      title: 'Envía tu Solicitud',
      desc: 'Completa el formulario digital en menos de 3 minutos con tus datos personales y comprobantes básicos.'
    },
    {
      num: '03',
      icon: FileSignature,
      title: 'Revisión y Firma',
      desc: 'Analizamos tu solicitud en 24h. Si es aprobada, firmamos el contrato privado que garantiza tus condiciones.'
    },
    {
      num: '04',
      icon: Wallet,
      title: 'Desembolso y Cronograma',
      desc: 'Recibes el dinero directamente en tu cuenta bancaria y tu cronograma oficial de pagos para tu control.'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Paso a Paso
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Cómo obtener tu préstamo?
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Un proceso ágil, digital y 100% transparente para que tengas tu dinero sin complicaciones.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 select-none">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600 flex items-center gap-1">
                  <span>Paso {idx + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-950/20">
          <div>
            <h3 className="text-2xl font-bold">¿Listo para comenzar tu simulación?</h3>
            <p className="text-sm text-blue-200 mt-1 max-w-xl">
              Descubre cuánto pagarías mes a mes y revisa tu tabla de pagos en tiempo real sin ningún compromiso.
            </p>
          </div>
          <button
            onClick={() => { setView('simulador'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="shrink-0 flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl transition shadow-lg"
          >
            <span>Ir al Simulador</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
