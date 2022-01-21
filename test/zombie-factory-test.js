const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Create random zombie", function() {

    beforeEach(async () => {
        ZombieFactory = await ethers.getContractFactory("ZombieFactory");
        zombieFactory = await ZombieFactory.deploy();
        await zombieFactory.deployed();
    });

    it("Should return name and dna successfully", async function() {
        const newZombieTx = await zombieFactory.createRandomZombie("test");
        await newZombieTx.wait();
        
        const [, dna] = await zombieFactory.zombies(0);
        expect(dna.toString()).to.equal("9029713682937432");
    });

    it("Should fail due to zombie count validation", async function() {
        await zombieFactory.createRandomZombie("test");
        await expect(zombieFactory.createRandomZombie("fail")).to.be.reverted;
    });

    it("Emits NewZombie event", async () => {
        await expect(zombieFactory.createRandomZombie("test"))
            .to.emit(zombieFactory, "NewZombie")
            .withArgs(0, "test", BigInt(9029713682937432));
    });
});