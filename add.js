$(document).ready(function(){
	var containerMap = {};
	var init = Kinvey.initialize({
		appKey	: 'kid_SJEyn--we',
		appSecret: 'cac42e4156ce423a9cd9f083ac6f6dd1'
	}).then(function(user){

		var dataStore = Kinvey.DataStore.collection('containers', Kinvey.DataStoreType.Network);
		var table = document.getElementById("table");
		$("button").on('click', function(){
			var updateContainerStatus = dataStore.save({
				"company": $("#Company").val(),
				"contents": $("#Contents").val(),
				"number": $("#Number").val(),
				"status": "arrived",
				"quantity": $("#Quantity").val()
			}).then(function onSuccess(entity){
			}, function onError(error){

			});
			$("input").val("");

		});
	}).catch(function(error){

	});
});