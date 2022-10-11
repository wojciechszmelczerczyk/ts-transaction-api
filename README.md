# Date managing API

## Description

Simple REST API for date handling.

## Table of contents

- [Techstack](#techstack)
- [Modify date](#modify-date-helper-function)

## Techstack:

- `TypeScript`

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
