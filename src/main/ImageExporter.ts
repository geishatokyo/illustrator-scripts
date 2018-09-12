/// <reference types="illustrator/2015.3"/>



export class ImageExporter {


  saveAsPng(name: string, layer: Layer) {

    const layers = app.activeDocument.layers
    
    for(let i = 0;i < layers.length; i++) {
      layers[i].visible = false
    }
    layer.visible = true
    /*const items = app.activeDocument.pageItems
    for(let i = 0;i < items.length; i++) {
      items[i].hidden = true
    }*/



    const exportOptions = new ExportOptionsPNG24()
    exportOptions.antiAliasing = true;
    exportOptions.transparency = true;
    exportOptions.matte = false;
    //exportOptions.clip = true;
    exportOptions.saveAsHTML = false;
    exportOptions.verticalScale = 100;
    exportOptions.horizontalScale = 100;

    app.activeDocument.exportFile(
      new File(app.activeDocument.path + "/" + name + ".png"),
      ExportType.PNG24,
      exportOptions
    )

    for(let i = 0;i < layers.length; i++) {
      layers[i].visible = true
    }
    /*for(let i = 0;i < items.length; i++) {
      items[i].hidden = false
    }*/
  }



}