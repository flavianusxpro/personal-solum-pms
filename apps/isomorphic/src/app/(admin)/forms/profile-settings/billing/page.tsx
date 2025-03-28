import BillingSettingsView from '@/app/shared/account-settings/billing-settings';
import EventForm from '@/app/shared/event-calendar/event-form';
import ExportButton from '@/app/shared/export-button';
import ModalButton from '@/app/shared/modal-button';
import { metaObject } from '@/config/site.config';
import { eventData } from '@/data/event-data';
import AppointmentListPage from '../appointment/list/page';

export const metadata = {
...metaObject('Password'),
};

export default function BillingPage() {
return (
    <>
        <div className="mt-10 mb-4 w-[320px] flex items-center gap-3">
            <ModalButton
                label="Create Billing"
                view={<EventForm />}
                customSize="900px"
                className="mt-0 w-full @lg:w-auto"
            />
            <ExportButton
                data={eventData}
                fileName="event_data"
                header="ID,Title,Description,Location,Start,end"
            />
        </div>

        <BillingSettingsView />
        <AppointmentListPage />
    </>
);
}
