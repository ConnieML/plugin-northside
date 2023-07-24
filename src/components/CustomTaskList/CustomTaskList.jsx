import React, { useState } from 'react';

import { Alert } from '@twilio-paste/core/alert';
import { Theme } from '@twilio-paste/core/theme';
import { Text } from '@twilio-paste/core/text';

const CustomTaskList = () => {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) {
    return null;
  }

  const dismiss = () => setIsOpen(false);

  return (
    <Theme.Provider theme="default">
      <Alert onDismiss={dismiss} variant="neutral">
        <Text>
          Welcome to Connie Prototype V-1.0.0. Do not use in production.<br></br>
          📲 To initiate demo call: +1 (218) 695-5811
        </Text>
      </Alert>
    </Theme.Provider>
  );
};

export default CustomTaskList;
