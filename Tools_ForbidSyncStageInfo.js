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
	log.info("version_value: " + version_value);

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
		log.info("misctable_data: " + JSON.stringify(misctable_data));
		var misctable_value = misctable_data.Value;
		min_version_value = misctable_value["PFStatisticsMinimumVersion"]["v0"];
	}
	log.info("min_version_value: " + min_version_value);

	return {status: 0};value
}