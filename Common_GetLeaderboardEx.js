/////////////////////////////////////////////////////////
// 为好友发送心
// return: {status = 0:成功发送 1:失败}
//

handlers.GetLeaderboardEx = function(args) {
	
	var level_id = "level_001";
	var score_key = level_id + "_user_stat_score";
	var stage_info_key = level_id + "_user_stat_info_list";

	var result = server.GetLeaderboard({
		StatisticName: score_key,
		StartPosition: 1,
		MaxResultsCount: 10
	});

	var lb = result.Leaderboard;

	// log.info(lb[0]);

	for (var i = 0; i < lb.length; i++) {
		var user_item = lb[i];

		var stage_info_result = server.GetUserData({
			PlayFabId: user_item.PlayFabId,
            Keys: [stage_info_key]
		});
		
		var stage_info_data_value = stage_info_result.Data[stage_info_key].Value;

        var stage_info = JSON.parse(stage_info_data_value);

        user_item["LineLevel"] = stage_info[0].LineLevel;
	}

	log.info(lb);
}