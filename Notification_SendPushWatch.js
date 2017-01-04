handlers.SendPushWatch = function (args)
{
	var message = args.Msg == undefined || args.Msg == null ? "" : args.Msg;
	var subject = args.Subject == undefined || args.Subject == null ? "" : args.Subject;

	var playfab_ids = args.PlayFabIds;
	for (var i = 0; i < playfab_ids.length; i++){
		var playfab_id = playfab_ids[i];

		var result = server.GetUserData({
	        PlayFabId: playfab_id,
	        Keys: ["language"]
	    });
	    
	    var language = result.Data["language"];
	    var msg_text = "Your replay has just been watched!";

	    if (language == null || language.Value == ""){
	        log.info("language is null");
	    } else {
	    	log.info("language is " + language.Value);
	        if (language.Value == "German") {
	            msg_text = "Ihr Video wurde gerade gesehen!";
	        } else if (language.Value == "Chinese") {
	            msg_text = "有人看了你的录像";
	        } else if (language.Value =="Chinese (Hong Kong)"){
	            msg_text = "有人看了你的錄像.";
	        }
	    }

		var spn_req = {};
		spn_req.Recipient = playfab_id;
		spn_req.Message = msg_text;
		spn_req.Subject = subject;

		log.info("SendPushWatch params: " + JSON.stringify(spn_req));
		try {
			server.SendPushNotification(spn_req);
		} catch (err) {
			log.info("ignore err: " + JSON.stringify(err));
		}
	}
}