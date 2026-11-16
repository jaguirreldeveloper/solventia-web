import React from 'react';
import { Check, ArrowRight, Sparkles, Percent, Calendar, Banknote } from 'lucide-react';
import { LOAN_PLANS } from '../data/plans';
import { formatCurrency } from '../utils/amortization';

export default function PlansSection({ setView, setSelectedPlan }) {
  const handleSelect = (planId, targetView) => {
    setSelectedPlan(planId);
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="planes" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Portafolio Financiero
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Planes adaptados a tu necesidad real
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Escoge la opción adecuada según tus requerimientos. Todas nuestras tasas son mensuales y calculadas sobre saldo amortizable.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOAN_PLANS.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-100 lg:-translate-y-2'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {/* Popular tag */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md shadow-blue-600/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Más Elegido</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="pb-4 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.tagline}</p>
                  </div>

                  {/* Rate highlight */}
                  <div className="py-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                        {plan.monthlyRate}%
                      </span>
                      <span className="text-xs font-medium text-slate-500">mensual</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Tasa fija calculada sobre saldo</span>
                  </div>

                  {/* Key specs */}
                  <div className="space-y-3 py-4 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-slate-400" />
                        Monto:
                      </span>
                      <span className="font-bold text-slate-800">
                        {formatCurrency(plan.minAmount)} - {formatCurrency(plan.maxAmount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        Plazo:
                      </span>
                      <span className="font-bold text-slate-800">
                        {plan.minTerm} a {plan.maxTerm} meses
                      </span>
                    </div>
                  </div>

                  {/* Requirements List */}
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Requisitos Básicos:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {plan.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-8 pt-4 space-y-2 border-t border-slate-100">
                  <button
                    onClick={() => handleSelect(plan.id, 'simulador')}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>Simular Cuotas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleSelect(plan.id, 'solicitud')}
                    className="w-full text-center text-xs text-blue-600 hover:text-blue-800 font-semibold py-1.5 transition"
                  >
                    Solicitar directamente
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
