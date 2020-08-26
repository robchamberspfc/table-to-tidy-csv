# table-to-tidy-csv

Converts simple tablular data and allows additional columns to be added, either universally or based on the values in other columns.

## Running

```clone repo```

```npm install```

```node convert.js {script} {filepath} {filename}```
e.g. node convert.js config http://127.0.0.1:8887/input/ full


## Define input

### Data

#### Required config

##### Input
```    
"input": ["Months", "Price ppl", "Volume (million litres)", "Butterfat (%)", "Protein (%)"],
```

##### Headers
```
    {
        "id": "date",
        "title": "Months"
    },
```

#### Expected input
|Time|Label|Label|Label|
|---|---|---|---|
|{date values}|{data}|{data}|{data}|
|{date values}|{data}|{data}|{data}|
|{date values}|{data}|{data}|{data}|

#### Output
|Time|Values|Dimension|
|---|---|---|
|{date values}|{data}|{label}|
|{date values}|{data}|{label}|
|{date values}|{data}|{label}|

### Additional columns

#### Same value for all fields
In the `config.json` file you can define additional columns and a specific value to add to each row of the CSV.

 Note: ensure you also add a corresponding header and that the ID's match. E.g.
##### In 'header'
```
    {
        "id": "example1",
        "title": "Test"
    },
```
and
##### In 'additional'
```
    {
        "id": "example1"",
        "value": "Test value"
    },
```

### Dependent on other column values

```
    {
        "id": "unit",
        "column":"measure",
        "ifValue": "Price ppl",
        "thenValue": "price"
    },
```
