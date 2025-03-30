import { BiChevronRight } from 'react-icons/bi';
import { PiCardholder } from 'react-icons/pi';
import { Flex, Text, Title } from 'rizzui';

export default function PaymentMethods() {
  return (
    <div className="flex h-screen flex-col gap-4 bg-gray-50 p-5">
      <div className="">
        <Title as="h2" className="text-2xl font-semibold">
          Payment Methods
        </Title>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-md p-2 px-4">
        <div className="divide-y divide-green-500 bg-white">
          <Flex align="center" className="rounded-md border p-3">
            <div className="flex w-1/6 justify-center">
              <PiCardholder className="h-8 w-8" />
            </div>
            <div className="w-full">
              <Text className="font-semibold">No saved paymeny methods</Text>
              <Text>
                You do not currently have any stored payment methods. Add a
                payment method to conveniently and securely pay for your next
                appointment.
              </Text>
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
}
