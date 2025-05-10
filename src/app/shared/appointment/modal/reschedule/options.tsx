import { AdvancedCheckbox, Text } from 'rizzui';
import { useStepperCancelAppointment } from '.';

export default function RescheduleOptions() {
  const { gotoStep } = useStepperCancelAppointment();

  return (
    <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
      <AdvancedCheckbox name="" value="" onClick={() => gotoStep(1)}>
        {/* <CurrencyBangladeshiIcon className="w-7 h-auto mb-4" /> */}
        <Text className="">Change Date (same doctor)</Text>
      </AdvancedCheckbox>
      <AdvancedCheckbox name="" value="" onClick={() => gotoStep(2)}>
        {/* <CurrencyBangladeshiIcon className="w-7 h-auto mb-4" /> */}
        <Text className="">Change Doctor (same clinic)</Text>
      </AdvancedCheckbox>
    </div>
  );
}
