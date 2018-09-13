/// <reference types="illustrator/2015.3"/>



export class ImageExporter {

  makeDir(name: string) {
    const f = new Folder(app.activeDocument.path + "/" + name)
    if(!f.exists) {
      f.create()
    }
  }


  saveAsPng(name: string, layer: Layer) {

    const invisibled = this.makeInvisibleOthers(layer)


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

    for(const l of invisibled) {
      l.visible = true
    }
  }

  private makeInvisibleOthers(layer: Layer) {
    const p = layer.parent 

    let changeLayers = []

    const layers = p.layers
    for(let i = 0;i < layers.length;i++) {
      const l = layers[i]
      if(l != layer && l.visible) {
        changeLayers.push(l)
        l.visible = false
      }
    }


    if(p.typename == "Layer") {
      changeLayers = changeLayers.concat(
        this.makeInvisibleOthers(p as Layer)
      )
    }
  
    return changeLayers
  }



}