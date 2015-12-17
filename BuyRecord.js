// 购买
// return: {status = 0:正确购买 1:没有发现录像 2:已经购买}
handlers.BuyRecord = function (args) {

    var play_fab_id = args.PlayFabId;
    var stage_id = args.StageId;
    var currency_key = args.CurrencyKey;
    var currency_amount = args.CurrencyAmount;

    var s3_key = stage_id + "_user_rec_data_s3_key";

    var user_data = server.GetUserData({
        PlayFabId: play_fab_id,
        Keys: [s3_key]
    });

    var s3_value_data = user_data.Data[s3_key];
    var s3_value = null;

    // 处理没有s3的key的情况
    if (s3_value_data == null) {
        return {status: 1};
    } else {
        var s3_value = s3_value_data.Value;
    }

    var internel_buy_rec_key = "buy_rec#" + s3_value;
    var user_data_2 = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [internel_buy_rec_key]
    });

    var already_buy_data = user_data_2.Data[internel_buy_rec_key];
    if (already_buy_data != null && already_buy_data.Value == 1) {
        return {status: 2};
    }

    var suvc_result = server.SubtractUserVirtualCurrency({
        PlayFabId: currentPlayerId,
        VirtualCurrency: currency_key,
        Amount: currency_amount
    });

    var data = {};
    data[internel_buy_rec_key] = 1;
    server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });

    log.info("buy record: " + s3_value);

    return {status: 0};
}