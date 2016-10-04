import React from 'react';
import Success from './success';
import Failure from './failure';
import { conditionalRender } from '../../utils';

const Confirm = ({ confirm }) => {
  let content = null;

  if (confirm) {
    content = conditionalRender(confirm.reason === 'SUCCESS',
      (
        <Success message={'Deal placed.'} />
      ),
      (
        <Failure message={'Deal rejected.'} />
      )
    )
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default Confirm;
