import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { ActionIcon, Button, Modal, ModalSize, Title } from 'rizzui'

const step3Button = [
  'Integrative health consult',
  'Follow up appointment',
  'Script renewal',
  'Standard Consult',
  'Medical certificate',
  'Travel medicine',
  'Nicotine Vaping Cessation',
  'Weight Loss',
]

const ModalBookAppointment = (
  { isOpen, size = 'full', onClose, onNextStep }:
    { isOpen: boolean, size?: ModalSize | undefined, onClose: () => void, onNextStep: () => void }
) => {
  const [step, setStep] = useState(1)

  return (
    <Modal
      isOpen={isOpen}
      size={size}
      onClose={onClose}
      className="min-h-full content-center"
    >
      <div className="w-full h-full p-6 text-center mx-auto min-h-screen flex flex-col justify-center items-center">
        <div className="absolute top-6 right-6">
          <ActionIcon
            size="sm"
            variant="text"
            onClick={() => onClose()}
          >
            <IoClose className="h-auto w-6" size={30} />
          </ActionIcon>
        </div>
        <div className="flex flex-col justify-center items-center">
          {step == 1 ? (
            <>
              <Title as="h2" className="font-semibold">Are you booking for yourself or for somebody else?</Title>
              <div className="flex gap-4 justify-center mt-4">
                <Button className="bg-white text-green-700 border-green-700 hover:bg-green-700 hover:text-white" variant="outline" onClick={() => setStep(2)}>
                  Myself
                </Button>
                <Button className="bg-white text-green-700 border-green-700 hover:bg-green-700 hover:text-white" variant="outline" onClick={() => setStep(2)}>
                  Somebody else
                </Button>
              </div>
            </>
          ) : step == 2 ? (
            <>
                <Title as="h2" className="font-semibold">Have you attended <b>Solum Clinic</b> before?</Title>
              <div className="flex gap-4 justify-center mt-4">
                <Button className="bg-white text-green-700 border-green-700 hover:bg-green-700 hover:text-white" variant="outline" onClick={() => setStep(3)}>
                  New Patient
                </Button>
                <Button className="bg-white text-green-700 border-green-700 hover:bg-green-700 hover:text-white" variant="outline" onClick={() => setStep(3)}>
                  Returning Patient
                </Button>
              </div>
            </>
          ) : step == 3 ? (
            <>
              <Title as="h2" className="font-semibold">What type of appointment are you booking today?</Title>
              <div className="gap-4 justify-center mt-4 grid grid-cols-2">
                {step3Button.map((value: string, key: number) => (
                  <Button className="bg-white text-green-700 border-green-700 hover:bg-green-700 hover:text-white" variant="outline" onClick={onNextStep} key={key}>
                    {value}
                  </Button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  )
}

export default ModalBookAppointment;