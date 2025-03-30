import { PatientSchema } from '@/validators/patient.schema';
import { useModal } from '../../modal-views/use-modal';
import { SubmitHandler } from 'react-hook-form';
import ModalEstimationCost from '../modal/modal-estimation';
import { Loader } from 'rizzui';
import { useProfile } from '@/hooks/useProfile';
import PatientForm from './patient-form';
import ExistingPatient from './existing-patient';
import { ExistingPatientSchema } from '@/validators/existing-patient.schema';

export default function PatientSelection() {
  const { openModal } = useModal();

  const { data: dataProfile, isLoading: isLoadingProfile } = useProfile();

  const onSubmitPatient: SubmitHandler<PatientSchema> = async (data) => {
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
      <h3 className="text-lg font-semibold">Patient Selection</h3>
      <p className="text-sm text-gray-500">
        Please select the patient attending this appointment from the list
        below, or select &quot;Add Patient&quot; and fill in their details.
      </p>

      <div className="p-6">
        {!isLoadingProfile ? (
          <PatientForm
            onSubmitPatient={onSubmitPatient}
            dataProfile={dataProfile}
          />
        ) : (
          <Loader variant="spinner" />
        )}
        {/* <ExistingPatient onSubmitPatient={onSubmitExistingPatient} /> */}
      </div>
    </div>
  );
}
