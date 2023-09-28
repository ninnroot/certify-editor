import { current, original, produce } from "immer"
import { create } from "zustand"
import { immer } from 'zustand/middleware/immer'
import { v4 as uuid } from "uuid"
import { certicateType, componentType } from "@/types/certificate"


enum componentEnum {
    rect = "rect",
    image = "image",
    text = "text"
}

interface CertificateStatesState {
    certificateStates: certicateType[],
    setCertificateStates: (certificateStates: certicateType[]) => void,

    setSelectedComponentId: (id: string | number | null) => void,

    currentStateIndex: number,
    setCurrentStatendex: (index: number) => void,
    onComponentMove: (newAttrs: any, compType: componentEnum, componentIndex: number) => void,
    addComponent: (component: componentType) => void
}

const useCertificateStore = create(immer<CertificateStatesState>((set) => ({
    certificateStates: [{
        components: [],
        selectedComponentId: null,
        backgroundImage: "default"
    }],
    setCertificateStates: (certificateStates: certicateType[]) => set((state) => {
        // @ts-ignore
        state.certificateStates = certificateStates
    }),
    setSelectedComponentId: (id: string | number | null) => set((state) => {
        state.certificateStates[state.currentStateIndex].selectedComponentId = id
    }),
    currentStateIndex: 0,
    setCurrentStatendex: (index: number) => set((state) => {
        state.currentStateIndex = index
    }),
    onComponentMove: (newAttrs: any, compType: componentEnum, componentIndex: number) => set((state) => {
        const nextState = produce(state.certificateStates[state.currentStateIndex], draftState => {
            draftState.components[componentIndex] = { shapeProps: { ...newAttrs }, type: compType }
        })
        state.certificateStates.splice(state.currentStateIndex + 1, 0, nextState)
        state.currentStateIndex += 1
    }),
    addComponent: (component: componentType) => set((state) => {
        const nextState = produce(state.certificateStates[state.currentStateIndex], draftState => {
            //@ts-ignore
            draftState.components.push(component)
        })

        state.certificateStates.splice(state.currentStateIndex + 1, 0, nextState)
        state.currentStateIndex += 1
    })

})))


export default useCertificateStore