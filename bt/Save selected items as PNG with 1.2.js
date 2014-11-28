


function saveAsPNG( doc , filename, scale){
	var exportOptions = new ExportOptionsPNG24();
	var type = ExportType.PNG24;
	var fileSpec = new File(filename);
	exportOptions.antiAliasing = true;
	exportOptions.transparency = true;
	exportOptions.matte = false;
	exportOptions.saveAsHTML = false;
	exportOptions.verticalScale = scale;
	exportOptions.horizontalScale = scale;

	doc.exportFile(fileSpec,type,exportOptions)

}

function createNewDocument(items ){
	var newDoc = app.documents.add(DocumentColorSpace.RGB);
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

function getDoubleSizeFilename(filename){
	var name = filename.name;
	if(name.indexOf(".") > 0){
		name = name.substring(0,name.indexOf("."));
	}
    var name2 = new File(filename.path + "/" + name + "_120.png");

	return name2;

}

var isRetina = false;

function main(){

	if(app == null){
		alert("ドキュメントを開いてください。")
		return ;
	}

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

			var filename2 = getDoubleSizeFilename(filename);

			var doc = createNewDocument(sels);
			saveAsPNG(doc,filename,100);
			saveAsPNG(doc,filename2,120);
			doc.close(SaveOptions.DONOTSAVECHANGES);
		}
	}

}

main();


