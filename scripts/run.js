const { hexStripZeros } = require("ethers/lib/utils")

const main = async () => {
    /*const [owner, randomPerson] = await hre.ethers.getSigners();*/
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    //const waveContract = await waveContractFactory.deploy();
    const waveContract = await waveContractFactory.deploy({ value: hre.ethers.utils.parseEther("0.1") });
    await waveContract.deployed();
    console.log("Contract address:", waveContract.address);
    /*console.log("Contract deployed by:", owner.address);*/
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance : ", hre.ethers.utils.formatEther(contractBalance));
    let waveTxn = await waveContract.wave("This is a public message 1");
    await waveTxn.wait();
    /*
    waveTxn = await waveContract.wave("This is a public message 2");
    await waveTxn.wait();
    */
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave("Another message from Random person!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    /*

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    let waveTxn = await waveContract.wave("This is a public message!");
    await waveTxn.wait();

    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave("Another message from Random person!");
    await waveTxn.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
    */
    /*
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
    */
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
