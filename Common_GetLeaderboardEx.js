/////////////////////////////////////////////////////////
// 为好友发送心
// return: {status = 0:成功发送 1:失败}
//

handles.GetLeaderboardEx = function(args) {
	
	var result = server.GetLeaderboard({
		StatisticName: "level_001_user_stat_score",
		StartPosition: 1,
		MaxResultsCount: 10
	});

	info.log(result.data.Leaderboard);
}