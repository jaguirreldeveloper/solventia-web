import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Users, 
  Percent, 
  TrendingUp, 
  FileCheck2 
} from 'lucide-react';
import { COMPANY_INFO, LOAN_PLANS } from '../data/plans';
import { calculateMonthlyPayment, formatCurrency } from '../utils/amortization';

export default function Hero({ setView, setSelectedPlan }) {
  const [quickAmount, setQuickAmount] = useState(5000);
  const [quickTerm, setQuickTerm] = useState(12);
  const personalPlan = LOAN_PLANS.find(p => p.id === 'personal') || LOAN_PLANS[0];

  const quickMonthlyPayment = calculateMonthlyPayment(quickAmount, personalPlan.monthlyRate, quickTerm);

  const handleStartApplication = () => {
    setSelectedPlan('personal');
    setView('simulador');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative gradient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Contrato privado legal • Sin cobros por adelantado</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              Préstamos personales con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">cronograma claro</span> y cuotas fijas
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Obtén el respaldo financiero que necesitas con total transparencia. Desembolso en 24 horas, tasa fija sobre saldo y cronograma completo de pagos desde el primer día.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Cuotas fijas mensuales en Bolivianos</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Cancelación anticipada sin penalidad</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Evaluación de capacidad real de pago</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Entrega de cronograma por escrito</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setView('simulador')}
                className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Calculator className="w-5 h-5" />
                <span>Simular Mi Préstamo</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('planes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base px-6 py-3.5 rounded-xl border border-slate-700 transition"
              >
                <span>Ver Planes y Tasas</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Interactive Calculator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-black/40">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase font-bold text-blue-300 tracking-wider">Cálculo Rápido</span>
                  <h3 className="text-lg font-bold text-white">Simulador Preliminar</h3>
                </div>
                <div className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs rounded-full font-medium">
                  {personalPlan.monthlyRate}% mensual
                </div>
              </div>

              {/* Amount slider */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Monto deseado:</span>
                  <span className="text-xl font-extrabold text-white">{formatCurrency(quickAmount)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Bs 1.000</span>
                  <span>Bs 20.000</span>
                </div>
              </div>

              {/* Term slider */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Plazo de pago:</span>
                  <span className="text-xl font-extrabold text-white">{quickTerm} meses</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="1"
                  value={quickTerm}
                  onChange={(e) => setQuickTerm(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>6 meses</span>
                  <span>24 meses</span>
                </div>
              </div>

              {/* Results banner */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-400/20">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-blue-200 block font-medium">Cuota mensual estimada</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {formatCurrency(quickMonthlyPayment)}
                    </span>
                  </div>
                  <span className="text-xs text-slate-300">Cuota fija</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleStartApplication}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition"
                >
                  <FileCheck2 className="w-5 h-5" />
                  <span>Ver Cronograma y Solicitar</span>
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  Valores orientativos calculados bajo sistema francés de cuota fija.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Trust Metrics Bar */}
        <div className="mt-16 pt-12 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {COMPANY_INFO.stats.map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-200 block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
