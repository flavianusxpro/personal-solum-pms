'use client';
import { Form } from '@/core/ui/form';
import {
  ProductFormInput,
  productFormSchema,
} from '@/validators/create-edit-product.schema';
import { SubmitHandler } from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import { Input, Textarea } from 'rizzui';
import { usePathname } from 'next/navigation';
import FormFooter from '@/core/components/form-footer';

export default function CreateEditProduct() {
  const isView = usePathname().includes('view');

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {};

  return (
    <div className="@container">
      <Form<ProductFormInput>
        validationSchema={productFormSchema}
        onSubmit={onSubmit}
        useFormProps={{}}
        className="flex flex-grow flex-col @container [&_label]:font-medium"
      >
        {({
          register,
          control,
          setValue,
          getValues,
          formState: { errors },
        }) => {
          return (
            <>
              <div className="mb-10 grid grid-cols-1 gap-7">
                <FormGroup title="SKU" description="SKU of product" isLabel>
                  <Input
                    placeholder="SKU"
                    {...register('sku')}
                    error={errors.sku?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Title" description="Title of product" isLabel>
                  <Input
                    placeholder="Title"
                    {...register('title')}
                    error={errors.title?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup
                  title="Description"
                  description="Description of product"
                  isLabel
                >
                  <Textarea
                    placeholder="Description"
                    {...register('description')}
                    error={errors.description?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup
                  title="Cost Price"
                  description="Cost price of product"
                  isLabel
                >
                  <Input
                    type="number"
                    label="Cost Price"
                    prefix={'$'}
                    placeholder="15"
                    {...register('cost_price')}
                    disabled={isView}
                    error={errors.cost_price?.message}
                  />
                </FormGroup>
                <FormGroup
                  title="Sell Price"
                  description="Sell price of product"
                  isLabel
                >
                  <Input
                    type="number"
                    label="Sell Price"
                    prefix={'$'}
                    placeholder="15"
                    {...register('sell_price')}
                    disabled={isView}
                    error={errors.sell_price?.message}
                  />
                </FormGroup>
              </div>
              {!isView && (
                <FormFooter
                  // isLoading={isLoading}
                  altBtnText="Cancel"
                  submitBtnText="Save"
                />
              )}
            </>
          );
        }}
      </Form>
    </div>
  );
}
