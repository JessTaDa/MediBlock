
const mediblockContract = artifacts.require('./Mediblock.sol')

contract('mediblock', function ([user1]) {

      let instance

      beforeEach('setup contract for each test', async function () {
          instance = await mediblockContract.new({gas: 6721975})
      })

      it('creates new prescription', async function () {
        console.log(user1);
        await instance.createPrescription("Karen", user1, "cucumbers", 121212, 111111);
        fetchDrugs = await instance.getPrescriptionsById(0);
        console.log(fetchDrugs[0]);
          assert.equal(user1, fetchDrugs[0]);
      })

})
