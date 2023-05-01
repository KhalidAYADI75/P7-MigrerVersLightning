public with sharing class OpportSearch {
    @AuraEnabled
    public static List<Opportunity> opportunitySearch(String opportunityName , Id accountId) {        
      List<Opportunity> opportunityList;
      if (opportunityName=='') {
        opportunityList=OpportunitySelector.getByAccountId(accountId);
      } else {
        opportunityList=OpportunitySelector.getByNameLikeAndAccountId(opportunityName,accountId);
      }
      return opportunityList;
    }
}
