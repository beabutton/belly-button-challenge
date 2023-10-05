
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

function init() {
    let dropdown = d3.select('#selDataset');
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        let names = data.names;
        names.forEach((name) => {dropdown.append('option').text(name).property('value', name);
        });

        let name = names[0];

        demo(name);
        bar(name);
        bubble(name);
        // gauge(name);
    });
}

function demo(selectval) {
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        let metadata = data.metadata;
        let filtdata = metadata.filter((meta) => meta.id == selectval);
        let obj = filtdata[0]

        d3.select('#sample-metadata').html('');

        let entries = Object.entries(obj);
        entries.forEach(([key, value]) => {
            d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`);
        });
        console.log(entries)
    });
}

function bar(selectval) {
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        let samples = data.samples;
        let filtdata = samples.filter((sample) => sample.id === selectval);
        let obj = filtdata[0];
        let trace = [{
            x: obj.sample_values.slice(0, 10).reverse(),
            y: obj.otu_ids.slice(0, 10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0, 10).reverse(),
            type: 'bar', 
            orientation: 'h'
        }];
        Plotly.newPlot('bar', trace);
    });
}

function bubble(selectval) {
    d3.json(url).then((data) => {
        let samples = data.samples;
        let filtdata = samples.filter((sample) => sample.id === selectval);
        let obj = filtdata[0];
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: 'markers',
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Earth"
            }
        }];
        let layout = {
            xaxis: {title: 'OTU ID'}
        };
        Plotly.newPlot('bubble', trace, layout)
    });
}

function optionChanged(selectval) {
    demo(selectval);
    bar(selectval);
    bubble(selectval)
}

init();