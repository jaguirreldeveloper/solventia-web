import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileCheck, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Building,
  DollarSign
} from 'lucide-react';
import { formatCurrency, formatDate, generateSchedule } from '../utils/amortization';
import { COMPANY_INFO } from '../data/plans';

export default function TrackingPage({ setView }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLoan, setActiveLoan] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [localApplications, setLocalApplications] = useState([]);

  // Load applications from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('solventia_applications') || '[]');
      setLocalApplications(saved);
      // If there are submitted applications, select the first one by default for great UX
      if (saved.length > 0) {
        loadLoanData(saved[0]);
      } else {
        // Load default demo loan
        loadDemoLoan();
      }
    } catch (e) {
      loadDemoLoan();
    }
  }, []);

  const loadDemoLoan = () => {
    const principal = 10000;
    const monthlyRate = 3.0;
    const term = 12;
    const pastMonths = 4;
    
    // Start date 4 months ago
    const start = new Date();
    start.setMonth(start.getMonth() - pastMonths);
    const schedule = generateSchedule(principal, monthlyRate, term, start);

    // Mark past installments as paid
    const enrichedSchedule = schedule.map((item, idx) => {
      if (idx < pastMonths) {
        return { ...item, status: 'Pagado' };
      } else if (idx === pastMonths) {
        return { ...item, status: 'Próximo a Vencer' };
      } else {
        return { ...item, status: 'Pendiente' };
      }
    });

    const paidCount = pastMonths;
    const remainingBalance = enrichedSchedule[pastMonths - 1]?.remainingBalance || principal;

    setActiveLoan({
      code: 'SLV-2026-DEMO',
      holder: 'Carlos René Morales',
      ci: '4892014 LP',
      planName: 'Préstamo Personal',
      amount: principal,
      term: term,
      monthlyRate: monthlyRate,
      status: 'Activo / Al Día',
      disbursementDate: start,
      paidCount: paidCount,
      remainingBalance: remainingBalance,
      nextDueDate: enrichedSchedule[pastMonths]?.dueDate,
      nextPaymentAmount: enrichedSchedule[pastMonths]?.payment,
      schedule: enrichedSchedule
    });
  };

  const loadLoanData = (app) => {
    const schedule = generateSchedule(app.amount, app.monthlyRate || 3.0, app.term);
    const enriched = schedule.map((item, idx) => ({
      ...item,
      status: idx === 0 ? 'En proceso de aprobación' : 'Pendiente'
    }));

    setActiveLoan({
      code: app.code,
      holder: app.fullName,
      ci: `${app.ci} ${app.ciExp || ''}`,
      planName: app.planName || 'Préstamo Personal',
      amount: app.amount,
      term: app.term,
      monthlyRate: app.monthlyRate || 3.0,
      status: app.status || 'En Evaluación (24h)',
      disbursementDate: new Date(app.date),
      paidCount: 0,
      remainingBalance: app.amount,
      nextDueDate: schedule[0]?.dueDate,
      nextPaymentAmount: app.monthlyPayment,
      schedule: enriched
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const clean = searchQuery.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Por favor ingresa un código de seguimiento, C.I. o correo.');
      return;
    }

    if (clean.includes('DEMO')) {
      loadDemoLoan();
      return;
    }

    const found = localApplications.find(
      app => app.code.toUpperCase() === clean || 
             app.ci === clean || 
             (app.email && app.email.toUpperCase() === clean)
    );

    if (found) {
      loadLoanData(found);
    } else {
      setErrorMsg(`No se encontró ningún préstamo o solicitud activa con el término "${searchQuery}". Puedes revisar tu código o cargar el caso demo.`);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            Portal de Transparencia
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Consulta de Estado y Cronograma de Préstamos
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Ingresa tu código de seguimiento o número de documento para consultar tu balance, próximas cuotas y cronograma amortizable.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Ej. SLV-2026-DEMO o tu Cédula de Identidad"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <span>Consultar</span>
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick preset buttons */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Pruebas rápidas:</span>
            <button
              onClick={loadDemoLoan}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-medium transition"
            >
              Ver Préstamo Demo Activo (SLV-2026-DEMO)
            </button>
            {localApplications.length > 0 && (
              <button
                onClick={() => loadLoanData(localApplications[0])}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium transition"
              >
                Ver Mi Solicitud Reciente ({localApplications[0].code})
              </button>
            )}
          </div>
        </div>

        {/* Loan Details View */}
        {activeLoan && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Overview Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {activeLoan.code}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      activeLoan.status.includes('Activo') 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {activeLoan.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    {activeLoan.holder}
                  </h2>
                  <p className="text-xs text-slate-500">
                    C.I.: {activeLoan.ci} • Plan: {activeLoan.planName}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir Estado</span>
                  </button>
                </div>
              </div>

              {/* Progress & Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 block">Monto Original</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">
                    {formatCurrency(activeLoan.amount)}
                  </span>
                  <span className="text-[11px] text-slate-400">Tasa: {activeLoan.monthlyRate}% mes</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 block">Saldo Capital Pendiente</span>
                  <span className="text-xl font-extrabold text-blue-600 mt-0.5 block">
                    {formatCurrency(activeLoan.remainingBalance)}
                  </span>
                  <span className="text-[11px] text-slate-400">Sobre capital amortizado</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 block">Próximo Vencimiento</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">
                    {formatDate(activeLoan.nextDueDate)}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    Cuota: {formatCurrency(activeLoan.nextPaymentAmount)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 block">Avance del Crédito</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">
                    {activeLoan.paidCount} de {activeLoan.term} cuotas
                  </span>
                  <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(activeLoan.paidCount / activeLoan.term) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Schedule Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Cronograma de Cuotas y Estado de Pagos
                </h3>
                <span className="text-xs text-slate-500">
                  {activeLoan.term} cuotas mensuales pactadas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Nº Cuota</th>
                      <th className="py-3 px-4">Fecha Límite</th>
                      <th className="py-3 px-4 text-right">Monto Cuota</th>
                      <th className="py-3 px-4 text-right">Interés</th>
                      <th className="py-3 px-4 text-right">Capital</th>
                      <th className="py-3 px-4 text-right">Saldo Restante</th>
                      <th className="py-3 px-4 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {activeLoan.schedule.map((row) => (
                      <tr 
                        key={row.installmentNumber} 
                        className={`transition ${
                          row.status === 'Pagado' 
                            ? 'bg-emerald-50/40 text-slate-700' 
                            : row.status === 'Próximo a Vencer'
                            ? 'bg-amber-50/60 font-semibold text-slate-900'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-4 font-bold text-slate-900">
                          Cuota {row.installmentNumber}
                        </td>
                        <td className="py-3 px-4">
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
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            row.status === 'Pagado'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : row.status === 'Próximo a Vencer'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {row.status === 'Pagado' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Help & WhatsApp direct payment coordinator */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                <span className="text-slate-500">
                  ¿Deseas reportar un comprobante de pago o realizar amortización anticipada?
                </span>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola,%20deseo%20reportar%20pago%20o%20consultar%20mi%20préstamo%20${activeLoan.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-xl transition"
                >
                  Contactar Asesor de Cobranzas por WhatsApp
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
