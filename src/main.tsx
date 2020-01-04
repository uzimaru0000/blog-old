import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faEgg } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleRight, faEgg);

ReactDOM.render(<App />, document.getElementById('main'));
