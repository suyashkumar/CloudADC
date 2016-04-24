angular.module('adcApp', ['ngMaterial', 'ngMessages'])

.controller('ADCCtrl',  ['$scope','$http', function($scope, $http) {
	console.log('start'); 
	$scope.plotHide=true;	
	$scope.numSamples=300;
	
	/*
	 * Called when acquire button is pressed 
	 */
	$scope.acquire = function(){ 
		$scope.plotHide=false;
		$scope.updateViewAll(); 

	};
	$scope.updateViewAll = function(){
		$http.get('/api/data').success(
			function(data) {
				console.log(data); 
				$scope.data=data;
				$scope.updateSamples(data); 

			}); 
	}
	$scope.updateSamples = function(data){
		var plotData=[];
		for (i=0;i<$scope.numSamples;i++){ // ignore last point
			plotData.push({"x":i, "y":parseInt(data[i])});
		}	

		updateGraph([{"key":"AcqData", "values":plotData}]);
			
	}

	$scope.saveSVG = function(){ 



	}
	$scope.saveCSV = function(data){ 
		csvStr = "";
		csvStr = writeHeader(csvStr, data);
		csvStr = writeData(csvStr, data);
		// Save CSV String using blob
		var blob = new Blob([csvStr], {type:"text/csv;charset=utf-8"});
		saveAs(blob, "data.csv");

	}


}]);
function getLongestLength(data){
	var longLen = 0;
	for (var pID in data){
			// keep track of longest set of data
			if (data[pID].length >longLen){
				longLen =data[pID].length
			}
		} 
	return longLen;

}
function writeHeader(csvStr, data){ 

	csvStr=csvStr+"Sample Num, Magnitude\n"; // New line for actual data start
	return csvStr;

}
function writeData(csvStr, data){

	for (i=0;i<data.length;i++){ // Each row in csv
		csvStr = csvStr + i.toString() +","+ data[i].toString() + "\n";
	}
	return csvStr;
		
}
function getInnerWidth(elem) {
    return parseFloat(window.getComputedStyle(document.getElementById(elem)).width);
}

var updateGraph = function(data){
  var offset = 100;
	nv.addGraph(function() {
  var chart = nv.models.lineChart()
  .width(getInnerWidth('graph')-offset)
  .height(300);
	chart.useInteractiveGuideline(true)
  chart.xAxis     //Chart x-axis settings 
      .axisLabel('Sample Num'); 

  chart.yAxis     //Chart y-axis settings
      .axisLabel('Magnitude')
      .tickFormat(d3.format('.02f'));

  chart.y2Axis     //Chart y-axis settings
      .axisLabel('Temp (C)')
      .tickFormat(d3.format('.02f')) 




  /* Done setting the chart up? Time to render it!*/
 

  d3.select('#graph svg')    //Select the <svg> element you want to render the chart in.   
      .datum(data)         //Populate the <svg> element with chart data...  
	  .style({ 'width': getInnerWidth('graph'), 'height': 500, 'margin-left':50 }) 
      .call(chart);          //Finally, render the chart!
//d3.select('#graph svg').datum(data).transition().duration(500).call(chart)
	
  //Update the chart when window resizes.
  nv.utils.windowResize(function(){ 
	chart.width(getInnerWidth('graph')-offset);
	d3.select('#graph svg')    //Select the <svg> element you want to render the chart in.   
      .datum(data)         //Populate the <svg> element with chart data...  
	  .style({ 'width': getInnerWidth('graph'), 'height': 500, 'margin-left':50 }) 
  	chart.update(); 
	});

  return chart;
});
}
