'use client';

import ExportButton from '@/app/shared/ui/export-button';
import ModalButton from '@/app/shared/ui/modal/modal-button';
import PageHeader from '@/app/shared/ui/page-header';
import { routes } from '@/config/routes';
import { eventData } from '@/data/event-data';
import EventForm from '@/app/shared/calendar/event-form';

const pageHeader = {
  title: 'Calendar',
  breadcrumb: [
    {
      href: routes.appointment.dashboard,
      name: 'Home',
    },
    {
      href: routes.calendar,
      name: 'Calendar',
    },
  ],
};

function EventPageHeader() {
  // const { createEvent } = useEventCalendar();
  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <ExportButton
          data={eventData}
          fileName="event_data"
          header="ID,Title,Description,Location,Start,end"
        />
        <ModalButton
          label="Create Event"
          view={<EventForm />}
          customSize="900px"
          className="mt-0 w-full @lg:w-auto"
        />
      </div>
    </PageHeader>
  );
}

export default EventPageHeader;
