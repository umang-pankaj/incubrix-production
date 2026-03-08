import React from 'react';

const EditorWorkspace = ({
  initialValue = ''
}) => {
  return (
    <>
      <section aria-atomic="false" aria-label="Notifications alt+T" aria-live="polite" aria-relevant="additions text" tabIndex="-1"></section>
<textarea aria-hidden="true" style={{minHeight: '0px !important', maxHeight: 'none !important', height: '0px !important', visibility: 'hidden !important', overflow: 'hidden !important', position: 'absolute !important', zIndex: '-1000 !important', top: '0px !important', right: '0px !important', display: 'block !important', borderWidth: '1px', boxSizing: 'content-box', fontFamily: 'monospace', fontSize: '13.3333px', fontStyle: 'normal', fontWeight: '400', letterSpacing: 'normal', lineHeight: 'normal', padding: '2px', tabSize: '8', textIndent: '0px', textRendering: 'auto', textTransform: 'none', width: '175px', wordBreak: 'normal', wordSpacing: '0px', scrollbarGutter: 'auto'}} tabIndex="-1"></textarea>
    </>
  );
};

export default EditorWorkspace;