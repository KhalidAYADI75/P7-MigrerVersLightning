public class OpportunitySelector {    
    public static List<Opportunity> getByNameLikeAndAccountId(String opportunityName, Id accountId) {
        return [SELECT Id, Name, StageName, Amount, CloseDate FROM Opportunity WHERE Name LIKE:'%' + opportunityName + '%' AND accountId=:accountId];
    }
    public static List<Opportunity> getByAccountId( Id accountId) {
        return [SELECT Id, Name, StageName, Amount, CloseDate FROM Opportunity WHERE accountId=:accountId];
    }
}