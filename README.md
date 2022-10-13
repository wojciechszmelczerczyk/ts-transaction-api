# Transaction managing API

## Description

Simple REST API for transaction handling.

## Table of contents

- [Techstack](#techstack)
- [Requirements](#requirements)
- [Usage](#usage)
- [API endpoints](#api)
- [Modify date](#modify-date-helper-function)

## Techstack:

- `Express`
- `TypeScript`

## Requirements:

- `node`

## Usage

### Clone repository

```
git clone https://github.com/wojciechszmelczerczyk/ts-date-api.git
```

### Navigate to project folder

```sh
cd /ts-date-api
```

### Install dependencies

```
npm i
```

### Test function

```
npm run test-function
```

### Run API

```
npm run dev
```

## API

| Endpoint           | Method | Description                                                 |
| :----------------- | :----: | ----------------------------------------------------------- |
| `/api/transaction` |  POST  | Add new transaction in `.csv` file and return modified date |

## Modify date helper function

Simple function which takes as an input `Date` and transaction status `Boolean` value and returns date in future:

- when boolean is set to `false`, returned date should be 5 days in
  future.
- when boolean is set to `true`, returned date should be month in future.

ex.

### input:

```json
{ "date": "2024-01-31T08:12:59Z", "status": true }
```

### output:

```json
{ "date": "2024-02-29T08:12:59Z" }
```
