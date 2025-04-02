import Image from 'next/image';
import { PiXBold } from 'react-icons/pi';
import { Title, Text, Input, Flex } from 'rizzui';
import FormGroup from '../../form-group';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';
import { genderOption, stateOption } from '@/config/constants';
import CSelect from '../../ui/select';
import dayjs from 'dayjs';

export default function ExpandedOrderRow({
  data,
}: {
  data: IGetAllPatientsResponse['data'][number];
}) {
  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
        <div className="flex flex-col gap-7">
          <FormGroup title="Personal Info" className="grid-cols-12 gap-4" />
          <FormGroup title="First Name">
            <Input
              placeholder="First Name"
              value={data?.first_name}
              disabled
              className="flex-grow"
            />
          </FormGroup>
          <FormGroup title="Last Name">
            <Input
              placeholder="Last Name"
              value={data?.last_name}
              disabled
              className="flex-grow"
            />
          </FormGroup>
          <FormGroup title="Gender">
            <CSelect
              label=""
              disabled
              value={data.gender}
              placeholder="Select Gender"
              options={genderOption}
            />
          </FormGroup>
          <FormGroup title="Birth of Date">
            <Input
              placeholder="Birth of Date"
              type="date"
              value={data?.date_of_birth}
              disabled
              className="flex-grow"
            />
          </FormGroup>
          <FormGroup title="Phone Number">
            <Input
              placeholder="Phone Number"
              value={data?.mobile_number}
              disabled
              className="flex-grow"
            />
          </FormGroup>

          <FormGroup title="Email">
            <Input
              placeholder="Email"
              value={data?.email}
              disabled
              className="flex-grow"
            />
          </FormGroup>

          <FormGroup title="Medicare Card">
            <Input
              placeholder="Medicare Card"
              value={data?.medicare_card_number}
              disabled
              className="flex-grow"
            />
          </FormGroup>
          <FormGroup title="">
            <Flex gap="4" justify="between" align="center">
              <Input
                label="Position of Card"
                placeholder="Position of Card"
                // value={data?.medicare_card_position}
                disabled
                labelClassName="text-base"
                className="flex-grow"
              />
              <Input
                label="Expiry Date"
                type="date"
                placeholder="Expiry Date"
                value={dayjs(data.medicare_expired_date).format('YYYY-MM-DD')}
                disabled
                className="flex-grow"
                labelClassName="text-base"
              />
            </Flex>
          </FormGroup>
        </div>

        <div className="mb-10 flex flex-col gap-7">
          <FormGroup title="Address" className="grid-cols-12" />
          <FormGroup title="Country">
            <Input
              placeholder="Country"
              // value={data?.country}
              disabled
              className="flex-grow"
            />
          </FormGroup>
          <FormGroup title="Street">
            <Input placeholder="Street" disabled className="flex-grow" />
          </FormGroup>
          <FormGroup title="Suburb">
            <Input
              placeholder="Suburb"
              disabled
              // value={data?.suburb}
              className="flex-grow"
            />
          </FormGroup>

          <FormGroup title="States">
            <Flex justify="between" align="center" gap="4">
              <CSelect
                label="State"
                placeholder="State"
                className="group relative z-0"
                options={stateOption}
                // value={data?.state}
                disabled
                labelClassName="text-base font-medium"
              />
              <Input
                label="Post Code"
                placeholder="Post Code"
                // value={data?.post_code}
                disabled
                labelClassName="text-base font-bold"
                className="flex-grow"
              />
            </Flex>
          </FormGroup>
        </div>
      </div>
    </>
  );
}
