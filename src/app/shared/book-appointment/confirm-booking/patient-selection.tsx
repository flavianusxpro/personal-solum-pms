import { PatientSchema } from '@/validators/patient.schema';
import { useModal } from '../../modal-views/use-modal';
import { SubmitHandler } from 'react-hook-form';
import ModalEstimationCost from '../modal/modal-estimation';
import { AdvancedCheckbox, Button, Checkbox, Flex, Loader, Text } from 'rizzui';
import { useProfile } from '@/hooks/useProfile';
import PatientForm from './patient-form';
import ExistingPatient from './existing-patient';
import { ExistingPatientSchema } from '@/validators/existing-patient.schema';
import { PiPlusBold, PiUserBold } from 'react-icons/pi';
import { useState } from 'react';

export default function PatientSelection() {
  const { openModal } = useModal();

  const { data: dataProfile, isLoading: isLoadingProfile } = useProfile();

  const [showAddPatient, setShowAddPatient] = useState(false);

  const onSubmitPatient = async () => {
    return openModal({
      view: <ModalEstimationCost />,
    });
  };

  const onSubmitExistingPatient: SubmitHandler<ExistingPatientSchema> = async (
    data
  ) => {
    console.log(
      '🚀 ~ constonSubmitExistingPatient:SubmitHandler<ExistingPatientSchema>= ~ data:',
      data
    );
  };

  return (
    <div className="border-r p-6 sm:w-2/3">
      <h3 className="text-lg font-bold">Patient Selection</h3>
      <p className="text-sm text-gray-500">
        Please select the patient attending this appointment from the list
        below, or select &quot;Add Patient&quot; and fill in their details.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <Flex justify="between" align="center">
          <Text className="text-lg font-semibold">Existing Patient</Text>
        </Flex>
        <AdvancedCheckbox onClick={onSubmitPatient} className="w-fit">
          <Flex className="gap-2" align="center">
            <PiUserBold className="h-4 w-4 text-gray-500" />
            <Text>{`${dataProfile?.first_name} ${dataProfile?.last_name}`}</Text>
          </Flex>
        </AdvancedCheckbox>
        <Button
          onClick={() => setShowAddPatient(true)}
          className="flex w-fit items-center gap-2"
          variant="flat"
        >
          <PiPlusBold className="h-4 w-4 text-gray-500" />
          <Text>Add Patient</Text>
        </Button>
      </div>

      <div className="p-6">
        {!isLoadingProfile && showAddPatient && (
          <PatientForm
            onSubmitPatient={onSubmitPatient}
            // dataProfile={dataProfile}
          />
        )}
      </div>
    </div>
  );
}
