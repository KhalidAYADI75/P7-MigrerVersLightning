@isTest
public class OpportunitySelectorTest { 
    @testSetup static void setup() {
        Account account=new Account(Name='testAcct');
        insert account;
        insert new Opportunity(Name='OpportunityLike', AccountId = account.Id , StageName = 'Prospecting', CloseDate = Date.Today());
        insert new Opportunity(Name='OpportunityNotLike', AccountId = account.Id , StageName = 'Prospecting', CloseDate = Date.Today());
    }
    @isTest
    static void getByNameLikeAndAccountIdTest() {
        Account acc=[SELECT Id FROM Account WHERE Name='testAcct'];
        List<Opportunity> opportList=OpportunitySelector.getByNameLikeAndAccountId('OpportunityL',acc.Id);
         System.assertEquals(1,opportList.size());
    }
    @isTest
    static void getByAccountIdTest() {
        Account acc=[SELECT Id FROM Account WHERE Name='testAcct'];
        List<Opportunity> opportList=OpportunitySelector.getByAccountId(acc.Id);
        System.assertEquals(2,opportList.size());
    }
}