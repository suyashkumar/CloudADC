var exec = require('child_process').execFile;
module.exports = {
	
	runADC: function(callback){
		var cmd = './ADCCollector';
		var data2=[];
		exec(cmd, ["2","c.t"], function(error,stdout,stderr) {
			var data = stdout.toString().split('\n').map(Number); 
			return callback(data);
			
		});	


	}


}
