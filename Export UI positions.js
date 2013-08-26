
var scriptVersion = "0.1";


var actDoc = app.activeDocument;
var saveFolder = actDoc.path; // アクティブなドキュメントの保存フォルダ
//var actDocName = actDoc.name.substring(0,actDoc.name.indexOf(".")); // アクティブなドキュメントの名前

var imageDir = saveFolder;// = saveFolder + "/" + actDocName;

var imageIndex = 1;


function extractTypeAndName(name,defaultType) {
	var s = name.split(".");
	if(s.length == 1){
		return [null,name];
	}else{
		return [s[0],s[1]];
	}

}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}
function convertToClassName( n ){
	return capitalize(n);
}

function saveAsPNG( doc , filename, scale){
	var exportOptions = new ExportOptionsPNG24();
	var type = ExportType.PNG24;
	var fileSpec = new File(filename);
	exportOptions.antiAliasing = true;
	exportOptions.transparency = true;
	//exportOptions.artBoardClipping = true;
	exportOptions.matte = false;
	exportOptions.saveAsHTML = false;
	exportOptions.verticalScale = scale;
	exportOptions.horizontalScale = scale;
	doc.exportFile(fileSpec,type,exportOptions)
}
function createNewDocument(item ){
	var newDoc = app.documents.add(DocumentColorSpace.RGB);
		if(item.duplicate){
		    var copy = item.duplicate();
		    copy.moveToEnd(newDoc);
	    }
	return newDoc;

}

function getDoubleSizeFilename(filename){
	var name = filename.name;
	if(name.indexOf(".") > 0){
		name = name.substring(0,name.indexOf("."));
	}
    var name2 = new File(filename.path + "/" + name + "@2x.png");

	return name2;

}

function saveImages(name , item){
	if(name == null || name.length == 0){
		name = "image" + imageIndex;
		imageIndex += 1;
	}
	var doc = createNewDocument(item);
	var path = new File(imageDir + "/" + name + ".png");

	var path2 = getDoubleSizeFilename(path);
	saveAsPNG(doc,path,100);
	saveAsPNG(doc,path2,200);
	doc.close(SaveOptions.DONOTSAVECHANGES);

	return [path.name, path2.name];
}

function convertLayer( layer ){
	if(layer.name.indexOf("#") == 0) return null;

	var typeAndName = extractTypeAndName(layer.name);
	var type = typeAndName[0];
	var name = typeAndName[1];
	if(type == null) type = "container";

	var children = [];
	var layers = layer.layers;

	for (var i = 0; i < layers.length;i++){
		var l = layers[i];
		if(l.visible){
			var c = convertLayer(l);
			if(c != null) children.push(c);
	    }
	}

	for(var i = 0; i < layer.pageItems.length;i++){
		var pi = layer.pageItems[i];
		if(!pi.hidden){
			var c = convertComponent(pi);
		    if(c != null) children.push(c);
	    }

	}
	return {
		type : type,
		name : typeAndName[1],
		children : children
	};
}
function convertComponent(com){
	 

	if(com.typename == "GroupItem"){
		return convertGroup(com);
	}

	var typeAndName = extractTypeAndName(com.name);
	var type = typeAndName[0];
	var name = typeAndName[1];
	if(type == null){
		if(com.typename == "TextFrame"){
			type = "label";
		}else{
			type = "image";
		}
	}
	var rec = rect(com);
	var o = {
		type : type,
		name : typeAndName[1],
		x : rec[0],
		y : rec[1],
		width : rec[2],
		height : rec[3]
	};

	if(com.typename == "TextFrame"){
		if(com.contents == null || com.contents.length == 0) return null;
		o["text"] = com.contents;
		var att = com.textRange.characterAttributes;
		if(att != null && att.textFont != null){
			o["font"] = att.textFont.name;
		}
		if(att != null){
			o["fontSize"] = att.size;
			o["fontColor"] = colorToRGB(att.fillColor);
		}
		
	}else if(com.typename = "PathItem"){
		var images = saveImages(name,com);
		o["image"] = images[0];
		o["image_2x"] = images[1];
	}

	return o;
}

function colorToRGB(color){
	if(color.typename == "RGBColor"){
		return {r : color.red,g : color.green , b : color.blue};
	}else if(color.typename == "NoColor"){
		return {r : 0, g : 0,b : 0};
	}else{
		alert("Unknown color type " + color.typename);
		return null;
	}
}

function convertGroup(group){
	var typeAndName = extractTypeAndName(group.name);
	var type = typeAndName[0];
	var name = typeAndName[1];
	if(type == null){
		type = "image";
	}

	var rec = rect(group);
	
	if(type == "container" || type.indexOf("!") == type.length - 1){

		var children = [];

		for(var i = 0; i < group.pageItems.length;i++){
			var pi = group.pageItems[i];
			if(!pi.hidden){
				var c = convertComponent(pi);
				if(c != null) children.push(c);
			}
		}
		return {
			type : type,
			name : typeAndName[1],
			x : rec[0],
			y : rec[1],
			width : rec[2],
			height : rec[3],
			children : children
		};
    }else{

		var images = saveImages(name,group);
		return {
			type : type,
			name : typeAndName[1],
			x : rec[0],
			y : rec[1],
			width : rec[2],
			height : rec[3],
			image : images[0],
			image_2x : images[1]
		};

    }
}

function rect(com){
	return [com.position[0], com.position[1],com.width,com.height];
}



var currentArtboard;

function convert(artboard){

	var children = [];
	imageDir = saveFolder + "/" + artboard.name;
	currentArtboard = artboard;


	new Folder(imageDir).create();
	var layers = app.activeDocument.layers;
	for (var i = 0; i < layers.length;i++){
		var l = layers[i];
		if(l.visible){
			var t = convertLayer(l);
			if(t != null) children.push(t);
		}
	}
	return {
		name : artboard.name,
		version : scriptVersion,
		width : artboard.artboardRect[2],
		height : -artboard.artboardRect[3],
		root : children
	};

}

function toJson(obj ,indent){
	
	if(obj == null) return "null";
	if(indent == null) indent = "";

	if(typeof obj == "int") return obj;
	else if(typeof obj == "number") return obj;
	else if(typeof obj == "string") return '"' + obj.replace(/[\n\r]/g,"\\n") + '"';
	else if(obj instanceof Array) {
		var objs = [];
		for(var i = 0;i < obj.length;i++){
			objs.push(toJson(obj[i],indent));
		}

		return "[" + objs.join(",\n" + indent) + "]";

	}else{
		var fields = [];

		var json = indent + "{\n";
		for( var key in obj){
			var v = obj[key];
			fields.push('"' + key + '" : ' + toJson(v,indent + "  "));
			
		}
		return "{\n  " + indent + fields.join(",\n  " + indent) + "\n" + indent + "}";
	}

	//return obj.toSource().replace(/\(\{/g,"{").replace(/})/g,"}");
}




var selectObject = app.activeDocument.selection[0];


var artboards = app.activeDocument.artboards;

for(var i = 0;i < artboards.length;i++){
	var artboard = artboards[i];
	var saveFile = new File(saveFolder + "/" + artboard.name + "_ui.json");

	var structure = convert(artboard);

	// 書き込みモードでファイルを開き、改行でjoinした配列を書き込んで閉じる
	saveFile.open("w");
	saveFile.encoding = "utf-8";
	var success = saveFile.write(toJson(structure));
	saveFile.close();

}

