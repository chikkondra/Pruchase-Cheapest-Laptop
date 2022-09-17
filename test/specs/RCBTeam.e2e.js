const { assert } = require('chai');
const PlayerList = require('../pageobjects/playerlist.json');
describe("Selecting RCB Team", () => {
    it("Validate four foregin player in team", () => {

        var foreignplayercount = 0;
        for (i = 0; i < 11; i++) {
            console.log('playerCountryList ' + [i] + " " + PlayerList.player[i].country)
            if (PlayerList.player[i].country != 'India') {
                foreignplayercount = foreignplayercount + 1;
            }
            else {
                foreignplayercount = foreignplayercount;
            }
        }
        console.log("total count" + foreignplayercount)
        assert.equal(foreignplayercount, 4, "RCB contains 4 foregin players only")
    })

    it("Validate atleast one wicket keeper in team", () => {

        var wicketKeeperCount = 0;
        for (i = 0; i < 11; i++) {
            console.log('wicketKeeper ' + [i] + " " + PlayerList.player[i].role)
            if (PlayerList.player[i].role === 'Wicket-keeper') {
                wicketKeeperCount = wicketKeeperCount + 1;
            }
            else {
                wicketKeeperCount = wicketKeeperCount;
            }
        }
        console.log("total count of wicket keepers is " + wicketKeeperCount)
        assert.isAtLeast(wicketKeeperCount, 1, "RCB contains atleast one wicket keeper")

    })
})