'use client';

import React, { Suspense } from 'react';
import Auth from './Components/Auth/page';
import DirectorParticularCompetition from "../app/Components/DISTRICT/AddActivities/ViewCompitions/ParticularCompition/page";
const JudgeAssignedEvents = React.lazy(() =>
  import("../app/Components/Judge/AsignedEvents/ParticularEvent/page")
);
import EditorDashboard from "../app/Components/EDITOR/EditorDashboard/page";
const DistrictParticularCompetitionParticipants = React.lazy(() =>
  import("../app/Components/DISTRICT/AddActivities/ViewCompitions/ParticularCompitionParticipants/page")
);
import DistrictAddActivities from "../app/Components/DISTRICT/AddActivities/page";
const DistrictAssignHead = React.lazy(() =>
  import("../app/Components/DISTRICT/AssignHead/page")
);
import EditorArtClubParticularJournal from "../app/Components/EDITOR/Activities/ArtJournal/ArtClubParticularJournal/page";
import EditorViewParticularHeritage from "../app/Components/EDITOR/Activities/AddHeritage/ViewParticularHeritage/page";


import Welcome from "../app/HobbizzWelcomePage/page"

export default function Page() {
  const shouldShowCompetition = true;

  return (
    <div>
      <Suspense fallback={<p>Loading authentication screen...</p>}>
        {/* <Auth /> */}
        <Welcome/>
        
      </Suspense>
    </div>
  );
}
