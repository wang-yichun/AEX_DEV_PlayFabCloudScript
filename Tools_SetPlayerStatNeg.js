////////////////////////////////////////////////
// 将某个用户成绩请-1, 就是清掉

handlers.SetPlayerStatNeg = function (args) {

	var statistic_name = args.statistic_name;
	var player_id = args.player_id;

	var updateResult = server.UpdatePlayerStatistics({
		PlayFabId : currentPlayerId,
		Statistics: [
    		{
    			StatisticName: statistic_name,
    			Value: -1
    		}
		]
	});

	return {status: 0};
}