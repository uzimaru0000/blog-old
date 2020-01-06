import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faGetPocket,
} from '@fortawesome/free-brands-svg-icons';

library.add(faAngleRight, faTwitter, faFacebook, faGetPocket);

ReactDOM.render(<App />, document.getElementById('main'));
