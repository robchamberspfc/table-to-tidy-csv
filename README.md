# table-to-tidy-csv

Converts simple tabular data and allows additional columns to be added, either universally or based on the values in other columns.

## Input
|Time|Label|Label|Label|
|---|---|---|---|
|{date values}|{data}|{data}|{data}|
|{date values}|{data}|{data}|{data}|
|{date values}|{data}|{data}|{data}|

## Output
|Time|Values|Dimension|
|---|---|---|
|{date values}|{data}|{label}|
|{date values}|{data}|{label}|
|{date values}|{data}|{label}|

## Running

Instructions for MacOS

**To install:**

```npm install```

**To run:**

```node script/convert.js {config-name} {input-filepath} {input-filename}```

For example: ```node script/convert.js example  http://127.0.0.1:8887/example/ example ```

Input files must be available from a full URI

## Define input

### Data

#### Required config

[Example](/input/config.json)

##### Input

The input describes the column title of the input CSV.

```    
"input": ["Months", "Price ppl", "Volume (million litres)", "Butterfat (%)", "Protein (%)"],
```

##### Headers

Each column in the output CSV must be defined in the headers block in the following format. 

```
    {
        "id": "date",
        "title": "Months"
    },
```


#### Additional columns

Additional columns must be added after the 3 required output columns.

##### Same value for all fields
In yor config file you can define additional columns and a specific value to add to each row of the CSV.

Note: ensure you also add a corresponding header and that the ID's match. 

For example:

**'additional'**
```
    {
        "id": "example1"",
        "value": "Test value"
    },
```
and

**'header'**
```
    {
        "id": "example1",
        "title": "Test"
    },
```

##### Dependent on other column values
Add values to a new column based on if they match another column. Column will be blank for any values that don't match.
```
    {
        "id": "unit",
        "column":"measure",
        "ifValue": "Price ppl",
        "thenValue": "price"
    },
```
##### If/else column
Add an additional column by checking if a value matches another. If it doesn't match any of these values the 'else' value will be used.

```
    {
        "id": "geography",
        "column": "date",
        "ifValue": ["Sep-94", "Oct-94"],            
        "thenValue": "K03000001",
        "else": "K02000001"
    }
```
Currently checks up to 5 values entered in the ifValue array.



## Codelists

`node script/codelist.js http://127.0.0.1:8887/input/ milk-annual years`

`node script/codelist.js http://127.0.0.1:8887/input/ milk-monthly months`

