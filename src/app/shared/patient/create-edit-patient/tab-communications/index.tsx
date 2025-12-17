import React, { useState } from 'react'
import { IoIosMailOpen } from 'react-icons/io';
import { IoChatboxEllipsesSharp, IoChatbubblesSharp } from 'react-icons/io5';
import { PiNoteFill } from 'react-icons/pi';
import { Button } from 'rizzui';
import TabAll from './TabAll';
import TabEmail from './TabEmail';
import TabSMS from './TabSMS';
import TabAdminNotes from './TabAdminNotes';

interface PropTypes {
    isView?: boolean;
}

const TabCommunications = (props: PropTypes) => {
    const { isView } = props
    const [subTab, setSubTab] = useState<'all' | 'email' | 'sms' | 'admin notes'>('all')
    return (
        <div className='flex flex-col gap-9'>
            <div className='flex gap-4'>
                <Button
                    variant={subTab === 'all' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('all')}
                    className='flex gap-2 text-sm'
                >
                    <IoChatbubblesSharp /> All
                </Button>
                <Button
                    variant={subTab === 'email' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('email')}
                    className='flex gap-2 text-sm'
                >
                    <IoIosMailOpen />  Email
                </Button>
                <Button
                    variant={subTab === 'sms' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('sms')}
                    className='flex gap-2 text-sm'
                >
                    <IoChatboxEllipsesSharp /> SMS
                </Button>
                <Button
                    variant={subTab === 'admin notes' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('admin notes')}
                    className='flex gap-2 text-sm'
                >
                    <PiNoteFill /> Admin Notes
                </Button>
            </div>

            <div className='flex'>
                {subTab === 'all' && <TabAll />}
                {subTab === 'email' && <TabEmail />}
                {subTab === 'sms' && <TabSMS />}
                {subTab === 'admin notes' && <TabAdminNotes />}
            </div>
        </div>
    )
}

export default TabCommunications