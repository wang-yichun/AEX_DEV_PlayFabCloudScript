///////////////////////////////////////////////////////////////////////////////////////////////////////
//
// PogoRockGame - AEX 
// CloudScript
//
// Managed via GitHub
// https://github.com/wang-yichun/AEX_PlayFabCloudScript.git
///////////////////////////////////////////////////////////////////////////////////////////////////////

handlers.LikeRecord = function (args) {

    var play_fab_id = args.PlayFabId;
    var stage_id = args.StageId;

    var like_key = stage_id + "_user_rec_like"; 

    var user_data = server.GetUserData({
        PlayFabId: play_fab_id,
        Keys: [like_key]
    });

    var like_value_data = user_data.Data[like_key];
    var like_value = undefined;

    // 处理没有原始like的情况
    if (like_value_data == undefined) {
        like_value = 0;
    } else {
        like_value = like_value_data.Value;
    }

    like_value++;

    var data = {};
    data[like_key] = like_value;

    server.UpdateUserData({
        PlayFabId: play_fab_id,
        Data: data,
        Permission: "public"
    });
    
    log.info("set " + like_key + " = " + like_value);
}

// If a user login for the first time, many operations will be done at the server.
// Especially to initialize user data.
// 初始化一个用户的云端数据,用户在第一次登陆后需要调用(或:发现用户只读数据的need_init==1时调用)
handlers.PrepareForNewUser = function (args) {
    
    // server.GrantItemsToUser({
    //     CatalogVersion : "Alpha",
    //     PlayFabId: currentPlayerId,
    //     Annotation: "Test",
    //     ItemIds: ["GA", "GB", "GC"]
    // });
    
    server.UpdateUserData({
        PlayFabId: currentPlayerId,
        Data: {
            LineLevel: 1,
            TotalExp: 0,
            TotalStar: 0,
            CurrentStageID: "level_001"
        },
        Permission: "Public"
    });
    
    server.UpdateUserData({
        PlayFabId: currentPlayerId,
        Data: {
            GA1: 0,
            GA2: 0,
            GA3: 0,
            GAPower: 0,
            GB1: 0,
            GB2: 0,
            GB3: 0,
            GBPower: 0,
            GC1: 0,
            GC2: 0,
            GC3: 0,
            GCPower: 0,
            GX: 0,
            StageInfoDataVersion: 0
        },
        Permission: "Private"
    });
    
    server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            need_init: 0
        }
    });
}