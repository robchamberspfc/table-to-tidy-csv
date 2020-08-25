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

        // test = d[5]
        // console.log(Object.keys(test));
        // console.log(test.Months);


        let output = []
        // console.log(d)

        for (i=1; i <config.input.length; i++) {
            // console.log(config.input[i])
            for (j=0; j<d.length; j++) {
            // console.log(d[j][config.input[i]])
            heading1 = config.headers[0].id
            heading2 = config.headers[1].id
            heading3 = config.headers[2].id
            if(d[j][config.input[i]] !=0 ){
                // console.log(d[j][config.input[i]])
                text = {[heading1]:d[j].Months,[heading2]: d[j][config.input[i]],[heading3]: d.columns[i]}
                output.push(text)
            }
            
            // console.log(text)
            // console.log(output)

        }
    }




        // for (i=0; i<d.length; i++) {
        //     text = {"notation":d[i].Months,"latest": d[i]["Price ppl"]}
        //     // console.log(output)
        //     output.push(text)
        // }
        // console.log(output)
        data= output
        // console.log(data)
        // data.push({
        //     notation: d[0].Months,
        //     latest: d[0]["Price ppl"]
        // })
        csvWriter.writeRecords(data)
            .then(() => {
                console.log('...Done');
            });
        return data
    }).catch(function (error) {
        console.log(error);
    });

}



// fetch(url)
//     .then((response) => response.json())
//     .then(json => {
//         for (i = 0; i < json.items.length; i++) {
//             if (json.items[i].unitName == "---") {
//                 if (json.items[i].latestReading != null) {
//                     latestReading = json.items[i].latestReading.dateTime
//                 } else {
//                     latestReading = "No update in last month"
//                 }
//                 data.push({
//                     notation: json.items[i].notation,
//                     latest: latestReading
//                 })
//             }
//         }
//         csvWriter.writeRecords(data)
//             .then(() => {
//                 console.log('...Done');
//             });
//         return data
//     }).catch(function (error) {
//         console.log(error);
//     });