export class Rate {
  fromCurrency: string;
  toCurrency: string;
  value: number;

  constructor(fromCurrency: string, toCurrency: string, value: number) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.value = value;
  }
}
