# SplitPay

## SplitPay - Split Payment NodeJS

## Installation:

```
npm install
```

or

```
yarn add
```

```
npm run dev
```

## Important Info:

1. 'SplitType' is of three categories namely, FLAT, PERCENTAGE and RATIO.

2. The order of precedence for the 'SplitType' is as follow:
   FLAT types is computed before PERCENTAGE OR RATIO types
   PERCENTAGE types is computed before RATIO types.
   RATIO types is computed last.
3. 'SplitEntityId' can be seen as Account ID.

## Example

Request Type: POST

Content Type: application/json

Endpoint: https://splitpay-nodejs.onrender.com

Sample Payload:

```
{
    "ID": 1308,
    "Amount": 4500,
    "Currency": "NGN",
    "CustomerEmail": "anon8@customers.io",
    "SplitInfo": [
        {
            "SplitType": "FLAT",
            "SplitValue": 450,
            "SplitEntityId": "LNPYACC0019"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0011"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0015"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 2,
            "SplitEntityId": "LNPYACC0016"
        },
        {
            "SplitType": "FLAT",
            "SplitValue": 2450,
            "SplitEntityId": "LNPYACC0029"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 10,
            "SplitEntityId": "LNPYACC0215"
        }
    ]
}
```

Sample Response:

```
{
    "ID": 1308,
    "Balance": 0,
    "SplitBreakdown": [
        {
            "SplitEntityId": "LNPYACC0019",
            "Amount": 450
        },
        {
            "SplitEntityId": "LNPYACC0029",
            "Amount": 2450
        },
        {
            "SplitEntityId": "LNPYACC0015",
            "Amount": 48
        },
        {
            "SplitEntityId": "LNPYACC0215",
            "Amount": 155.20000000000002
        },
        {
            "SplitEntityId": "LNPYACC0011",
            "Amount": 838.08
        },
        {
            "SplitEntityId": "LNPYACC0016",
            "Amount": 558.7200000000001
        }
    ]
}
```
