import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Calculator,
  User,
  CreditCard,
  Building,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { LOAN_PLANS, COMPANY_INFO } from '../data/plans';
import { calculateMonthlyPayment, formatCurrency } from '../utils/amortization';

export default function ApplicationPage({ 
  simulationParams, 
  selectedPlanId, 
  setSelectedPlanId, 
  setView 
}) {
  const [planId, setPlanId] = useState(simulationParams?.planId || selectedPlanId || 'personal');
  const activePlan = LOAN_PLANS.find(p => p.id === planId) || LOAN_PLANS[1];

  const [amount, setAmount] = useState(
    simulationParams?.amount || activePlan.defaultAmount
  );
  const [term, setTerm] = useState(
    simulationParams?.term || activePlan.defaultTerm
  );

  const [formData, setFormData] = useState({
    fullName: '',
    ci: '',
    ciExp: 'LP',
    phone: '',
    email: '',
    city: 'La Paz',
    address: '',
    employmentType: 'Dependiente del sector privado',
    companyName: '',
    monthlyIncome: '',
    destination: 'Gastos personales o familiares',
    preferredChannel: 'WhatsApp',
    acceptTerms: true
  });

  const [submittedCode, setSubmittedCode] = useState(null);
  const [copied, setCopied] = useState(false);

  // Sync amount / term when plan changes
  useEffect(() => {
    if (amount < activePlan.minAmount) setAmount(activePlan.minAmount);
    if (amount > activePlan.maxAmount) setAmount(activePlan.maxAmount);
    if (term < activePlan.minTerm) setTerm(activePlan.minTerm);
    if (term > activePlan.maxTerm) setTerm(activePlan.maxTerm);
  }, [planId, activePlan]);

  const monthlyPayment = calculateMonthlyPayment(amount, activePlan.monthlyRate, term);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate unique tracking code e.g. MPD-2026-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const code = `MPD-2026-${randomDigits}`;

    const newApplication = {
      code,
      date: new Date().toISOString(),
      status: 'En Revisión (24h)',
      planName: activePlan.name,
      planId: activePlan.id,
      monthlyRate: activePlan.monthlyRate,
      amount,
      term,
      monthlyPayment,
      ...formData
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('mpd_applications') || '[]');
      existing.unshift(newApplication);
      localStorage.setItem('mpd_applications', JSON.stringify(existing));
    } catch (err) {
      console.error('Error saving application to storage', err);
    }

    setSubmittedCode(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCode = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (submittedCode) {
    return (
      <div className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
            
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ¡Solicitud Registrada con Éxito!
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Hemos recibido tu solicitud de préstamo
              </h1>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Tu solicitud ha sido ingresada a nuestra mesa de evaluación crediticia. Un oficial de crédito revisará tu perfil en un plazo máximo de 24 horas hábiles.
              </p>
            </div>

            {/* Tracking Code Badge */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl max-w-md mx-auto space-y-2">
              <span className="text-xs text-slate-400 block font-medium">Tu Código Único de Seguimiento:</span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-emerald-400">
                  {submittedCode}
                </span>
                <button
                  onClick={copyCode}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-slate-300 hover:text-white"
                  title="Copiar código"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              {copied && <span className="text-[11px] text-emerald-300 block">¡Código copiado al portapapeles!</span>}
            </div>

            {/* Summary preview */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Titular:</span>
                <span className="font-bold text-slate-800">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Plan Seleccionado:</span>
                <span className="font-bold text-slate-800">{activePlan.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Monto Solicitado:</span>
                <span className="font-bold text-blue-600">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Plazo / Cuota Fija:</span>
                <span className="font-bold text-slate-800">{term} meses de {formatCurrency(monthlyPayment)}</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-left max-w-md mx-auto pt-4 space-y-2 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 text-sm">¿Cuáles son los siguientes pasos?</h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-600">
                <li>Te contactaremos por {formData.preferredChannel} para solicitar tus respaldos (CI y comprobante de ingresos).</li>
                <li>Verificación rápida de documentos en menos de 24 horas.</li>
                <li>Firma del contrato privado (presencial en La Paz o videollamada legal).</li>
                <li>Desembolso directo a tu cuenta bancaria.</li>
              </ol>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setView('seguimiento')}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
              >
                <span>Consultar Estado en Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola,%20acabo%20de%20enviar%20mi%20solicitud%20${submittedCode}%20por%20${amount}%20Bs`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
              >
                <span>Avisar por WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5" />
            Formulario de Crédito Digital
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solicitud de Préstamo Personal
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Completa tus datos para iniciar la evaluación crediticia. Respuesta formal en 24 horas.
          </p>
        </div>

        {/* Security Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Garantía de Privacidad y Legalidad:</strong> Tus datos serán tratados bajo estricta confidencialidad exclusivamente para fines de evaluación y formalización de tu contrato privado según la legislación boliviana.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
          
          {/* Section 1: Loan Configuration */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
              <Calculator className="w-5 h-5 text-blue-600" />
              1. Condiciones del Préstamo
            </h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Línea de Préstamo:
                </label>
                <select
                  value={planId}
                  onChange={(e) => {
                    setPlanId(e.target.value);
                    setSelectedPlanId(e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-slate-50 font-medium"
                >
                  {LOAN_PLANS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.monthlyRate}% mes)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Monto Requerido (Bs):
                </label>
                <input
                  type="number"
                  min={activePlan.minAmount}
                  max={activePlan.maxAmount}
                  step={activePlan.stepAmount}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-blue-600"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Rango: {formatCurrency(activePlan.minAmount)} - {formatCurrency(activePlan.maxAmount)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Plazo deseado (meses):
                </label>
                <input
                  type="number"
                  min={activePlan.minTerm}
                  max={activePlan.maxTerm}
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  De {activePlan.minTerm} a {activePlan.maxTerm} meses
                </span>
              </div>
            </div>

            {/* Quick Live Preview Banner */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-center sm:text-left">
                <span className="text-xs text-slate-400">Cuota fija mensual proyectada:</span>
                <span className="text-xl font-extrabold text-emerald-400 block">
                  {formatCurrency(monthlyPayment)} / mes
                </span>
              </div>
              <button
                type="button"
                onClick={() => setView('simulador')}
                className="text-xs text-blue-300 hover:text-white underline"
              >
                Ver cronograma detallado
              </button>
            </div>
          </div>

          {/* Section 2: Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
              <User className="w-5 h-5 text-blue-600" />
              2. Datos del Solicitante
            </h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre y Apellidos Completos *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Carlos Mamani Flores"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cédula de Identidad (C.I.) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Ej. 6789452"
                    value={formData.ci}
                    onChange={(e) => setFormData({ ...formData, ci: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  <select
                    value={formData.ciExp}
                    onChange={(e) => setFormData({ ...formData, ciExp: e.target.value })}
                    className="w-24 px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 font-medium"
                  >
                    <option value="LP">LP</option>
                    <option value="CB">CB</option>
                    <option value="SC">SC</option>
                    <option value="OR">OR</option>
                    <option value="PT">PT</option>
                    <option value="TJ">TJ</option>
                    <option value="CH">CH</option>
                    <option value="BN">BN</option>
                    <option value="PA">PA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teléfono / Celular con WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 71234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ciudad de Residencia *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="La Paz">La Paz</option>
                  <option value="El Alto">El Alto</option>
                  <option value="Cochabamba">Cochabamba</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Oruro">Oruro</option>
                  <option value="Sucre">Sucre</option>
                  <option value="Potosí">Potosí</option>
                  <option value="Tarija">Tarija</option>
                  <option value="Trinidad">Trinidad</option>
                  <option value="Cobija">Cobija</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dirección o Zona de Domicilio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sopocachi, Av. Sánchez Lima #123"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Financial & Economic Profile */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
              <Briefcase className="w-5 h-5 text-blue-600" />
              3. Perfil Económico y Laboral
            </h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo de Actividad Laboral *
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Dependiente del sector privado">Dependiente del sector privado</option>
                  <option value="Dependiente del sector público">Dependiente del sector público</option>
                  <option value="Comerciante / Negocio propio">Comerciante / Negocio propio</option>
                  <option value="Profesional independiente">Profesional independiente</option>
                  <option value="Jubilado / Rentista">Jubilado / Rentista</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre de la Empresa o Negocio
                </label>
                <input
                  type="text"
                  placeholder="Ej. Comercial Los Andes / Entidad Pública"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ingreso Mensual Aproximado (Bs) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="Ej. 4500"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destino Principal de los Fondos *
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Salud y gastos médicos">Salud y gastos médicos</option>
                  <option value="Mejora o refacción de vivienda">Mejora o refacción de vivienda</option>
                  <option value="Educación o estudios">Educación o estudios</option>
                  <option value="Capital de trabajo para negocio">Capital de trabajo para negocio</option>
                  <option value="Refinanciamiento / pago de deudas">Refinanciamiento / pago de deudas</option>
                  <option value="Gastos personales o familiares">Gastos personales o familiares</option>
                  <option value="Adquisición de vehículo o maquinaria">Adquisición de vehículo o maquinaria</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Communication & Terms */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ¿Por qué medio prefieres ser contactado?
              </label>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    value="WhatsApp"
                    checked={formData.preferredChannel === 'WhatsApp'}
                    onChange={(e) => setFormData({ ...formData, preferredChannel: e.target.value })}
                    className="accent-blue-600"
                  />
                  <span>WhatsApp (Recomendado, más rápido)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    value="Llamada telefónica"
                    checked={formData.preferredChannel === 'Llamada telefónica'}
                    onChange={(e) => setFormData({ ...formData, preferredChannel: e.target.value })}
                    className="accent-blue-600"
                  />
                  <span>Llamada telefónica</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    value="Correo electrónico"
                    checked={formData.preferredChannel === 'Correo electrónico'}
                    onChange={(e) => setFormData({ ...formData, preferredChannel: e.target.value })}
                    className="accent-blue-600"
                  />
                  <span>Correo electrónico</span>
                </label>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 accent-blue-600"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  Declaro que los datos ingresados son verídicos y autorizo a <strong>Mi Préstamo Digital</strong> a realizar la evaluación crediticia preliminar. Entiendo que las condiciones definitivas se ratificarán en el <strong>contrato privado</strong> respectivo sin ningún cobro por adelantado.
                </span>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/25 transition text-base"
          >
            <Send className="w-5 h-5" />
            <span>Enviar Solicitud para Evaluación (24h)</span>
          </button>

        </form>

      </div>
    </div>
  );
}
