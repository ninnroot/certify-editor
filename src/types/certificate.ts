


export type shapeProps = {
    x: number,
    y: number,
    height: number,
    width: number,
    id: string
    draggable?: boolean,
    fill?: string
}

export type baseComponentType = {
    shapeProps: shapeProps,
    isSelected?: boolean,
    onSelect?: React.Dispatch<React.SetStateAction<boolean>>,
    onChange?: any
}


interface imageShapProps extends shapeProps {
    src: CanvasImageSource
}

interface textShapProps extends shapeProps {
    text: string
}

export type componentType = {
    type: "rect",
    shapeProps: Partial<shapeProps>,
} | {
    type: "image",
    shapeProps: imageShapProps
} | {
    type: "text",
    shapeProps: textShapProps
}

export type certicateType = {

    components: componentType[],
    selectedComponentId: null | number | string
}