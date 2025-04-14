import { useAtom } from 'jotai';
import { formDataAtom, useStepperAppointment } from '.';
import Footer from './footer';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SelectClinic() {
  const { gotoNextStep } = useStepperAppointment();
  const [formData, setFormData] = useAtom(formDataAtom);
  //   const {
  //     control,
  //     formState: { errors },
  //     handleSubmit,
  //   } = useForm<FormSchemaType>({
  //     resolver: zodResolver(FormSchema),
  //     defaultValues: {
  //       patient: formData.patient,
  //       doctor: formData.doctor,
  //     },
  //   });

  //   const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
  //     console.log('data', data);
  //     setFormData((prev) => ({
  //       ...prev,
  //       patient: data.patient,
  //       doctor: data.doctor,
  //     }));
  gotoNextStep();

  return (
    <></>
    // <form onSubmit={handleSubmit(onSubmit)}>

    // <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
    /* <Controller
            control={control}
            name="patient"
            render={({ field: { value, onChange } }) => (
            <></>
            )}
          /> */
    // </div>
    // <Footer />
    //   </form>
  );
}
