import cn from '@core/utils/class-names';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, FieldError, Flex, Input, Text } from 'rizzui';

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
  const [wording, setWording] = React.useState('');

  const onClear = () => {
    signatureCanvasRef.current?.clear();
  };

  const onSave = () => {
    const signatureImage = signatureCanvasRef.current?.toDataURL();
    if (signatureImage === emptySignature) saveSignature();
    saveSignature(signatureImage);
  };

  const onWordingToSignature = () => {
    const canvas = signatureCanvasRef.current?.getCanvas();
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const text = wording;
    const fontSize = 64;
    const font = `"Brush Script MT", cursive, sans-serif`;

    // Clear canvas first
    signatureCanvasRef.current?.clear();

    // Set high DPI resolution
    const ratio = window.devicePixelRatio || 1;
    const width = 400;
    const height = 200;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(ratio, ratio);

    // Draw white background (optional)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Draw text
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, height / 2);

    onSave();
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
      <Flex gap="2" align="center" className="mt-2 w-full pr-3">
        <Input
          size="sm"
          className="w-full"
          type="text"
          placeholder="Type signature"
          onChange={(e) => {
            setWording(e.target.value);
          }}
          clearable
          onClear={() => setWording('')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onWordingToSignature();
            }
          }}
          value={wording}
        />
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={onWordingToSignature}
        >
          Generate
        </Button>
      </Flex>

      <Flex align="center" justify="between" className="mt-2 gap-2 pr-3">
        <Button
          variant="text"
          size="sm"
          type="button"
          color="danger"
          onClick={onClear}
        >
          Clear Signature
        </Button>
        <Button variant="outline" size="sm" onClick={onSave}>
          Save Signature
        </Button>
      </Flex>
    </div>
  );
};

export default SignaturePad;

const emptySignature =
  'data:image/png;base64,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';
