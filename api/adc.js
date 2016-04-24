var adcHandle = require('../adc-runner.js');
module.exports = {

	getData: function(req,res){
		adcHandle.runADC(function(data){
			res.json(data);
		});	
	

	}

}
