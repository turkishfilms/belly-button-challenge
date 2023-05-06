
const URL = " https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let dataF

d3.json(URL).then((data) => {
    dataF = data
    data.names.forEach(id => document.getElementById("selDataset").appendChild(new Option(`${id}`, Number(id))))

    const { sample_values, otu_ids, otu_labels } = data.samples[0]
    document.getElementById("sample-metadata").innerHTML= JSON.stringify(data.metadata[0]).replaceAll(',','</br>')

    Plotly.newPlot("bar", [{
        type: "bar",
        orientation:"h",
        marker:{line:{width:20}},
        y: sample_values.slice(0, 10),
        x: otu_ids.slice(0, 10),
        text: sample_values.slice(0, 10),
        hovertext: otu_labels.slice(0, 10)
    }])

    Plotly.newPlot("bubble", [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids
        }
    }])
})

const optionChanged = (id) => {
    const sampleIndex = dataF.names.findIndex((element) => element == id)
    const { sample_values, otu_labels, otu_ids } = dataF.samples[sampleIndex]
    document.getElementById("sample-metadata").innerHTML= JSON.stringify(dataF.metadata[sampleIndex]).replaceAll(',', '</br>')

    Plotly.restyle("bar", "x", [otu_ids.slice(0, 10)])
    Plotly.restyle("bar", "y", [sample_values.slice(0, 10)])
    Plotly.restyle("bar", "hovertext", [otu_labels.slice(0, 10)])

    Plotly.update("bubble", { "x": [otu_ids] })
    Plotly.update("bubble", { "y": [sample_values] })
    Plotly.update("bubble", { "text": [otu_labels] })
    Plotly.update("bubble", { "marker.size": [sample_values] })
    Plotly.update("bubble", { "color": [otu_ids] })
}