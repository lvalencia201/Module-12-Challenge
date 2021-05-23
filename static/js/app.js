function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    console.log(sampleNames);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}
// Initialize the dashboard
init();
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}
// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
// 1. Create the buildCharts function.
function buildCharts(sampleid) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sample_values = samples.filter((arg) => {
      return arg.id == sampleid
    })[0].sample_values
    var otu_ids = samples.filter((arg) => {
      return arg.id == sampleid
    })[0].otu_ids
    var otu_labels = samples.filter((arg) => {
      return arg.id == sampleid
    })[0].otu_labels

    console.log(sample_values);
    console.log(otu_ids);
    console.log(otu_labels);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
  
    var yticks = otu_ids.slice(0,10).reverse().map(id =>"id "+ id.toString())
    // 8. Create the trace for the bar chart. 
    var barData = sample_values.slice(0,10).reverse();
    console.log (yticks);
    console.log (barData);
    var trace=[{
    type:"bar",
    x:barData,y:yticks,
    orientation:"h"
    }]
    // 9. Create the layout for the bar chart. 
    var barLayout = {
    yaxis:{type:"categorical"}  
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar",trace,barLayout);


var bubbleData=[{
  x:sample_values.slice(0,10).reverse(),
  y:otu_ids.slice(0,10).reverse(),
  mode:"markers",
marker:{

    size:sample_values.slice(0,10).reverse(),
    color:otu_ids.slice(0,10).reverse(),
    colorscale:"Rainbow"
}

}];var bubbleLayout = {
  title: '<b> Bacteria Cultures per Sample </b>',
  showlegend: false,
  xaxis: { title: 'OTU ID' }
};
Plotly.newPlot("bubble",bubbleData,bubbleLayout)



  })

}


















