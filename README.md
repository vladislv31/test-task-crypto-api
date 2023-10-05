# Test Task Crypto Api

## Run

- clone
- install dependencies
- create .env file (use .env.example reference)
- pnpm start:dev

## Extending

Just realize new exchange api class. Class must be extended from abstract class. Next add it to CryptoService constructor initialization.

### Example

New class:

```
// src/crypto/exchanges/new.exchange.ts

...

@Injectable()
export class NewExchange implements AbstractExchange {
  private readonly apiUrl: string;

  constructor({ apiUrl }: { apiUrl: string }) {
    this.apiUrl = apiUrl;
  }

  async getPairRate(symbol: ExchangeSymbol): Promise<number> {
    // realization
  }
}
```

Include it:

```
// src/crypto/crypto.service.ts

...

constructor(private readonly configService: ConfigService) {
  this.exchanges = {
    ...
    new: new NewExchange({
      apiUrl: this.configService.get('NEW_API_BASE_URL'),
    }),
  };
}

...
```