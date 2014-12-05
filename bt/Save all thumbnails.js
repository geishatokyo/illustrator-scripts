/*
  アバター服用のサムネイルを保存するスクリプト。
  レイヤー直下の子PageItemをひとまとまりとして出力する。
*/

var scriptVersion = "0.2.0";
var actDoc = app.activeDocument;
var saveFolder = actDoc.path; // アクティブなドキュメントの保存フォルダ
//var actDocName = actDoc.name.substring(0,actDoc.name.indexOf(".")); // アクティブなドキュメントの名前
var imageIndex = 1;
var artboardRect = null;


function saveAsPNG( doc , filename, scale){
	var exportOptions = new ExportOptionsPNG24();
	var type = ExportType.PNG24;
	var fileSpec = new File(filename);
	exportOptions.antiAliasing = true;
	exportOptions.transparency = true;
	exportOptions.matte = true;
	exportOptions.artBoardClipping = true;
	//exportOptions.clip = true;
	exportOptions.saveAsHTML = false;
	exportOptions.verticalScale = scale;
	exportOptions.horizontalScale = scale;
	doc.exportFile(fileSpec,type,exportOptions);
}

function createNewDocument(item,width,height){
	if(height < 0) height = -height;
	var newDoc = app.documents.add(DocumentColorSpace.RGB);
	if(item.duplicate){
		var copy = item.duplicate();
		copy.moveToEnd(newDoc);
		copy.position = item.position;//[0,height];
	}
	newDoc.artboards[0].artboardRect = artboardRect;
	return newDoc;
}


function saveImages(name, item){
	if(name == null || name.length == 0){
		name = "image" + imageIndex;
		imageIndex += 1;
	}
	var width = item.width;
	var height = item.height;

	var doc = createNewDocument(item,width,height);

	var path = new File(saveFolder + "/_" + name + ".png");
	saveAsPNG(doc,path,100);

	doc.close(SaveOptions.DONOTSAVECHANGES);
	return [path.name];
}

function exportLayer( layer){

	var layers = layer.layers;
	for (var i = 0; i < layers.length;i++){
		var l = layers[i];
		if(l.visible){
			exportLayer(l);
		}
	}

	for(var i = 0; i < layer.pageItems.length;i++){
		var pi = layer.pageItems[i];
		if(!pi.hidden){
			saveImages(pi.name,pi);
		}
	}
}


function exportImages(){

	var layers = app.activeDocument.layers;
	for (var i = 0; i < layers.length;i++){
		var l = layers[i];
		if(l.visible){
			exportLayer(l);
		}
	}

}

var artboard = app.activeDocument.artboards[0];
artboardRect = artboard.artboardRect;
exportImages();


