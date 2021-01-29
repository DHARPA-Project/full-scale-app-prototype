import { ReactWidget, UseSignal } from '@jupyterlab/apputils';

import * as React from 'react';

import { KernelModel } from './model';

// import ReactDOM from 'react-dom'
import {HashRouter as Router} from 'react-router-dom'

import ContextProvider from './react-proto-src/context'
import App from './react-proto-src/components/App'

import 'semantic-ui-css/semantic.css'
import './react-proto-src/index.scss'
import './wrapper.scss'

export class KernelView extends ReactWidget {
  constructor(model: KernelModel) {
    super();
    this._model = model;
  }


  protected render(): React.ReactElement<any> {
    return (
      <React.Fragment>
        <button
          key="header-thread"
          className="jp-example-button"
          onClick={(): void => {
            this._model.execute('3+5');
          }}
        >
          Compute 3+5 !
        </button>
        <UseSignal signal={this._model.stateChanged}>
          {(): JSX.Element => (
            <span key="output field">{JSON.stringify(this._model.output)}</span>
          )}
        </UseSignal>

        {/* !!! */}
        <div className="dharpa-demo-wrapper">
          <ContextProvider>
            <Router>
              <App />
            </Router>
          </ContextProvider>
        </div>
       

      </React.Fragment>
    );
  }

  private _model: KernelModel;
}
