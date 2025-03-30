import React from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Button } from 'rizzui';

export default function StepBackButton({
  backButton,
}: {
  backButton: () => void;
}) {
  return (
    <Button variant="outline" onClick={backButton} className="">
      <IoArrowBackCircle className="h-auto w-6" size={30} />
      Previous
    </Button>
  );
}
