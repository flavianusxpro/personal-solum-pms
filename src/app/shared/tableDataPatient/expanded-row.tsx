import Image from 'next/image';
import { PiXBold } from 'react-icons/pi';
import { Title, Text, Input } from 'rizzui';
import FormGroup from '../form-group';

export default function ExpandedOrderRow({ record }: any) {
  if (record?.products?.length === 0) {
    return <Text>No product available</Text>;
  }
  return (
    <div className="grid grid-cols-1 divide-y bg-gray-0 px-3.5 dark:bg-gray-50">
      <FormGroup
        title="Patient Name"
        className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
      >
        <Input
          placeholder="Patient Name"
          className="flex-grow"
        />
      </FormGroup>
      <FormGroup
        title="Phone Number"
        className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
      >
        <Input
          placeholder="Phone Number"
          className="flex-grow"
        />
      </FormGroup>
      <FormGroup
        title="Email"
        className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
      >
        <Input
          placeholder="Email"
          className="flex-grow"
        />
      </FormGroup>
    </div>
  );
}
