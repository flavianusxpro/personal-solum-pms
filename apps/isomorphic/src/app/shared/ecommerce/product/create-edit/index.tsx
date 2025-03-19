'use client';

import {
  formParts,
} from '@/app/shared/ecommerce/product/create-edit/form-nav';
import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import ProductSummary from '@/app/shared/ecommerce/product/create-edit/product-summary';
import cn from '@core/utils/class-names';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { Text } from 'rizzui';
// import ProductMedia from '@/app/shared/ecommerce/product/create-edit/product-media';
// import PricingInventory from '@/app/shared/ecommerce/product/create-edit/pricing-inventory';
// import ProductIdentifiers from '@/app/shared/ecommerce/product/create-edit/product-identifiers';
// import ShippingInfo from '@/app/shared/ecommerce/product/create-edit/shipping-info';
// import ProductSeo from '@/app/shared/ecommerce/product/create-edit/product-seo';
// import DeliveryEvent from '@/app/shared/ecommerce/product/create-edit/delivery-event';
// import ProductVariants from '@/app/shared/ecommerce/product/create-edit/product-variants';
// import ProductTaxonomies from '@/app/shared/ecommerce/product/create-edit/product-tags';
import { useLayout } from '@/layouts/use-layout';
import {
  CreateProductInput,
  productFormSchema,
} from '@/validators/create-product.schema';
import FormFooter from '@core/components/form-footer';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
}

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
      );
      methods.reset();
    }, 600);
  };

  return (
    <div className="@container">
      {/* <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      /> */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
