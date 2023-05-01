@isTest
public class OpportSearchTest {
    @testSetup static void setup() {
        Account account=new Account(Name='testAcct');
        insert account;
        insert new Opportunity(Name='OpportunityLike', AccountId = account.Id , StageName = 'Prospecting', CloseDate = Date.Today());
        insert new Opportunity(Name='OpportunityNotLike', AccountId = account.Id , StageName = 'Prospecting', CloseDate = Date.Today());
    }
    @isTest
    static void opportunitySearchWithAccountIdTest() {
        Account acc=[SELECT Id FROM Account WHERE Name='testAcct'];
        List<Opportunity> opportList=OpportSearch.opportunitySearch('',acc.Id);
        System.assertEquals(2,opportList.size());
    }
    @isTest 
    static void opportunitySearchWithNameLikeAndAccountIdTest() {
         Account acc=[SELECT Id FROM Account WHERE Name='testAcct'];
        List<Opportunity> opportList=OpportSearch.opportunitySearch('OpportunityL',acc.Id);
        System.assertEquals(1,opportList.size());
    }
    
}