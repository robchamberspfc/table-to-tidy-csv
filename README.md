# table-to-tidy-csv



## Additional columns

### Same value for all fields
In the `config.json` file you can define additional columns and a specific value to add to each row of the CSV.

 Note: ensure you also add a corresponding header and that the ID's match. E.g.
#### In 'header'
```
    {
        "id": "example1",
        "title": "Test"
    },
```
and
#### In 'additional'
```
    {
        "id": "example1"",
        "value": "Test value"
    },
```