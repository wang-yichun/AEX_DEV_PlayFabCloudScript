////////////////////////////////////////////////
// 阻止用户上传成绩到排行榜, 针对测试版本的老用户

var VersionToInteger = function(version_value){
	var version_value_splited = version_value.split(".");
	var version_value_int = parseInt(version_value_splited[0]) * 1000000;
	if (version_value_splited.length > 1){
		version_value_int = version_value_int + parseInt(version_value_splited[1] * 1000);
	}
	if (version_value_splited.length > 2){
		version_value_int = version_value_int + parseInt(version_value_splited[2]);
	}
	return version_value_int;
}

handlers.ForbidSyncStageInfo = function (args, context) {

	var psEvent = context.playStreamEvent;
	var statistic_name = psEvent.StatisticName;

	var old_value = psEvent.StatisticValue;
	if (old_value == -1) {
		return {status: 4};
	}

	// 获取用户版本:
	var version_key = "version";
	var user_data = server.GetUserData({
		PlayFabId: currentPlayerId,
		Keys: [version_key]
	});
	var version_data = user_data.Data[version_key];
	var version_value; 
	if (version_data == null) {
		// 正式版发布时需要此处代码 ////////////
		// 用户没有 version 标记时, 积分将无法上传
		// var updateResult = server.UpdatePlayerStatistics({
  //   		PlayFabId : currentPlayerId,
  //   		Statistics: [
	 //    		{
	 //    			StatisticName: statistic_name,
	 //    			Value: -1
	 //    		}
  //   		]
  //   	});
    	// 到此为止 ////////////////////////////////
		return {status: 1};
	} else {
		version_value = version_data.Value;
	}
	var version_value_int = VersionToInteger(version_value);

	log.info("version_value_int: " + version_value_int);

	var title_misctable_key = "MiscTable";
	var title_data = server.GetTitleData({
		Keys: [title_misctable_key]
	});
	var misctable_data = title_data.Data[title_misctable_key];
	var misctable_value;
	var min_version_value;
	if (misctable_data == null){
		return {status: 2}
	} else {
		var misctable_value = JSON.parse(misctable_data);
		min_version_value = misctable_value["PFStatisticsMinimumVersion"]["v0"];
	}
	var min_version_int = VersionToInteger(min_version_value);
	log.info("min_version_int: " + min_version_int);

	if (version_value_int < min_version_int){

    	var updateResult = server.UpdatePlayerStatistics({
    		PlayFabId : currentPlayerId,
    		Statistics: [
	    		{
	    			StatisticName: statistic_name,
	    			Value: -1
	    		}
    		]
    	});

		return {status: 0, result: updateResult};
	}

	return {status: 3};
}