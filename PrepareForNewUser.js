//////////////////////////////////////////////////////
// 初始化一个用户的云端数据,用户在第一次登陆后需要调用(或:发现用户只读数据的need_init==1时调用)
//

handlers.PrepareForNewUser = function (args) {
	
	// server.GrantItemsToUser({
	//	 CatalogVersion : "Alpha",
	//	 PlayFabId: currentPlayerId,
	//	 Annotation: "Test",
	//	 ItemIds: ["GA", "GB", "GC"]
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
			GA3: 30,
			GAPower: 0,
			GACreatingSize: "0",
			GB1: 0,
			GB2: 0,
			GB3: 30,
			GBPower: 0,
			GBCreatingSize: "0",
			GC1: 0,
			GC2: 0,
			GC3: 30,
			GCPower: 0,
			GCCreatingSize: "0",
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