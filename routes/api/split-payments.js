const express = require("express");
const router = express.Router();
const config = require("config");

// This file calculates the amount due to one or more split payment "entities" as well as the amount left after all splits have been computed.
// https://flutterwave.stoplight.io/docs/2022-tech-heroes/51d6f08ecdada-lannister-pay-tpss

// Post request for splitpay transactions
router.post("/", (req, res) => {
    const { ID, Amount, Currency, CustomerEmail } = req.body;
    const { SplitType, SplitValue, SplitEntityId } = req.body.SplitInfo;

    // Validate request parameters
    if (!ID || !Amount || !Currency || !CustomerEmail) {
        return res.status(400).json({ msg: "Please Enter All Fields" });
    }

    // FLAT
    // Initialize the split entity
    var resultOne = [];
    var flatSumArr = 0;

    // For loop for nested array
    for (var i = 0; i < req.body.SplitInfo.length; i++) {

        // Initialize the nested split entity by indexing
        splitTypeArr = req.body.SplitInfo[i].SplitType;
        splitValueArr = req.body.SplitInfo[i].SplitValue;
        splitEntityIdArr = req.body.SplitInfo[i].SplitEntityId;

        // Following the order of precedence for the SplitType
        if (splitTypeArr === "FLAT") {
            splitAmount = splitValueArr;
            flatSumArr += splitAmount;
            balance = req.body.Amount - flatSumArr;
        }

        // remainingBalance after first set of splitting
        remainingBalance = req.body.Amount - flatSumArr;

        // Push split details to array inside the for loop
        if (splitTypeArr === "FLAT") {
            resultOne.push({
                SplitEntityId: splitEntityIdArr,
                Amount: splitAmount
            });
        } else {

        }

    }

    // PERCENTAGE
    // Initialize the split entity
    var resultTwo = [];
    var percentageSumArr = 0;

    // For loop for nested array
    for (var i = 0; i < req.body.SplitInfo.length; i++) {

        // Initialize the nested split entity by indexing
        splitTypeArr = req.body.SplitInfo[i].SplitType;
        splitValueArr = req.body.SplitInfo[i].SplitValue;
        splitEntityIdArr = req.body.SplitInfo[i].SplitEntityId;

        // Following the order of precedence for the SplitType
        if (splitTypeArr === "PERCENTAGE") {
            splitAmount = remainingBalance * (splitValueArr / 100);
            balance = remainingBalance - splitAmount;
            percentageSumArr += splitAmount;
        }

        // remainingBalance after first set of splitting
        totalSplitAmount = flatSumArr + percentageSumArr;
        remainingBalance = req.body.Amount - totalSplitAmount;

        // Push split details to array inside the for loop
        if (splitTypeArr === "PERCENTAGE") {
            resultTwo.push({
                SplitEntityId: splitEntityIdArr,
                Amount: splitAmount
            });
        } else {

        }

    }

    // RATIO
    // Initialize the split entity
    var resultThree = [];
    let ratioSum = 0;
    var ratioSplitAmount = 0;

    for (const split of req.body.SplitInfo) {
        if (split.SplitType == "RATIO") ratioSum += split.SplitValue;
    }

    for (const split of req.body.SplitInfo) {
        if (split.SplitType == "RATIO") {

            ratioSplitAmount = remainingBalance * (split.SplitValue / ratioSum);

            // Push split details to array inside the for loop
            resultThree.push({
                SplitEntityId: split.SplitEntityId,
                Amount: ratioSplitAmount
            });

        }

    }

    // Final Balance
    remainingBalance = req.body.Amount - totalSplitAmount - remainingBalance;

    // Making sure the balance is not less than 0.
    if (remainingBalance < 0) {
        return res.status(400).json({ msg: "Invalid Summation of Split Values, Percentages and Ratios or Invalid Arrangement of Split Types." });
    }

    // JSON response
    res.json({
        ID: req.body.ID,
        Balance: remainingBalance,
        SplitBreakdown: [
            ...resultOne,
            ...resultTwo,
            ...resultThree
        ],
    });

});

// export router
module.exports = router;
