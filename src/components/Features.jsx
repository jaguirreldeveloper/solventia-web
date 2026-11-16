import React from 'react';
import { FileText, CalendarDays, UserCheck, ShieldAlert, Check } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: FileText,
      color: 'bg-blue-600',
      title: 'Contrato Privado y Claro',
      description: 'Cada préstamo se respalda formalmente con un contrato privado firmado donde se estipulan montos, tasas, plazos y condiciones sin ambigüedades.'
    },
    {
      icon: CalendarDays,
      color: 'bg-indigo-600',
      title: 'Cronograma a Tu Medida',
      description: 'Recibes desde el primer momento tu tabla de amortización detallada: sabes exactamente qué parte va a interés y qué parte amortiza tu capital.'
    },
    {
      icon: UserCheck,
      color: 'bg-emerald-600',
      title: 'Evaluación Flexible',
      description: 'Analizamos tu capacidad real de pago actual y tus ingresos demostrables, brindando alternativas tanto a dependientes como a trabajadores independientes.'
    },
    {
      icon: ShieldAlert,
      color: 'bg-sky-600',
      title: 'Sin Costos Ocultos',
      description: 'Cero comisiones por apertura, sin gastos administrativos sorpresa ni penalizaciones si decides liquidar o abonar a capital anticipadamente.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Seguridad y Transparencia
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Por qué elegir <span className="text-blue-600">Mi Préstamo Digital</span>?
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Eliminamos la incertidumbre de los préstamos tradicionales. Te brindamos seguridad legal, trato cercano y reglas de juego claras desde la primera consulta.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i} 
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center text-white mb-5 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
