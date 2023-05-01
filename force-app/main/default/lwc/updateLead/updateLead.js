import { LightningElement , api , track} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import ID_FIELD from "@salesforce/schema/Lead.Id";
import STATUS_FIELD from "@salesforce/schema/Lead.Status";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class UpdateLead extends LightningElement {
  @api recordId;
  status;

  successLeadUpdated() {
    const evt=new ShowToastEvent({
      title : '',
      message : 'Lead status updated successfully',
      variant : 'success'
    });
    this.dispatchEvent(evt);
  }

  closeModal() {
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  handleLoad() {
    this.dispatchEvent(new CloseActionScreenEvent());
    const fields = {};
    fields[ID_FIELD.fieldApiName] = this.recordId;
    fields[STATUS_FIELD.fieldApiName] = "Working - Contacted";        
    const recordInput = {
      fields: fields
    };
     updateRecord(recordInput).then((record) => {
      // this.dispatchEvent(new CloseActionScreenEvent());
    //   eval("$A.get('e.force:refreshView').fire();"); 
    this.successLeadUpdated();
      });
  }

  connectedCallback() {
    setTimeout(() => {
      this.handleLoad();
    }, 5);
  }

}