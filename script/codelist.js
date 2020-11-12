const d3 = require('d3-fetch');
if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const args = process.argv.slice(2)
const filePath = args[0]
const csvName = args[1]
const date = args[2]


let path = 'codelist.csv'

const csvWriter = createCsvWriter({
    path: path,
    header: [{
            id: 'uri',
            title: 'Notation'
        },
        {
            id: 'label',
            title: 'Label'
        },
        {
            id: 'parent',
            title: 'Parent Notation'
        }
    ]
});

console.log(filePath + csvName)
d3.csv(filePath + csvName + ".csv").then(function (d) {
    let output = []
    let data = []

    //months
    if (date == "months") {
        for (j = 0; j < d.length; j++) {
            data.push({
                uri: "month/" + d[j].Months,
                label: d[j].Months,
                parent: "year/" + d[j].Months.substring(0, 4)
            })
        }
    }
    //years
    if (date == "years") {
        for (j = 0; j < d.length; j++) {
            data.push({
                uri: `year/${d[j].Year}`,
                label: d[j].Year,
                parent: ""
            })
        }
}

    csvWriter.writeRecords(data)
        .then(() => {
            console.log('Complete file at ' + path + ' (cmd + click)');
        });
    return output
}).catch(function (error) {
    console.log(error);
});