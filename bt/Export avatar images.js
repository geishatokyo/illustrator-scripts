
// アバター素体の画像出力プラグイン
// アートボード毎、レイヤー毎に画像を出力する


var actDoc = app.activeDocument;
var saveFolder = actDoc.path;
var artboardRect = null;


//var filename = File.saveDialog("出力先を指定","*.png");
var exportDir = Folder.selectDialog("出力先を指定");

var exportedFiles = [];

function exportAllArtboards() {
	if(exportDir == null || exportDir.length == 0){
		return;
	}

	for( var i = 0; i < actDoc.artboards.length; i++){
		exportArtboard(actDoc.artboards[i]);
	}

	var text = "";
	for(var i in exportedFiles){
		text += exportedFiles[i] + "\n";
	}
	text += "are exported.";
	alert(text);
}


function exportArtboard( _artboard) {
	artboardRect = _artboard.artboardRect;
	//alert(artboard.name);
	for( var i = 0;i < actDoc.layers.length ;i ++){

		findPartAndExport(actDoc.layers[i])
	}

}

function findPartAndExport(layer) {
	for(var i = 0;i < layer.pageItems.length; i++){
		var item = layer.pageItems[i];
		if(item.typename == "GroupItem"){
			// 無名のパーツがぶら下がっている場合に出力
			var exports = extractAnonymousItems(item);
			if(exports.length > 0){
				exportItems(item.name,exports);
			}
			findPartAndExport(item);
		}else{
			if(isAvatarPartName(item)){
				exportItem(item);
			}

		}
	}
}

function isAvatarPartName(item ) {
	// avから始まるものだけをアバターパーツとして認識する
	return item.name.indexOf("av_") == 0;
}

function extractAnonymousItems(groupItem){

	var items = [];
	//無名のグループの場合は、出力しない
	if(groupItem.name == null || groupItem.name.length == 0){
		return items;
	}
	for(var i = 0; i < groupItem.pageItems.length;i++){
		var name = groupItem.pageItems[i].name;
		if(name == null || name.length == 0){
			items.push(groupItem.pageItems[i]);
		}
	}

	return items;
}

function isExportTargetGroupItem(groupItem) {
	if(!isAvatarPartName(groupItem)) return false;
	var allChildrenNotHaveName = true;
	for(var i = 0; i < groupItem.pageItems.length;i++){
		var name = groupItem.pageItems[i].name;
		if(name != null && name.length > 0){
			allChildrenNotHaveName = false;
			break;
		}
	}
	return allChildrenNotHaveName;

}

function exportItem(item) {
	exportedFiles.push(item.name);

	var filename = exportDir + "/" + item.name + ".png";

	var d = createNewDocument([item]);
	saveAsPNG(d,filename,100);
	d.close(SaveOptions.DONOTSAVECHANGES);
}

function exportItems(name,items) {
	exportedFiles.push(name);

	var filename = exportDir + "/" + name + ".png";

	var d = createNewDocument(items);
	saveAsPNG(d,filename,100);
	d.close(SaveOptions.DONOTSAVECHANGES);
}

function saveAsPNG( doc , filename, scale){
	var exportOptions = new ExportOptionsPNG24();
	var type = ExportType.PNG24;
	var fileSpec = new File(filename);
	exportOptions.antiAliasing = true;
	exportOptions.transparency = true;
	exportOptions.matte = true;
	exportOptions.saveAsHTML = false;
	exportOptions.verticalScale = scale;
	exportOptions.horizontalScale = scale;
	exportOptions.artBoardClipping = true;

	doc.exportFile(fileSpec,type,exportOptions);

}
function createNewDocument(items ){
	var newDoc = app.documents.add(DocumentColorSpace.RGB);
	for(var i = 0; i < items.length;i++){
		var item = items[i];
		if(item.duplicate){
		    var copy = item.duplicate();
		    copy.moveToEnd(newDoc);
		    copy.position = item.position;
	    }
	}
    newDoc.artboards[0].artboardRect = artboardRect;

	return newDoc;

}



exportAllArtboards();