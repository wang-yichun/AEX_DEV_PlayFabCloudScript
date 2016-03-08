/////////////////////////////////////////////////////////
// 扩展获取排行榜
// [{"PlayFabId":"AA25328A8D0031FA","DisplayName":"painache","StatValue":1355500,"Position":0,"LineLevel":1},
//  {"PlayFabId":"9241B8F15709F6C6","DisplayName":"feng_bcdeaa42","StatValue":1355100,"Position":1,"LineLevel":1}]

handlers.GetStatisticsByIDs = function(args) {

    var level_id = args.level_id;
    var id_list = args.id_list;

    var score_key = level_id + "_user_stat_score";
    var stage_info_key = level_id + "_user_stat_info_list";

    var response_list = [];

    for (var i = 0; i < id_list.length; i++) {
        var playfab_id = id_list[i];
        var result = server.GetPlayerStatistics({
            PlayFabId: playfab_id,
            StatisticNames: [
                score_key
            ]
        });

        response_list.push(result);
    }

    return response_list;
}