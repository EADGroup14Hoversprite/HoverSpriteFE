export enum PaymentType {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
}

const dictPaymentString: Record<PaymentType, string> = {
  CASH: "Cash",
  CREDIT_CARD: "Credit Card",
};

export function toPaymentString(paymentType: PaymentType): string {
  return dictPaymentString[paymentType];
}
