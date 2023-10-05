import { currencies, symbols } from '../constants';

export class ExchangeSymbol {
  public reversed: boolean = false;
  public symbol: string[];

  constructor(
    private readonly inputCurrency: string,
    private readonly outputCurrency: string,
  ) {
    this.validate();

    if (symbols.includes(`${this.inputCurrency}${this.outputCurrency}`)) {
      this.symbol = [this.inputCurrency, this.outputCurrency];
    } else {
      this.reversed = true;
      this.symbol = [this.outputCurrency, this.inputCurrency];
    }
  }

  private validate() {
    if (
      !currencies.includes(this.inputCurrency) &&
      !currencies.includes(this.outputCurrency)
    ) {
      throw new Error('Invalid input or output currency');
    }

    if (this.inputCurrency === this.outputCurrency) {
      throw new Error('Input and output currencies cannot be the same');
    }
  }
}
