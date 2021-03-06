/////////////////////////////////////////////////////////
// 批量获取线长
// [{"PlayFabId":"AA25328A8D0031FA","DisplayName":"painache","StatValue":1355500,"Position":0,"LineLevel":1},
//  {"PlayFabId":"9241B8F15709F6C6","DisplayName":"feng_bcdeaa42","StatValue":1355100,"Position":1,"LineLevel":1}]

handlers.GetLineLevelByIDs = function(args) {

    var level_id = args.level_id;
    var id_list = args.id_list;

    // var score_key = level_id + "_user_stat_score";
    var stage_info_key = level_id + "_user_stat_info_list";
    var snail_skin_key = "SnailSkin";

    var response_list = [];

    for (var i = 0; i < id_list.length; i++) {
        var playfab_id = id_list[i];
        var result = server.GetUserData({
            PlayFabId: playfab_id,
            Keys: [
                stage_info_key, snail_skin_key
            ]
        });

        var stage_info_json = result.Data[stage_info_key].Value;
        var stage_info = JSON.parse(stage_info_json);
        var line_level = stage_info[0].LineLevel;
        var current_star = stage_info[0].CurrentStar;
        var snail_skin = 0;
        if (result.Data[snail_skin_key] != null) {
            snail_skin = result.Data[snail_skin_key].Value;
        }

        var response_item = {
            PlayFabId: playfab_id,
            LineLevel: line_level,
            CurrentStar: current_star,
            SnailSkin: snail_skin
        }

        response_list.push(response_item);
    }

    return response_list;
}