//@ts-nocheck

import { baseComponentType } from "@/types/certificate";
import { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";

interface IRectangleProps extends baseComponentType {}

const Rectangle: React.FC<IRectangleProps> = ({
  isSelected = false,
  onSelect,
  onChange,
  shapeProps,
}) => {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // @ts-ignore
      transformerRef.current.nodes([shapeRef.current]);
      // @ts-ignore
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
    <Rect

      onClick={onSelect}
      onTap={onSelect}
      ref={shapeRef}
      draggable={shapeProps.draggable || false}
      {...shapeProps}
      onDragEnd={(e) => {
        onChange({
            ...shapeProps,
            
          x: e.target.x(),
          y: e.target.y(),
        });

      }}
      onTransformEnd={(e) => {
        // copied from Konva docs

        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          // set minimal value
          width: Math.max(5, node.width() * scaleX),
          height: Math.max( node.height() * scaleY),
        });
      }}
    />
    {
        isSelected && (
            <Transformer ref={transformerRef} boundBoxFunc={(oldBox, newBox) => {
                if(newBox.width < 5 || newBox.height < 5){
                    return oldBox
                }                
                return newBox
            }}>

            </Transformer>
        )
    }
    
    </>
  );
};

export default Rectangle
