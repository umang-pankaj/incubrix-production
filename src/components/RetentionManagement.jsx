import React from 'react';

const RetentionManagement = ({
  userId = '',
  planId = ''
}) => {
  return (
    <>
      <ck-widget data-powered-by="Churnkey.co Cancel Flows" vce-ready=""><div className="ck-style"></div></ck-widget>
<ck-pause-wall data-powered-by="Churnkey.co Cancel Flows" vce-ready=""></ck-pause-wall>
<ck-failed-payment-wall data-powered-by="Churnkey.co Automated Payment Recovery" vce-ready=""></ck-failed-payment-wall>
<ck-managed-flow data-powered-by="Churnkey.co Cancel Flows" vce-ready=""></ck-managed-flow>
    </>
  );
};

export default RetentionManagement;