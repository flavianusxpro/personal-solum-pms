import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { CURRENCY } from '@/config/constants';

export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  name_plural: string;
}

export interface CurrencyState {
  data: Currency[];
  active: Currency | null;
}

export const defaultCurrency: CurrencyState = {
  data: [
    {
      id: '1',
      name: 'Australian Dollar',
      code: 'AUD',
      symbol: '$',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      name_plural: 'Australian dollars',
    },
    {
      id: '2',
      name: 'Indonesian Rupiah',
      code: 'IDR',
      symbol: 'Rp',
      symbol_native: 'Rp',
      decimal_digits: 0,
      rounding: 0,
      name_plural: 'Indonesian rupiahs',
    },
    {
      id: '3',
      name: 'United States Dollar',
      code: 'USD',
      symbol: '$',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      name_plural: 'United States dollars',
    },
    {
      id: '4',
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      symbol_native: '€',
      decimal_digits: 2,
      rounding: 0,
      name_plural: 'euros',
    },
  ],
  active: null,
};

// Original atom.
export const currencyAtom = atomWithStorage(CURRENCY, defaultCurrency);

// Atom to manage the active currency.
export const activeCurrencyAtom = atom((get) => {
  const currency = get(currencyAtom);
  return currency.active;
});

// Atom to set the active currency.
export const setActiveCurrencyAtom = atom(
  null,
  (get, set, newCurrency: Currency) => {
    const currency = get(currencyAtom);
    const updatedCurrency = {
      ...currency,
      active: newCurrency,
    };
    set(currencyAtom, updatedCurrency);
  }
);

// Atom to add new currency.
export const addCurrencyAtom = atom(null, (get, set, newCurrency: Currency) => {
  const currency = get(currencyAtom);
  const updatedCurrency = {
    ...currency,
    data: [...currency.data, newCurrency],
  };
  set(currencyAtom, updatedCurrency);
});

// Atom to remove currency.
export const removeCurrencyAtom = atom(null, (get, set, currencyId: string) => {
  const currency = get(currencyAtom);
  const updatedCurrency = {
    ...currency,
    data: currency.data.filter((currency) => currency.id !== currencyId),
  };
  set(currencyAtom, updatedCurrency);
});
