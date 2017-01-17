////////////////////////////////////////////////
// 收集用户登录信息

handlers.GatherUserLoginInfo = function (args, context) {
    
    // The event that triggered the action 
    // (https://api.playfab.com/playstream/docs/PlayStreamEventModels)
    var psEvent = context.playStreamEvent;
    var location = psEvent.Location;

    var locationJson = JSON.stringify(location);

    server.UpdateUserData({
		PlayFabId: currentPlayerId,
		Data: {
			location_json: locationJson
		},
		Permission: "Public"
	});

    // The profile data of the player associated with the event
    // (https://api.playfab.com/playstream/docs/PlayStreamProfileModels)
    // var profile = context.playerProfile;
    
    // Post data about the event to an external API
    // var content = JSON.stringify({user: profile.PlayerId, event: psEvent.EventName});
    // var response = http.request('https://httpbin.org/status/200', 'post', content, 'application/json', null, true);
    
    return { result: 0 };
}