import React from 'react';

const AppHeader = ({
  searchPlaceholder = ''
}) => {
  return (
    <>
      <div className="border-border-primary flex items-center justify-between self-stretch border-b p-4 sr-only" data-slot="dialog-header"><h2 className="text-label-lg text-content-primary font-semibold" data-slot="dialog-title" id="radix-_R_356fbH1_">Search Everything</h2><p className="text-label-md text-content-secondary" data-slot="dialog-description" id="radix-_R_356fbH2_">Click to add or drag items to canvas</p></div>
    </>
  );
};

export default AppHeader;