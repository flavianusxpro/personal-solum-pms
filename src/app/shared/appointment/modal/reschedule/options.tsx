import { AdvancedCheckbox, Text } from 'rizzui';
import { formRescheduleDataAtom, useStepperCancelAppointment } from '.';
import { useAtom } from 'jotai';

export default function RescheduleOptions() {
  const { gotoStep } = useStepperCancelAppointment();
  const [formData, setFormData] = useAtom(formRescheduleDataAtom);

  const changeDateHandler = () => {
    setFormData((prev) => ({
      ...prev,
      rescedule_by: 'date',
    }));
    gotoStep(1);
  };

  const changeDoctorHandler = () => {
    setFormData((prev) => ({
      ...prev,
      rescedule_by: 'doctor',
    }));
    gotoStep(1);
  };

  return (
    <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
      <AdvancedCheckbox name="" value="" onClick={changeDateHandler}>
        {/* <CurrencyBangladeshiIcon className="w-7 h-auto mb-4" /> */}
        <Text className="">Change Date (same doctor)</Text>
      </AdvancedCheckbox>
      <AdvancedCheckbox name="" value="" onClick={changeDoctorHandler}>
        {/* <CurrencyBangladeshiIcon className="w-7 h-auto mb-4" /> */}
        <Text className="">Change Doctor (same clinic)</Text>
      </AdvancedCheckbox>
    </div>
  );
}
