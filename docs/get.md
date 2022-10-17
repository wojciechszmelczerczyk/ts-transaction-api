# Get transaction

## Description

Get transactions from `.csv` file. User can provide `page` and `limit` query params in order to paginate data\*.

<b>URL :</b> `/api/transaction?page=&limit=`

<b>URL Query Parameters:</b>

- `page=[integer]`
- `limit=[integer]`

<b>Method:</b> `GET`

<b>Auth required:</b> `no`

## Success Response

Code: `200 OK`

### Context example

```json
"ID","DATE","STATUS"
"03b18909-66db-4ec4-8290-4454096c9ace","Thu Feb 29 2024 01:00:00 GMT+0100 (Central European Standard Time)","true"
"8501f243-43b5-4d55-818b-a10dbfb79d14","Tue Feb 28 2023 01:00:00 GMT+0100 (Central European Standard Time)","true"
"dbd9db29-cd95-4866-8cc5-0a0613487d85","Sun Feb 05 2023 01:00:00 GMT+0100 (Central European Standard Time)","false"
"acdffedb-12b8-4578-a423-3071976ab4f0","Mon Feb 05 2024 01:00:00 GMT+0100 (Central European Standard Time)","false"
"024219bf-2a95-449e-b095-350846d6ce61","Thu Feb 29 2024 01:00:00 GMT+0100 (Central European Standard Time)","true"

```

## Error Response

Code: `400 BAD REQUEST`

Condition: If `page` or `limit` is wrong.

```json
{
  "err": "Page and limit have to be positive numeric values"
}
```

Code: `400 BAD REQUEST`

Condition: If `page` or `limit` exceed data.

```json
{
  "err": "No data available for this parameters"
}
```
