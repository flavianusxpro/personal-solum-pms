import React, { useState } from 'react'
import { FaHandHoldingMedical } from 'react-icons/fa6';
import { MdAssignmentAdd, MdBackHand, MdNoteAlt } from 'react-icons/md';
import { Button } from 'rizzui';
import { BsFileEarmarkMedicalFill } from 'react-icons/bs';
import { FaAllergies } from "react-icons/fa";
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { BiSolidInjection } from 'react-icons/bi';
import { RiFileList2Fill } from 'react-icons/ri';
import TabConsultNotes from './TabConsultNotes';
import TabMedications from './TabMedications';
import TabAllergiesAndReactions from './TabAllergiesAndReactions';
import TabMedicalHistory from './TabMedicalHistory';
import TabPastConsultation from './TabPastConsultation';
import TabImmunisations from './TabImmunisations';
import TabAdmissionHistory from './TabAdmissionHistory';

interface PropTypes {
    isView: boolean;
}

const TabClinical = (props: PropTypes) => {
    const [subTab, setSubTab] = useState<'consult notes' | 'medications' | 'allergies and reactions' | 'medical mistory' | 'past consultation' | 'immunisations' | 'admission history'>('consult notes')
    return (
        <div className='flex flex-col gap-9'>
            <div className='flex gap-4'>
                <Button
                    variant={subTab === 'consult notes' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('consult notes')}
                    className='flex gap-2 text-sm'
                >
                    <MdAssignmentAdd /> Consult Notes
                </Button>
                <Button
                    variant={subTab === 'medications' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('medications')}
                    className='flex gap-2 text-sm'
                >
                    <FaHandHoldingMedical />  Medications
                </Button>
                <Button
                    variant={subTab === 'allergies and reactions' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('allergies and reactions')}
                    className='flex gap-2 text-sm'
                >
                    <FaAllergies /> Allergies & Reactions
                </Button>
                <Button
                    variant={subTab === 'medical mistory' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('medical mistory')}
                    className='flex gap-2 text-sm'
                >
                    <BsFileEarmarkMedicalFill /> Medical History
                </Button>
                <Button
                    variant={subTab === 'past consultation' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('past consultation')}
                    className='flex gap-2 text-sm'
                >
                    <RxCounterClockwiseClock /> Past Consultation
                </Button>
                <Button
                    variant={subTab === 'immunisations' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('immunisations')}
                    className='flex gap-2 text-sm'
                >
                    <BiSolidInjection /> Immunisations
                </Button>
                <Button
                    variant={subTab === 'admission history' ? 'solid' : 'outline'}
                    type="button"
                    onClick={() => setSubTab('admission history')}
                    className='flex gap-2 text-sm'
                >
                    <RiFileList2Fill /> Admission History
                </Button>
            </div>

            <div className='flex'>
                {subTab === 'consult notes' && <TabConsultNotes />}
                {subTab === 'medications' && <TabMedications />}
                {subTab === 'allergies and reactions' && <TabAllergiesAndReactions />}
                {subTab === 'medical mistory' && <TabMedicalHistory />}
                {subTab === 'past consultation' && <TabPastConsultation />}
                {subTab === 'immunisations' && <TabImmunisations />}
                {subTab === 'admission history' && <TabAdmissionHistory />}
            </div>
        </div>
    )
}

export default TabClinical