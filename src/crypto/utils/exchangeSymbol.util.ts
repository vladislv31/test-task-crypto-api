const symbols = ['BTCUSDT', 'ETHBTC', 'ETHUSDT'];

export class ExchangeSymbol {
  public reversed: boolean = false;
  public symbol: string[];

  constructor(
    private readonly inputCurrency: string,
    private readonly outputCurrency: string,
  ) {
    if (inputCurrency === outputCurrency) {
      throw new Error('Input and output currencies cannot be the same');
    }

    if (symbols.includes(`${this.inputCurrency}${this.outputCurrency}`)) {
      this.symbol = [this.inputCurrency, this.outputCurrency];
    } else {
      this.reversed = true;
      this.symbol = [this.outputCurrency, this.inputCurrency];
    }
  }
}
