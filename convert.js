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
    console.log(config.headers)

    const csvWriter = createCsvWriter({
        path: 'output-test.csv',
        header: config.headers
    });

    let data = [];

    d3.csv("http://127.0.0.1:8887/input/full.csv").then(function (d) {
        let output = []
        for (i = 1; i < config.input.length; i++) {
            for (j = 0; j < d.length; j++) {
                heading1 = config.headers[0].id
                heading2 = config.headers[1].id
                heading3 = config.headers[2].id
                if (d[j][config.input[i]] != 0) {
                    text = {[heading1]:d[j].Months,[heading2]: d[j][config.input[i]],[heading3]: d.columns[i]}
                    output.push(text)
                }
            }
        }

        //add in and additional values on all rows
        for (k=0; k<output.length; k++) {
            for(l=0; l< config.additional.length; l++) {
            Object.assign(output[k], {[config.additional[l].id]: config.additional[l].value});
            }
        }
        
        data = output
        csvWriter.writeRecords(data)
            .then(() => {
                console.log('Complete');
            });
        return data
    }).catch(function (error) {
        console.log(error);
    });
}