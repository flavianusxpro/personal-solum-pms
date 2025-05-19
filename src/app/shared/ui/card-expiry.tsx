import { NumberInput, NumberInputProps, usePatternFormat } from 'rizzui';

type CardExpiryType = NumberInputProps & {
  isMask?: boolean;
};

export default function CardExpiry({
  isMask = false,
  ...props
}: CardExpiryType) {
  const { format } = usePatternFormat({
    ...props,
    format: '##/##',
  });
  const _format = (val: string) => {
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && parseInt(month[0]) > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      if (Number(month) === 0) {
        month = '01';
      } else if (Number(month) > 12) {
        month = '12';
      }
    }
    return isMask && format ? format(`${month}${year}`) : `${month}/${year}`;
  };
  return <NumberInput {...props} format={_format} />;
}
