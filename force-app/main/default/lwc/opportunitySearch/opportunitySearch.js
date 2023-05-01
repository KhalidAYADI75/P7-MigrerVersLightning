import { LightningElement, track, wire , api} from  'lwc';
import getOpportunitySearch from  '@salesforce/apex/OpportSearch.opportunitySearch';
export  default  class  SearchClass  extends  LightningElement {
    searchKey='';
    opportunityList;
    error;
    showMessageSearching=false;
    @api recordId;
    isResult =false;

    handleonchange(event){
        this.searchKey = event.target.value;
    }

    setUrlAttribut() {
        for (var i=0;i<this.opportunityList.length;i++) {
           this.opportunityList[i].url='/'+this.opportunityList[i].Id; 
        }      
    }
    
    setDatatable() {
        this.columns = [ 
                { label : 'Name', fieldName : 'url' , initialWidth: 300 , type : 'url',
                    typeAttributes:{ 
                        target : '_self' , 
                        label: { fieldName: 'Name' }          
                    } 
                }, 
                { label : 'Stage', fieldName : 'StageName' }, 
                { label : 'Amount', fieldName : 'Amount' , type: 'currency',
                    typeAttributes: { 
                        currencyCode: 'EUR' , 
                        minimumFractionDigits: '0'                        
                    }, 
                    cellAttributes: { 
                        alignment: 'left' 
                    }
                }, 
                { label : 'Close Date', fieldName : 'CloseDate' ,type : 'date' ,
                    typeAttributes: {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric"
                    }   
                } 
        ] ;  
    }
  
    clickForSearch(){
        this.showMessageSearching=true;        
        getOpportunitySearch({opportunityName: this.searchKey,accountId:this.recordId})
        .then((result) =>{
            this.opportunityList = JSON.parse(JSON.stringify(result)); 
            this.setUrlAttribut();  
            this.setDatatable();              
            this.showMessageSearching=false; 
            if (result.length>0) {
                this.isResult =true;
            } else {
                this.isResult =false;
            }
        })
        .catch((error)=>{
            this.error = error;
            this.opportunityList = undefined;
        });
    }
}


