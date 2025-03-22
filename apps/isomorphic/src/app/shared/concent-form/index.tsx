'use client';

import Image from 'next/image';
import React from 'react';
import SolumLogo from '@public/solum.jpeg';
import { Button, Checkbox, Input } from 'rizzui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ConsentFormInput,
  consentFormSchema,
} from '@/validators/consent-form.schema';
import SignaturePad from '../signature-pad';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const MedicinalCannabisConsentForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConsentFormInput>({
    resolver: zodResolver(consentFormSchema),
  });

  const onSubmit: SubmitHandler<ConsentFormInput> = (data) => {
    router.push('/form/consent-form/confirmation');
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto my-10 w-full max-w-4xl border bg-white p-10">
        <Image
          width={350}
          height={200}
          src={SolumLogo}
          className="mb-10"
          alt="solum-logo"
        />
        <h1 className="my-5 font-bold">Consent Form</h1>

        <p className="mb-5">
          The primary objective is to provide the necessary information (in
          conjunction with the clinical consultation) to allow patients to make
          an informed decision and consent to Medicinal Cannabis (MC) treatment.
          Further objectives of this MC treatment consent form are to:
        </p>
        <ol className="mb-5">
          <li className="mb-5">
            <p className="mb-5">
              <span>1) </span>
              <span>
                Describe the risks and possible complications of the treatment.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>2) </span>
              <span>Explain the patient&apos;s responsibilities.</span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>3) </span>
              <span>
                Establish a patient registration scheme for medical cannabis
                patients.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>4) </span>
              <span>
                Explain Solum Clinic, this Medical Practice, and any treating
                clinicians&apos; duty of care statement.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>5) </span>
              <span>
                Consents, including gathering personal and medical information
                and contact for communications.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>6) </span>
              <span>
                Acknowledge that this consent form covers all aspects of
                medicinal cannabis prescription and treatment, all related
                Practices, and additionally Solum Clinic (SC) which is Solum
                Clinic Pty Ltd, and all related entities, companies,
                subsidiaries, doctors, nurses, clinicians, officers, employees,
                contractors, affiliates, and agents.
              </span>
            </p>
          </li>
        </ol>
        <p className="mb-5">
          <strong>
            <span>
              BENEFITS, RISKS & POSSIBLE COMPLICATIONS OF MEDICINAL CANNABIS
            </span>
          </strong>
        </p>
        <p className="mb-5">I acknowledge that:</p>
        <ol className="mb-5">
          <li className="mb-5">
            <p className="mb-5">
              <span>
                Medical cannabis is generally considered an experimental drug,
                and, in many cases, there is limited data from which to draw
                specific recommendations for treatment. For more information,
                you can visit:
                www.tga.gov.au/medicinal-cannabis-guidance-documents
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>
                Medical cannabis drugs are, in general, not registered in
                Australia for use in my condition by the Therapeutic Goods
                Administration (TGA) of the Australian Department of Health and
                Aging, and as such arrangements to access medical cannabis
                medicines are generally to be made through a Special Access
                Scheme (SAS) pathway. The TGA has the discretion to allow such
                approvals under the TGA Goods Act 1989.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>
                Medical cannabis benefits and harms in children, pregnancy, and
                breastfeeding are not well investigated and Solum Clinic Centre
                and this Practice are not liable for any damages or claims
                related directly or indirectly from medical cannabis use.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>
                Medical cannabis may interact with my current medications and
                cause side effects from these medications.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>
                Medical cannabis use with vaporizers or other modes of use may
                cause known or unknown side effects.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>
                I waive and disclaim any of my rights to claim against the Solum
                Clinic and this Practice for any possibility of side-effects,
                adverse effects, and unknown risks involved in taking medical
                cannabis.
              </span>
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>
                Possible known side-effects of medical cannabis compounds,
                principally with Tetrahydrocannabinol (THC), may include and are
                not limited to: nausea, light-headedness, uncontrolled laughter
                or euphoria, dry mouth, increased appetite, vomiting,
                relaxation, sedation, drowsiness, abnormal blood pressure,
                physical weakness, confusion, disorientation, dizziness,
                vertigo, coordination imbalance, memory changes, cognitive
                impairment, bowel changes, anxiety, hallucinations, paranoid
                thoughts, psychosis, mental disturbance, abnormal heart rate,
                lethargy, seizures, and chronic bronchitis (if inhaled).
              </span>
            </p>
          </li>
        </ol>
        <p className="mb-5">
          <strong>
            <span>PATIENT RESPONSIBILITIES</span>
          </strong>
        </p>
        <p className="mb-5">
          It is my responsibility to ensure that I listen to the doctor,
          clinician, and pharmacist in the consultations. I have had and/or will
          have a good opportunity to discuss and explore medical cannabis
          treatment for my personal health; and I agree to the following:
        </p>
        <p className="mb-5">
          I declare that I do not have any medical conditions which are
          potentially dangerous or contra-indicated with medical cannabis
          treatment, principally THC, including:
        </p>
        <ul className="mb-5">
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>Hypersensitivity to cannabinoids or any type of
              excipients.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓</span>Substance addiction or the intentional use of drugs
              for non-medical purposes.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>Regular reviews with my cannabis doctor or
              clinician as instructed or as required.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>To carefully follow the clinician&apos;s advice on
              dosage and frequency of medical cannabis.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>Maintain a healthy lifestyle that will help my
              condition or symptoms.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>Avoiding alcohol, intoxicants, or recreational
              drugs that will interact with medical cannabis treatment.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>Follow my cannabis doctor and clinician&apos;s
              advice on blood testing or additional investigations.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>Ongoing consultation with my referring doctor or
              clinician.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>Informing my cannabis doctor and clinician of all
              concurrent medications or supplements.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>I will inform my doctors and clinicians if medical
              cannabis does not work for my condition or symptoms.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>I will report if I suffer any adverse event,
              side-effect, and reactions to my cannabis doctors and clinicians.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>I am aware and will comply with any laws relating
              to the operation of any: vehicle; boat; aircraft; machinery; or
              other regarding the use of THC or medical cannabis and blood,
              serum, saliva, or other levels. I further agree that it is my
              responsibility, and I release Solum Clinic and this Practice from
              any liability in relation to the operation or use of any vehicles
              or machinery.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              <span>✓ </span>I acknowledge that Solum Clinic has a
              zero-tolerance policy for hostile, abusive, or unreasonable
              conduct towards any member of staff, as outlined in their Terms
              and Conditions online. I accept that Solum Clinic reserves the
              right to refuse service or discharge any patient who breaches this
              policy.
            </p>
          </li>
        </ul>
        <strong>
          <span>PATIENT REGISTRATION SCHEME</span>
        </strong>
        <p className="mb-5">
          I consent to be part of a Solum Clinic patient registration and
          monitoring program for medical cannabis users I agree:
        </p>
        <ul className="mb-5">
          <li className="mb-5">
            <p className="mb-5">
              That once available, I may be given access to a Solum Clinic
              monitoring program (or otherwise labelled) and I consent to use
              the Solum Clinic monitoring program to monitor my symptoms,
              progress, and any other personal details.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              That the Solum Clinic monitoring program will track and monitor my
              personal details, clinical details, and medical cannabis data.
            </p>
          </li>
          <li className="mb-5">
            <p className="mb-5">
              I consent that any data entered in the Solum Clinic monitoring
              program becomes accessible, stored, and used by Solum Clinic, and
              I release any claim I have over the use of data collected by Solum
              Clinic.
            </p>
          </li>
        </ul>
        <strong>
          <span>CONSENT TO GATHERING OF PERSONAL AND MEDICAL INFORMATION</span>
        </strong>
        <p className="mb-5">
          Solum Clinic and this Medical Practice collects information from you
          for the primary purpose of providing quality health care. We require
          you to provide us with your personal details and a full medical
          history so that we may properly assess, diagnose and treat illnesses
          and medical conditions, ensuring we are proactive in your health care.
          To enable ongoing care, and in keeping with the Privacy Act 1988 and
          Australian Privacy Principles, we wish to provide you with sufficient
          information on how your personal information may be used or disclosed
          and record your consent or restrictions to this consent.
        </p>
        <p className="mb-5">
          By signing below, you (as a patient/parent/guardian) are consenting to
          the collection of your personal information, and that it may be used
          or disclosed by the Solum Clinic and the Practice for the following
          purposes:
        </p>
        <ul className="fr-tag">
          <li className="fr-tag">
            <p className="fr-tag">
              Administrative purposes in the operation of our medical practice.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              Billing purposes, including compliance with Medicare requirements.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              Follow-up reminder/recall notices for treatment and preventative
              healthcare, frequently issued by SMS.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              Disclosure to others involved in your health care, including
              treating doctors and clinicians outside this Medical Practice.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              Accreditation and quality assurance activities to improve
              individual and community health care and Practice Management.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              For legal related disclosure as required by a court of law.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              For the purposes of research only where de-identified information
              is used.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              To allow medical students and staff to participate in medical
              training/teaching using only de-identified information.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              To comply with any legislative or regulatory requirements, e.g.,
              notifiable diseases.
            </p>
          </li>
          <li className="fr-tag">
            <p className="fr-tag">
              For use when seeking treatment by other clinicians in this
              Practice.
            </p>
          </li>
        </ul>
        <p className="fr-tag">
          At all times, we are required to ensure your details are treated with
          the utmost confidentiality. Your records are very important, and we
          will take all steps necessary to ensure they remain confidential.
          Please sign below if you understand and agree to the following
          statements in relation to our use, collection, privacy, and disclosure
          of your patient information.
        </p>
        <ul className="fr-tag">
          <li className="fr-tag">
            <p className="fr-tag">
              You agree that we may provide details of your personal and medical
              information, including but not limited to health records, details
              of appointments, and details of treatments, to your legal guardian
              or other person authorized by you, such as your carer nominated
              below, or as updated by you from time to time.
            </p>
          </li>
        </ul>
        <strong>
          <span>CONSENT TO COMMUNICATIONS</span>
        </strong>
        <ul className="fr-tag">
          <li className="fr-tag">
            <p className="fr-tag">
              By using the Services or Software, you agree that Solum Clinic,
              this Practice, and those acting on its behalf may send you text
              (SMS) messages, email, or other communications. These messages may
              include operational messages about your use of the Services, as
              well as marketing or other promotional messages. Messages from
              Solum Clinic, its affiliated companies, and necessary third-party
              service providers, and this Practice, may include but are not
              limited to: operational communications concerning your User
              account or use of the Services, updates concerning new and
              existing features on Solum Clinic, communications concerning
              promotions run by us or our third-party partners, and news
              concerning Solum Clinic and industry developments.
            </p>
          </li>
        </ul>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register('clientFirstName', { required: true })}
                error={errors.clientFirstName?.message}
                label="Client First Name *"
                placeholder="Client First Name"
              />
              <Input
                {...register('clientSurname', { required: true })}
                error={errors.clientSurname?.message}
                label="Client Surname *"
                placeholder="Client Surname"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Checkbox
                {...register('checkbox1', { required: true })}
                error={errors.checkbox1?.message}
                label="I hereby acknowledge that I am aware of my right to access my personal information *"
              />
              <Checkbox
                {...register('checkbox2', { required: true })}
                error={errors.checkbox2?.message}
                label="I hereby acknowledge that I am aware of my right to withdraw my consent at any time. *"
              />
              <Checkbox
                {...register('checkbox3', { required: true })}
                error={errors.checkbox3?.message}
                label="I understand that my provider must comply with relevant privacy laws and I will contact the organisation immediately if I feel that these laws have been breached. *"
              />
              <Checkbox
                {...register('checkbox4', { required: true })}
                error={errors.checkbox4?.message}
                label="I understand why certain information about me may need to be provided to other service providers in order to coordinate the best support for me *"
              />
            </div>

            <div className="grid gap-4">
              <Input
                className="col-span-12"
                {...register('fullName')}
                placeholder="Fullname"
                label="Full Name *"
                error={errors.fullName?.message}
              />

              <Controller
                name="signature"
                control={control}
                render={({ field }) => (
                  <SignaturePad
                    className="col-span-6"
                    saveSignature={(base64) => field.onChange(base64)}
                    error={errors.signature?.message}
                  />
                )}
              />
              <Input
                {...register('date', { required: true })}
                error={errors.date?.message}
                type="date"
                className="col-span-6"
                label="Date *"
              />
            </div>

            <Button type="submit" className="bg-green-600">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicinalCannabisConsentForm;
