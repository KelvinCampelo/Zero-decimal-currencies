import ZeroDecimalError from './error-factory';

const ZERO_DECIMAL_CURRENCIES = [
  'BIF',
  'CLP',
  'DJF',
  'GNF',
  'JPY',
  'KMF',
  'KRW',
  'MGA',
  'PYG',
  'RWF',
  'UGX',
  'VND',
  'VUV',
  'XAF',
  'XOF',
  'XPF',
];

function toFixedNoRound(num, fixed) {
  var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return num.toFixed(fixed + 1).match(re)[0];
}

export default function(amount, currency, display, noRound) {
  try {
    if (!amount) {
      throw new ZeroDecimalError(`The amount value is required`);
    }
    if (!currency) {
      throw new ZeroDecimalError(`The currency value is required`);
    }
    //test if number can be converted to float
    if (!isNaN(amount) && amount) {
      amount = parseFloat(amount.toString());
    } else {
      throw new ZeroDecimalError(`The amount cannot be parsed to Float`);
    }

    //test if amount is number
    if (!!!(Number(amount) === amount)) {
      throw new ZeroDecimalError(`The amount cannot be parsed to Float`);
    }

    if (ZERO_DECIMAL_CURRENCIES.includes(currency.toString().toUpperCase())) {
      //exclude all decimals
      return toFixedNoRound(amount, 0);
    } else {
      if (noRound) {
        return display
          ? toFixedNoRound(amount, 2).toString()
          : toFixedNoRound(amount, 2)
              .toString()
              .replace('.', '');
      } else {
        let amountFixed = amount;
        if (amount < 0.01) {
          return display ? '0.00' : '0';
        }

        amountFixed = amount.toFixed(2);

        return display ? amountFixed : amountFixed.toString().replace('.', '');
      }
    }
  } catch (error) {
    console.log(error);
    throw new ZeroDecimalError();
  }
}
