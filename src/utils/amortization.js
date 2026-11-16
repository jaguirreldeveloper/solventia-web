/**
 * Utilidades financieras para el cálculo de préstamos según sistema de amortización francés
 * (cuotas mensuales fijas con desglose de interés y amortización a capital).
 */

export function calculateMonthlyPayment(principal, monthlyRatePercent, months) {
  if (!principal || !months || months <= 0) return 0;
  
  const r = monthlyRatePercent / 100;
  if (r === 0) return principal / months;

  // Fórmula: A = P * [r * (1 + r)^n] / [(1 + r)^n - 1]
  const factor = Math.pow(1 + r, months);
  const payment = principal * ((r * factor) / (factor - 1));
  return payment;
}

export function generateSchedule(principal, monthlyRatePercent, months, startDate = new Date()) {
  if (!principal || !months || months <= 0) return [];

  const r = monthlyRatePercent / 100;
  const payment = calculateMonthlyPayment(principal, monthlyRatePercent, months);
  
  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= months; i++) {
    // Calcular fecha de vencimiento mensual
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + i);

    const interest = balance * r;
    let principalAmortization = payment - interest;
    
    // Ajuste en la última cuota para cuadrar balance en 0 exacto
    if (i === months || principalAmortization > balance) {
      principalAmortization = balance;
    }
    
    const newBalance = Math.max(0, balance - principalAmortization);

    schedule.push({
      installmentNumber: i,
      dueDate: dueDate,
      payment: i === months ? principalAmortization + interest : payment,
      interest: interest,
      principalAmortization: principalAmortization,
      remainingBalance: newBalance
    });

    balance = newBalance;
  }

  return schedule;
}

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Bs 0,00';
  return 'Bs ' + Number(amount).toLocaleString('es-BO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
