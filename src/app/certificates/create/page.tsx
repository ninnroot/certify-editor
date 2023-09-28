"use client";
import useImage from "use-image";
import { Stage, Layer, Rect, Circle, Image, Text } from "react-konva";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { KonvaEventObject } from "konva/lib/Node";
import { componentType } from "@/types/certificate";
import { Button } from "@/components/ui/button";
import Rectangle from "@/components/certificate/primitives/rectangle";
import { number } from "zod";
import useCertificateStore from "@/store/certificate";

const CertificateCreatePage = () => {
  const [uploadedImage, setUploadedImage] = useState<string>();
  const [backgroundImage] = useImage(uploadedImage as string);
  

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target.index === 0;
    if (clickedOnEmpty) {
      setSeletedComponentId(null);
    }
  };

  const { selectedComponentId, components} = useCertificateStore((state) => state.certificateStates[state.currentStateIndex])
  const setSeletedComponentId = useCertificateStore((state) => state.setSelectedComponentId)
  const addComponent = useCertificateStore((state) => state.addComponent)
  const onComponentMove = useCertificateStore((state) => state.onComponentMove)




  return (
    <div>
      <Input
        type="file"
        onChange={(e) => {
          e.target.files && e.target.files[0]
            ? setUploadedImage(URL.createObjectURL(e.target.files[0]))
            : setUploadedImage("");
        }}
      ></Input>
      <div>
        <Button
          onClick={() =>
            addComponent({
              type: "rect",
              shapeProps: { x: 100, y: 100, id: String(components.length) },
            })
          }
        >
          add rect
        </Button>
      </div>
      {backgroundImage && (
        <Stage width={backgroundImage.width} height={backgroundImage.height}>
          <Layer>
            <Image
              image={backgroundImage}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
              width={backgroundImage.width}
              height={backgroundImage.height}
            ></Image>

            {components.map((c, i) => {
              if (c.type === "text") {
                return <Text 
                key={c.shapeProps.id}
                isSelected={c.shapeProps.id === selectedComponentId}
                onSelect={() => {
                  // @ts-ignore
                  setSeletedComponentId(c.shapeProps.id);
                }}
                onChange={(newAttrs: any) => {
                  //@ts-ignore
                  onComponentMove(newAttrs, c.type , i)
                }}
                ></Text>;
              } else if (c.type === "image") {
                return <Image image={c.src}></Image>;
              } else if (c.type === "rect") {
                return (
                  <Rectangle
                    key={c.shapeProps.id}
                    isSelected={c.shapeProps.id === selectedComponentId}
                    onSelect={() => {
                      // @ts-ignore
                      setSeletedComponentId(c.shapeProps.id);
                    }}
                    onChange={(newAttrs: any) => {
                      //@ts-ignore
                      onComponentMove(newAttrs, c.type , i)
                    }}
                    shapeProps={{
                      x: c.shapeProps.x as number,
                      y: c.shapeProps.y as number,
                      draggable: true,
                      height: c.shapeProps.height || 100,
                      width: c.shapeProps.width || 100,
                      fill: "red",
                      id: c.shapeProps.id as string,
                    }}
                  ></Rectangle>
                );
              }
            })}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default CertificateCreatePage;
