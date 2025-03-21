import cn from '@core/utils/class-names';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, FieldError, Text } from 'rizzui';

interface IProps {
  saveSignature: (base64?: string) => void;
  className?: string;
  error?: string;
}

const SignaturePad: React.FC<IProps> = ({
  className,
  saveSignature,
  error,
}) => {
  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const onClear = () => {
    signatureCanvasRef.current?.clear();
  };

  const onSave = () => {
    const signatureImage = signatureCanvasRef.current?.toDataURL();
    saveSignature(signatureImage);
  };

  return (
    <div className={cn(className)}>
      <Text className="mb-2 font-semibold">Signature *</Text>
      <SignatureCanvas
        ref={signatureCanvasRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 200,
          className: 'border',
        }}
      />
      <FieldError error={error} />
      <div className="mt-2 flex gap-2">
        <Button variant="text" size="sm" color="danger" onClick={onClear}>
          Clear Signature
        </Button>
        <Button variant="outline" size="sm" onClick={onSave}>
          Save Signature
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
