/////////////////////////////////////////////////////////
// 扩展获取排行榜
// [{"PlayFabId":"AA25328A8D0031FA","DisplayName":"painache","StatValue":1355500,"Position":0,"LineLevel":1},
//  {"PlayFabId":"9241B8F15709F6C6","DisplayName":"feng_bcdeaa42","StatValue":1355100,"Position":1,"LineLevel":1}]

handlers.GetLeaderboardAroundCurrentUserEx = function(args) {

    var level_id = args.level_id;
    var max_result_count = args.max_result_count;

    var score_key = level_id + "_user_stat_score";
    var stage_info_key = level_id + "_user_stat_info_list";
    var snail_skin_key = "SnailSkin";

    var result = server.GetLeaderboardAroundUser({
        StatisticName: score_key,
        PlayFabId: currentPlayerId,
        MaxResultsCount: max_result_count
    });

    var lb = result.Leaderboard;

    for (var i = 0; i < lb.length; i++) {
        var user_item = lb[i];

        try {
            var stage_info_result = server.GetUserData({
                PlayFabId: user_item.PlayFabId,
                Keys: [stage_info_key, snail_skin_key]
            });

            var stage_info_data_value = stage_info_result.Data[stage_info_key].Value;

            var stage_info = JSON.parse(stage_info_data_value);
            
            var snail_skin = 0;
            if (stage_info_result.Data[snail_skin_key] != null){
                snail_skin = stage_info_result.Data[snail_skin_key].Value;
            }

            user_item["LineLevel"] = stage_info[0].LineLevel;
            user_item["CurrentStar"] = stage_info[0].CurrentStar;
            user_item["SnailSkin"] = snail_skin;
            
        } catch (err) {
            log.error("get stage info error: " + user_item.PlayFabId);
            user_item["LineLevel"] = 0;
            user_item["CurrentStar"] = 0;
            user_item["SnailSkin"] = 0;
        }
    }

    return lb;
}