


function saveAsPNG( doc , filename){
	var exportOptions = new ExportOptionsPNG24();
	var type = ExportType.PNG24;
	var fileSpec = new File(filename);
	exportOptions.antiAliasing = false;
	exportOptions.transparency = false;
	exportOptions.saveAsHTML = true;

	doc.exportFile(fileSpec,type,exportOptions)

}

function createNewDocument(items ){
	var newDoc = app.documents.add();
	for(var i = 0; i < items.length;i++){
		var item = items[i];
		if(item.duplicate){
		    var copy = item.duplicate();
		    copy.moveToEnd(newDoc);
	    }
	}
	return newDoc;

}


function getDefaultName(items){
	for(var i = 0;i < items.length ; i++){
		var n = items[i].name;
		if(n != null && n.length > 0){
			return n;
		}
	}
	return null;
}

function main(){

	var doc = app.activeDocument;
	if(doc == null){
		alert("ドキュメントを開いてください。")
		return ;
	}

	var sels = doc.selection;

	if(sels.length == 0){
		alert("オブジェクトを選択してください。");
	}else{
		var filename = File.saveDialog("保存ファイル","*.png");
		if(filename){
			alert(filename);
			var doc = createNewDocument(sels);
			saveAsPNG(doc,filename);
			doc.close(SaveOptions.DONOTSAVECHANGES);
		}
	}

}

main();


