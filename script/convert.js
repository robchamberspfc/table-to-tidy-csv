const d3 = require('d3-fetch');
if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const args = process.argv.slice(2)
const configFile = args[0]
const filePath = args[1]
const csvName = args[2]

//get the config file specified on script run
fetch(filePath + configFile + ".json").then((response) => response.json())
    .then(json => {
        afterConfigLoaded(json)
    }).catch(function (error) {
        console.log(error);
    });

//write the output csv headers
function afterConfigLoaded(config) {
    if (configFile == "example") {
        path = 'example.csv'
    } else {
        path = 'output.csv'
    }
    const csvWriter = createCsvWriter({
        path: path,
        header: config.headers
    });

    //get the input csv
    d3.csv(filePath + csvName + ".csv").then(function (d) {
        let output = []
        //set up loop for all the input data fields
        for (i = 1; i < config.input.length; i++) {
            //loop through the input data
            for (j = 0; j < d.length; j++) {
                //get the output headers from the config
                heading1 = config.headers[0].id
                heading2 = config.headers[1].id
                heading3 = config.headers[2].id
                //create the output data, ignoring any fields where there is null
                if (d[j][config.input[i]] != 0) {
                    text = {
                        [heading1]: d[j][config.input[0]],
                        [heading2]: d[j][config.input[i]],
                        [heading3]: d.columns[i]
                    }
                    output.push(text)
                }
            }
        }

        //add in and additional values on all rows
        if (config.additional != 0) {
            for (k = 0; k < output.length; k++) {
                for (l = 0; l < config.additional.length; l++) {
                    Object.assign(output[k], {
                        [config.additional[l].id]: config.additional[l].value
                    });
                }
            }
        }

        //add in any additional values on dependent rows
        if (config.dependent != 0) {
            for (k = 0; k < output.length; k++) {
                for (l = 0; l < config.dependent.length; l++) {
                    if (output[k][config.dependent[l].column] === config.dependent[l].ifValue) {
                        Object.assign(output[k], {
                            [config.dependent[l].id]: config.dependent[l].thenValue
                        });
                    }
                }
            }
        }

        //add in any additional values on if/else rows
        if (config.ifElse != 0) {
            for (k = 0; k < output.length; k++) {
                for (l = 0; l < config.ifElse.length; l++) {
                    if (output[k][config.ifElse[l].column] === config.ifElse[l].ifValue[0]) {
                        Object.assign(output[k], {
                            [config.ifElse[l].id]: config.ifElse[l].thenValue
                        });
                    } else if (output[k][config.ifElse[l].column] === config.ifElse[l].ifValue[1]) {
                        Object.assign(output[k], {
                            [config.ifElse[l].id]: config.ifElse[l].thenValue
                        });
                    } else if (output[k][config.ifElse[l].column] === config.ifElse[l].ifValue[2]) {
                        Object.assign(output[k], {
                            [config.ifElse[l].id]: config.ifElse[l].thenValue
                        });
                    } else if (output[k][config.ifElse[l].column] === config.ifElse[l].ifValue[3]) {
                        Object.assign(output[k], {
                            [config.ifElse[l].id]: config.ifElse[l].thenValue
                        });
                    } else if (output[k][config.ifElse[l].column] === config.ifElse[l].ifValue[4]) {
                        Object.assign(output[k], {
                            [config.ifElse[l].id]: config.ifElse[l].thenValue
                        });
                    } else {
                        Object.assign(output[k], {
                            [config.ifElse[l].id]: config.ifElse[l].else
                        });
                    }
                }
            }
        }


        //write all the column values to the output file
        csvWriter.writeRecords(output)
            .then(() => {
                console.log('Complete file at ' + path + ' (cmd + click)');
            });
        return output
    }).catch(function (error) {
        console.log(error);
    });
}