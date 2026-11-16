import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Printer, 
  FileSpreadsheet, 
  CheckCircle2, 
  Info, 
  Sparkles,
  Calendar,
  DollarSign,
  TrendingDown
} from 'lucide-react';
import { LOAN_PLANS } from '../data/plans';
import { 
  calculateMonthlyPayment, 
  generateSchedule, 
  formatCurrency, 
  formatDate 
} from '../utils/amortization';

export default function SimulatorPage({ 
  selectedPlanId, 
  setSelectedPlanId, 
  simulationParams, 
  setSimulationParams, 
  setView 
}) {
  const currentPlan = useMemo(() => {
    return LOAN_PLANS.find(p => p.id === selectedPlanId) || LOAN_PLANS[1];
  }, [selectedPlanId]);

  const [amount, setAmount] = useState(
    simulationParams?.amount || currentPlan.defaultAmount
  );
  const [term, setTerm] = useState(
    simulationParams?.term || currentPlan.defaultTerm
  );

  // Sync state if plan changes
  useEffect(() => {
    if (amount < currentPlan.minAmount) setAmount(currentPlan.minAmount);
    if (amount > currentPlan.maxAmount) setAmount(currentPlan.maxAmount);
    if (term < currentPlan.minTerm) setTerm(currentPlan.minTerm);
    if (term > currentPlan.maxTerm) setTerm(currentPlan.maxTerm);
  }, [selectedPlanId, currentPlan]);

  // Compute schedule and totals
  const schedule = useMemo(() => {
    return generateSchedule(amount, currentPlan.monthlyRate, term);
  }, [amount, currentPlan.monthlyRate, term]);

  const monthlyPayment = useMemo(() => {
    return calculateMonthlyPayment(amount, currentPlan.monthlyRate, term);
  }, [amount, currentPlan.monthlyRate, term]);

  const totalInterest = useMemo(() => {
    return schedule.reduce((acc, curr) => acc + curr.interest, 0);
  }, [schedule]);

  const totalToPay = amount + totalInterest;

  const handleApply = () => {
    setSimulationParams({
      planId: currentPlan.id,
      amount,
      term,
      monthlyPayment,
      totalInterest,
      totalToPay
    });
    setView('solicitud');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Herramienta Financiera en Tiempo Real
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simulador de Cuotas y Cronograma de Pagos
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Ajusta el monto y plazo para visualizar tu cuota fija mensual y la tabla de amortización detallada bajo sistema francés.
          </p>
        </div>

        {/* Plan Selector Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-2">
          {LOAN_PLANS.map((plan) => {
            const isSelected = plan.id === currentPlan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'bg-transparent text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm block">{plan.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {plan.monthlyRate}% mes
                  </span>
                </div>
                <span className={`text-[11px] block mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  Hasta {formatCurrency(plan.maxAmount)} • {plan.maxTerm} meses
                </span>
              </button>
            );
          })}
        </div>

        {/* Main interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            
            {/* Plan Info Banner */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900">
                <span className="font-bold block text-sm mb-0.5">{currentPlan.name}</span>
                {currentPlan.description}
              </div>
            </div>

            {/* Amount Slider & Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800">
                  Monto a solicitar (en Bolivianos):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={currentPlan.minAmount}
                    max={currentPlan.maxAmount}
                    step={currentPlan.stepAmount}
                    value={amount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAmount(val);
                    }}
                    className="w-36 text-right font-bold text-blue-600 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-base focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-2.5 top-2 text-xs font-semibold text-slate-400">Bs</span>
                </div>
              </div>

              <input
                type="range"
                min={currentPlan.minAmount}
                max={currentPlan.maxAmount}
                step={currentPlan.stepAmount}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Mínimo: {formatCurrency(currentPlan.minAmount)}</span>
                <span>Máximo: {formatCurrency(currentPlan.maxAmount)}</span>
              </div>
            </div>

            {/* Term Slider & Selector */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800">
                  Plazo de devolución (meses):
                </label>
                <span className="text-lg font-bold text-blue-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-300">
                  {term} meses
                </span>
              </div>

              <input
                type="range"
                min={currentPlan.minTerm}
                max={currentPlan.maxTerm}
                step={currentPlan.stepTerm}
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>{currentPlan.minTerm} meses</span>
                <span>{currentPlan.maxTerm} meses</span>
              </div>
            </div>

            {/* Requirements reminder */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Documentos requeridos para este plan:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {currentPlan.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-bold text-blue-300 tracking-wider">
                  Resumen de la Simulación
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full font-medium">
                  Tasa: {currentPlan.monthlyRate}% mensual
                </span>
              </div>

              {/* Big Monthly Installment */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-blue-200 block font-medium">Cuota Mensual Fija</span>
                <span className="text-3xl sm:text-4xl font-black text-white block mt-1">
                  {formatCurrency(monthlyPayment)}
                </span>
                <span className="text-[11px] text-slate-300 mt-1 block">
                  Por {term} meses consecutivos
                </span>
              </div>

              {/* Financial metrics breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Capital Solicitado:</span>
                  <span className="font-bold text-white">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Total Intereses a pagar:</span>
                  <span className="font-bold text-blue-300">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10 text-sm">
                  <span className="text-white font-semibold">Total a Devolver:</span>
                  <span className="font-black text-emerald-400">{formatCurrency(totalToPay)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={handleApply}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition transform hover:scale-[1.02] active:scale-95"
                >
                  <span>Solicitar este Préstamo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-3 px-4 rounded-xl border border-white/10 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Descargar Cronograma</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Cálculo conforme al Código de Comercio para contratos privados de crédito. Sin costos ocultos.
              </p>

            </div>

          </div>

        </div>

        {/* Amortization Schedule Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                Cronograma Oficial de Pagos
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Detalle mensual de cada una de tus {term} cuotas fijas (capital, interés y saldo amortizado).
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 transition"
            >
              <Printer className="w-4 h-4" />
              Imprimir Tabla
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nº Cuota</th>
                  <th className="py-3 px-4">Vencimiento</th>
                  <th className="py-3 px-4 text-right">Cuota Fija</th>
                  <th className="py-3 px-4 text-right">Interés</th>
                  <th className="py-3 px-4 text-right">Amortización Capital</th>
                  <th className="py-3 px-4 text-right">Saldo Deudor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {schedule.map((row) => (
                  <tr key={row.installmentNumber} className="hover:bg-blue-50/50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      Cuota {row.installmentNumber}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {formatDate(row.dueDate)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600">
                      {formatCurrency(row.payment)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-600">
                      {formatCurrency(row.principalAmortization)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-800">
                      {formatCurrency(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-200 text-xs">
                <tr>
                  <td colSpan="2" className="py-3 px-4">Totales consolidados:</td>
                  <td className="py-3 px-4 text-right text-blue-700">{formatCurrency(totalToPay)}</td>
                  <td className="py-3 px-4 text-right text-slate-700">{formatCurrency(totalInterest)}</td>
                  <td className="py-3 px-4 text-right text-emerald-700">{formatCurrency(amount)}</td>
                  <td className="py-3 px-4 text-right text-slate-400">Bs 0,00</td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
