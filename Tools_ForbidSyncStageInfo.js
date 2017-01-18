////////////////////////////////////////////////
// 阻止用户上传成绩到排行榜, 针对测试版本的老用户

handlers.ForbidSyncStageInfo = function (args, context) {
	// 获取用户版本:
	var version_key = "version";
	var user_data = server.GetUserData({
		PlayFabId: currentPlayerId,
		Keys: [version_key]
	});
	var version_data = user_data.Data[version_key];
	var version_value; 
	if (version_data == null) {
		return {status: 1};
	} else {
		version_value = version_data.Value;
	}
	var version_value_splited = version_value.split(".");
	var version_value_int = parseInt(parseInt version_value_splited[0]) * 1000000;
	if (version_value_splited.length > 1){
		version_value_int = version_value_int + parseInt(version_value_splited[1] * 1000);
	}
	if (version_value_splited.length > 2){
		version_value_int = version_value_int + parseInt(version_value_splited[2]);
	}

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
	log.info("min_version_value: " + min_version_value);

	return {status: 0};value
}