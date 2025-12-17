import React, { useState } from 'react'
import { FaBook } from 'react-icons/fa6';
import { MdNoteAlt } from 'react-icons/md';
import { PiCertificateFill } from 'react-icons/pi';
import { ImAttachment } from "react-icons/im";
import { Button } from 'rizzui';
import TabLetter from './TabLetter';
import TabMedicalCertificateLetter from './TabMedicalCertificateLetter';
import TabSpecialistLetter from './TabSpecialistLetter';
import TabAttachment from './TabAttachment';

interface PropTypes {
    isView: boolean;
}

const TabLetterAndAttachment = (props: PropTypes) => {
    const [subTab, setSubTab] = useState<'letter' | 'medical certificate letter' | 'specialist letter' | 'attachment'>('letter')
    return (
        <div className='flex flex-col gap-9'>
                    <div className='flex gap-4'>
                        <Button
                            variant={subTab === 'letter' ? 'solid' : 'outline'}
                            type="button"
                            onClick={() => setSubTab('letter')}
                            className='flex gap-2 text-sm'
                        >
                            <MdNoteAlt /> Letter
                        </Button>
                        <Button
                            variant={subTab === 'medical certificate letter' ? 'solid' : 'outline'}
                            type="button"
                            onClick={() => setSubTab('medical certificate letter')}
                            className='flex gap-2 text-sm'
                        >
                            <PiCertificateFill />  Medical Certificate Letter
                        </Button>
                        <Button
                            variant={subTab === 'specialist letter' ? 'solid' : 'outline'}
                            type="button"
                            onClick={() => setSubTab('specialist letter')}
                            className='flex gap-2 text-sm'
                        >
                            <FaBook /> Specialist Letter
                        </Button>
                        <Button
                            variant={subTab === 'attachment' ? 'solid' : 'outline'}
                            type="button"
                            onClick={() => setSubTab('attachment')}
                            className='flex gap-2 text-sm'
                        >
                            <ImAttachment /> Attachment
                        </Button>
                    </div>
        
                    <div className='flex'>
                        {subTab === 'letter' && <TabLetter />}
                        {subTab === 'medical certificate letter' && <TabMedicalCertificateLetter />}
                        {subTab === 'specialist letter' && <TabSpecialistLetter />}
                        {subTab === 'attachment' && <TabAttachment />}
                    </div>
                </div>
    )
}

export default TabLetterAndAttachment