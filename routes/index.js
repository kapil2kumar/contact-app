const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'ff754e86',
  apiSecret: 'oE9KxRAbzOv0RN6R'
});
const YOUR_VIRTUAL_NUMBER = '4567890123';

exports.route_apis = function (app) {
    
    var contactList = [
    	{
    		firstName: 'Kapil',
    		lastName: 'Kumar (V)',
    		mobileEx:'+91',
    		mobileNumber:'7503630654'
    	},
    	{
    		firstName: 'Kapil',
    		lastName: 'Kumar (J)',
    		mobileEx:'+91',
    		mobileNumber:'8178060671'
    	},
    	{
    		firstName: 'Kisan',
    		lastName: 'Network',
    		mobileEx:'+91',
    		mobileNumber:'9971792703'
    	}
    ];

    var listOfMessageSent=[];


    app.get('/contact-list', function(req, res, next) {
    	if (contactList && contactList.length) {
    		res.status(200).json({status:true,message: 'Success',data:contactList});	
    	} else {
    		res.status(200).json({status:false,message: 'No Contact'});	
    	}
    });

    app.post('/send-opt-message', function(req, res, next) {
    	nexmo.message.sendSms(
		  	YOUR_VIRTUAL_NUMBER, 
		  	(req.body.mobileEx+req.body.mobileNumber), 
		  	req.body.message,
		    (err, responseData) => {
		      if (err) {
		        console.log('error',err);
		        res.status(200).json({status:false,message: 'Message Sent Fail!'});	
		      } else {
		        console.log('success',responseData);
		        res.status(200).json({status:true,message: 'Message Sent Successfully!'});	
		        req.body.createOn = parseInt(Math.floor(Date.now()) / 1000); 
		        listOfMessageSent.push(req.body);
		      }
		    }
		 );
    });

    app.get('/message-list', function(req, res, next) {
    	if (listOfMessageSent && listOfMessageSent.length) {
    		res.status(200).json({status:true,message: 'Success',data:listOfMessageSent});	
    	} else {
    		res.status(200).json({status:false,message: 'No Contact'});	
    	}
    });

};

