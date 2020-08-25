const d3 = require('d3-fetch');
if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

fetch("http://127.0.0.1:8887/input/config.json").then((response) => response.json())
    .then(json => {
        afterConfigLoaded(json)
    }).catch(function (error) {
        console.log(error);
    });

function afterConfigLoaded(config) {
    const csvWriter = createCsvWriter({
        path: 'output-test.csv',
        header: config.headers
    });

    let data = [];

    // d3.csv("http://127.0.0.1:8887/input/test.csv").then(function (d) {
    d3.csv("http://127.0.0.1:8887/input/full.csv").then(function (d) {
        let output = []
        for (i = 1; i < config.input.length; i++) {
            for (j = 0; j < d.length; j++) {
                heading1 = config.headers[0].id
                heading2 = config.headers[1].id
                heading3 = config.headers[2].id
                if (d[j][config.input[i]] != 0) {
                    text = [{[heading1]: d[j].Months},{[heading2]: d[j][config.input[i]]},{[heading3]: d.columns[i]}]
                    output.push(text)
                }
            }
        }
        // for (k=0; k< output.length; k++) {
        //     element = {}
        //     element.id = "date123";
        //     element.quantity = "rob";
        //     output[k].push({[element.id]: element.quantity});
        // }
        // console.log(output[0])
        data = output
        // data = [{ date: 'Apr-78' },{ value: '10.15' },{ measure: 'Price ppl' },{ data123: 'Price ppl' }]
        // data = "[ { date: 'Jan-70' }, { value: '4.08' }, { measure: 'Price ppl' } ]"

        // console.log(data)
        csvWriter.writeRecords(data)
            .then(() => {
                console.log('Complete');
            });
        return data
    }).catch(function (error) {
        console.log(error);
    });
}