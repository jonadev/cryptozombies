const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Create new zombie", function() {
    it("Should return name and dna", async function() {
        const ZombieFactory = await ethers.getContractFactory("ZombieFactory");
        const zombieFactory = await ZombieFactory.deploy();
        await zombieFactory.deployed();

        const newZombieTx = await zombieFactory.createRandomZombie("test");
        await newZombieTx.wait();
        
        const [, dna] = await zombieFactory.zombies(0);
        expect(dna.toString()).to.equal("9029713682937432");
    });
});