/////////////////////////////////////////////////////////
// 为好友发送心
// return: {status = 0:成功发送 1:失败}
//

handlers.GetLeaderboardEx = function(args) {

    var level_id = args.level_id;
    var start_position = args.start_position;
    var max_result_count = args.max_result_count;

    var score_key = level_id + "_user_stat_score";
    var stage_info_key = level_id + "_user_stat_info_list";

    var result = server.GetLeaderboard({
        StatisticName: score_key,
        StartPosition: start_position,
        MaxResultsCount: max_result_count
    });

    var lb = result.Leaderboard;

    for (var i = 0; i < lb.length; i++) {
        var user_item = lb[i];

        try {
            var stage_info_result = server.GetUserData({
                PlayFabId: user_item.PlayFabId,
                Keys: [stage_info_key]
            });

            var stage_info_data_value = stage_info_result.Data[stage_info_key].Value;

            var stage_info = JSON.parse(stage_info_data_value);

            user_item["LineLevel"] = stage_info[0].LineLevel;
        } catch (err) {
            log.error("get stage info error: " + user_item.PlayFabId);
            user_item["LineLevel"] = 0;
        }
    }

    return lb;
}