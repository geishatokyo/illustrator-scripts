/// <reference types="illustrator/2015.3"/>


export class ActionExecutor {

  executeActionFromSrc(actionScript: ActionScript) {
    const file = new File(
      `${Folder.temp}/${actionScript.folder}_${actionScript.name}`
    )

    try {
      app.unloadAction(actionScript.folder, "")
    } catch(err) {

    }

    let isLoaded = false
    try {

      file.open("w")
      file.write(actionScript.script)

      file.close()
      app.loadAction(file)
      isLoaded = true
      app.doScript(actionScript.name,actionScript.folder,false)
    } finally{
      if(isLoaded) {
        app.unloadAction(actionScript.folder,"")
      }
    }
  }
}

export interface ActionScript {

  name: string
  folder: string

  script: string
}