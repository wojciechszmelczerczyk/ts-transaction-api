# Create transaction

## Description

Add new transaction in `.csv` file and return modified date

<b>URL:</b> `/api/transaction`

<b>Method:</b> `POST`

<b>Auth required:</b> `no`

## Data constraints

```json
{
  "date": "[valid iso date format]",
  "status": "[boolean]"
}
```

## Data example

```json
{
  "date": "2015-01-02",
  "status": "false"
}
```

## Success Response

Code: `200 OK`

### Context example

```json
{ "modifiedDate": "2012-03-02T00:00:00.000Z" }
```

## Error Response

Code: `400 BAD REQUEST`

Condition: If `date` is wrong.

```json
{
  "err": "Bad date format. String has to be date format"
}
```

Code: `400 BAD REQUEST`

Condition: If `status` is wrong.

```json
{
  "err": "Bad status type. Status has to be either 'true' or 'false'"
}
```
