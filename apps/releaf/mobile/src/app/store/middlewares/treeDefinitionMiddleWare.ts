import { createListenerMiddleware } from "@reduxjs/toolkit"
import { load, loaded } from "../slices/treeDefinitionSlice"
import { TreeDefinitionService } from "../../infrastructure/services/treeDefinition.service";

export const treeDefinitionListenerMiddleware = createListenerMiddleware()
const treeDefinitionService = new TreeDefinitionService();

treeDefinitionListenerMiddleware.startListening({
  actionCreator: load,
  effect: async (_, listenerApi) => {
    listenerApi.cancelActiveListeners()

    const data = await treeDefinitionService.getAll()
    listenerApi.dispatch(loaded(data))

    console.log("Tree Definitions fetched")
  },
})
