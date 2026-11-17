import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿Qué requisitos necesito para solicitar un préstamo?',
      a: 'Los requisitos básicos son: ser mayor de edad, contar con cédula de identidad vigente, comprobante de domicilio reciente (factura de luz o agua) y comprobante de ingresos de los últimos 3 meses (boletas de pago, extractos bancarios o movimientos de negocio si eres independiente).'
    },
    {
      q: '¿Cómo se calcula la cuota mensual y el cronograma?',
      a: 'Utilizamos el sistema de amortización de cuota fija (sistema francés). Cada mes pagas una cuota fija exactamente igual, donde una porción corresponde al interés pactado sobre el saldo deudor y la otra porción amortiza directamente el capital prestado. Puedes verificar la tabla completa en nuestro simulador antes de solicitar.'
    },
    {
      q: '¿Puedo realizar pagos anticipados o liquidar el crédito antes de tiempo?',
      a: 'Sí, totalmente. Puedes amortizar a capital o cancelar la totalidad de tu saldo pendiente en cualquier momento sin ninguna penalidad ni comisión adicional. Al amortizar anticipadamente, los intereses futuros se recalculan automáticamente sobre el nuevo saldo.'
    },
    {
      q: '¿Existen cobros por apertura, comisiones o pagos por adelantado?',
      a: 'No. En Solventia nunca solicitamos depósitos ni cobros por adelantado bajo concepto de apertura, seguro ficticio ni gastos administrativos. El desembolso es íntegro y los términos se formalizan en contrato.'
    },
    {
      q: '¿Cómo se realiza la firma del contrato privado?',
      a: 'La formalización se efectúa mediante un contrato privado claro y detallado. Puedes realizar la firma de forma presencial en nuestras oficinas de La Paz o mediante verificación de identidad y firma digitalizada asistida si te encuentras en otra ciudad.'
    },
    {
      q: '¿Cuánto tiempo demora la evaluación y el desembolso?',
      a: 'Una vez enviada tu solicitud y recibida la documentación de respaldo, nuestro equipo evalúa tu perfil en un plazo máximo de 24 horas hábiles. Si es aprobado y suscrito el contrato, el desembolso se realiza en el mismo día.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Dudas Frecuentes
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Respuestas directas para que tomes una decisión financiera informada y con confianza.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-blue-600 transition"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
