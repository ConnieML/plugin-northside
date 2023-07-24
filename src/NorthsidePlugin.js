import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';


import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'NorthsidePlugin';

export default class NorthsidePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
    this.crmRef = React.createRef();
  };
    // helper function for posting messages to the CRM
    updateCRM(profileId) {
      this.crmRef.current.contentWindow.postMessage(
        { id: profileId },
        'https://duckycrm-7409-dev.twil.io'
      );
    }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    flex.MainHeader.defaultProps.logoUrl="https://i.postimg.cc/7ZPsMhyH/connie-contact-rtc-logo-tm.png";
    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskList key="NorthsidePlugin-component" />, options);
    manager.strings.NoTasks = "There are no active tasks Hooray!";
    // flex.AgentDesktopView.Panel2.Content.add(<CustomTaskList key="NorthsidePlugin-component" />, options);

    //v0.02 - Adding Caller I.D. data to tasks
       // remove CRMContainer
       flex.AgentDesktopView.Panel2.Content.remove('container');
       // add our own iframe container with a ref
       flex.AgentDesktopView.Panel2.Content.add(
        //  <iframe
        //    key="crmIframe"
        //    ref={this.crmRef}
        //   //  src="https://duckycrm-7409-dev.twil.io/spa.html"
        //       src="https://airtable.com/shrVTU8uyYD6nXuuq"
        //    style={{ height: '100vh' }}
        //  />
        // In lines 46 - 47 we replace duckyCRM w/ airtable base...
        <iframe key="crmIframe" ref={this.crmRef} src="https://airtable.com/embed/shrVTU8uyYD6nXuuq?backgroundColor=blue&layout=card&viewControls=on" style={{ height: '100vh' }}/>
       );
       // post message whenever a new task is selected
       flex.Actions.addListener('beforeSelectTask', (payload) => {
         if (
           payload.task &&
           payload.task.attributes &&
           payload.task.attributes.account_number
         ) {
           this.updateCRM(payload.task.attributes.account_number);
         }
         // no account number found
         else {
           this.updateCRM(null);
         }
       });
    
      manager.strings.TaskLineCallReserved =
        'SLA: {{task.attributes.account_data.service_level}}'
  }
}
