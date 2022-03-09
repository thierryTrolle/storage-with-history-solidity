const StorageWithHistory = artifacts.require('StorageWithHistory');//allow to instanciate new instance
const truffleAssert = require('truffle-assertions');//allow to use  assert.equal()
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');


contract("StorageWithHistory", function (accounts) {

    let [user1, user2, user3] = accounts;


    it("T1:Je teste un set de la valeur", async () => {

        let newValue=new BN(2);

        //given
        let StorageWithHistoryContractInstance = await StorageWithHistory.new({ from: user1 });

        //when 
        let result=await StorageWithHistoryContractInstance.setValue(newValue,{ from: user2 });

        //then
        console.log(result.logs);
        console.log("result.logs[0].args.addressSetter:"+result.logs[0].args.addressSetter);
        console.log("result.logs[0].args.newValue:"+result.logs[0].args.newValue);
        assert.equal(result.receipt.status, true, "setValue fail");
        assert.equal(result.logs[0].event, "EventSetValue", "ne lance pas d\'event EventTransferTo");
        assert.equal(result.logs[0].args.addressSetter,user2,"Pas de verification que user2 à set");
        //FIXME pourquoi 2 n'est pas egal à 2
        //assert.equal(new BN(result.logs[0].args.newValue),newValue,"Pb la valeur n'est pas newValue");

        //when 
        let value=await StorageWithHistoryContractInstance.getValue({ from: user2 });

        //console.log(result);
        // console.log("newValue="+newValue);
        // console.log("value="+value);

        //FIXME si je fait new BN(value)=newValue c'est faux !
        assert.equal(value,2,"Pb la valeur n'est pas newValue");
    });

    it("T2:Je teste l'enregistrement de 2 entrées et la lecture de l'enregistrement 0 et le revert si historique n'existe pas", async () => {


        //given
        let StorageWithHistoryContractInstance = await StorageWithHistory.new({ from: user1 });

        //when 
        await StorageWithHistoryContractInstance.setValue(new BN(1),{ from: user1 });
        await StorageWithHistoryContractInstance.setValue(new BN(2),{ from: user2 });

        //then
        let historyLenght=await StorageWithHistoryContractInstance.getHistoryLenght();
        let entry0=await StorageWithHistoryContractInstance.getHistoryEntry(0);

        assert.equal(historyLenght,2,"Pb avec taille de l'historique");
        assert.equal(entry0[0],user1,"Verification user ko");
        assert.equal(entry0[1],1,"Verification valeur ko");


    });
});