import { PiLink } from 'react-icons/pi';
import { Button, Flex, Grid, Text, Title } from 'rizzui';

export default function MyFamily() {
  return (
    <div className="flex h-screen flex-col gap-4 bg-gray-50 p-5">
      <Grid columns="1" className="gap-4 rounded-lg bg-white p-4">
        <Title as="h2" className="text-2xl font-semibold">
          My Family
        </Title>
        <Text>
          When you&apos;re logged in and you book an appointment for yourself or
          another person, these patient details will be linked to your booking
          account as a member of My Family.
        </Text>
        <Text>
          This allows you to select family members or people you care for when
          booking future appointments without having to re-enter their details.
        </Text>
        <Text>
          If you have booked an appointment for yourself or another person
          previously you&apos;ll see their names in the My Family section below.
          You can manage each member&apos;s payment details here or unlink them
          from your account.
        </Text>
        <Text>
          Unlinking a family member will not remove their details from the
          clinic itself or affect future appointments, and you can re-link a
          patient when you book another appointment on their behalf.
        </Text>
        <Text className="text-xs">
          * Please note: We don&apos;t allow you to lookup a family member
          without making an appointment for privacy reasons. Clinic staff review
          every new family member request when confirming your appointment to
          ensure your personal information is kept private. If you have any
          questions or concerns please contact your clinic directly.
        </Text>
      </Grid>
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-white p-4">
        <Flex justify="between" align="center" className="">
          <Title as="h2" className="text-2xl font-semibold">
            Geo
          </Title>

          <Button variant="text">
            Unlink this family member from my account{' '}
            <PiLink className="ml-2 h-6 w-6" />
          </Button>
        </Flex>
      </div>
    </div>
  );
}
