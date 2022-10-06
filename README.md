# PersonalBudget
A personal budget managing app using envelope technique, there are 2 dummies envelope for you to try at first
To use api, connect to your pc's local host 3001 (http://localhost:3001/)
Function:
  + Get all envelope: GET envelope
  + Create new envelope: POST envelope?name=yourEnvName&balance=yourBalance&info=yourInfo
  + Spend money and add money: PUT envelope/{id number}?action=spend/add&uchangeNum=money
  + Update envelope: PUT envelope/{id number}?action=changeInfo&(optional query name, info, balance, transaction)
  + Delete envelope: DELETE envelope/{id number}
  + Transfer money between envelopes: POST envelope/transfer?giverId=yourGiverEnvelope&receiverId=yourReceiverEnvelope&(optional: changeNume=money, if you don't add changeNum it's implied that you want to transfer all of your giver envelope's money)
  
