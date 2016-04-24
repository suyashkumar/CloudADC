module.exports = function(app) {
        app.get('/hello', function(req,res){
                res.send('hello');
        });
	app.get('/api/data', require('../api/adc.js').getData);

}
