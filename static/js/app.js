//
/**
Use the D3 library to read in samples.json from the URL https://2u-data-curriculu
m-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-
Homework/samples.json.

Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found
in that individual.

Use sample_values as the values for the bar chart.

Use otu_ids as the labels for the bar chart.

Use otu_labels as the hovertext for the chart.

bar Chart

Create a bubble chart that displays each sample.

Use otu_ids for the x values.

Use sample_values for the y values.

Use sample_values for the marker size.

Use otu_ids for the marker colors.

Use otu_labels for the text values.
Bubble Chart

Display the sample metadata, i.e., an individual's demographic information.

Display each key-value pair from the metadata JSON object somewhere on the page. 





 */

const URL = " https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let dataF

d3.json(URL).then((data) => {
    dataF = data
    data.names.forEach(id => document.getElementById("selDataset").appendChild(new Option(`${id}`, Number(id))))

    const { sample_values, otu_ids, otu_labels} = data.samples[0]

    Plotly.newPlot("plot", [{
        type: "bar",
        y: sample_values.slice(0, 10),
        x: otu_ids.slice(0, 10),
        text: sample_values.slice(0, 10),
        hovertext: otu_labels.slice(0, 10)
    }])
})




const optionChanged = (id) => {
    const sampleIndex = dataF.names.findIndex((element) => element == id)
    let { sample_values, otu_labels, otu_ids } = dataF.samples[sampleIndex]

    Plotly.restyle("plot", "x", [otu_ids.slice(0,10)])
    Plotly.restyle("plot", "y", [sample_values.slice(0,10)])
    Plotly.restyle("plot", "hovertext", [otu_labels.slice(0,10)])
}