/// <reference types="types-for-adobe/illustrator/2015.3"/>


const OriginLayerName = "hoge"
const CopyDestinationLayerName = "fuga"


class FillItDocument {

  private doc = app.activeDocument
  
  getOriginLayer() {
    return this.doc.layers.getByName(OriginLayerName)
  }
  getCopyTargetLayer() {
    return this.doc.layers.getByName(CopyDestinationLayerName)
  }


  copyAllItems() {
    const copyTarget = this.getCopyTargetLayer()

    if(copyTarget) {
      copyTarget.remove()
    }

    const originLayer = this.getOriginLayer()

    this.doc.layers.add()
  }


}


alert("hogee")



