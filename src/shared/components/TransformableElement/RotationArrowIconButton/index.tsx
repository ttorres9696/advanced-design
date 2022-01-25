import { Image as ImageType } from 'konva/types/shapes/Image';
import { Stage } from 'konva/types/Stage';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

import { redoBlack } from '../../../assets/redoBlack';
import { undoBlack } from '../../../assets/undoBlack';
import { RotationArrowIconButtonProps, RotationIconSize } from './types';

const RotationArrowIconButton: React.FC<RotationArrowIconButtonProps> = ({
  x,
  y,
  position,
  onClick,
  type,
  rotation,
  invisible,
}) => {
  const shapeRef = useRef<any>();

  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [icon, setIcon] = useState<HTMLImageElement>();
  const [loadedIcon, setLoadedIcon] = useState<boolean>(false);

  const onClickIcon = useCallback((e: any) => onClick(position), [onClick, position]);

  const onMouseOver = useCallback(
    (e: any) => {
      setMouseOver(true);
    },
    [setMouseOver],
  );

  const onMouseOut = useCallback((e: any) => setMouseOver(false), [setMouseOver]);

  const onMouseEnter = useCallback(() => {
    if (shapeRef && shapeRef.current) {
      const node = shapeRef.current as ImageType;
      const stage: Stage | null = node.getStage();

      if (stage) {
        stage.container().style.cursor = 'pointer';
      }
    }
  }, [shapeRef]);

  const onMouseLeave = useCallback(() => {
    if (shapeRef && shapeRef.current) {
      const node = shapeRef.current as ImageType;
      const stage: Stage | null = node.getStage();

      if (stage) {
        stage.container().style.cursor = 'default';
      }
    }
  }, [shapeRef]);

  const handleImageLoad = useCallback(() => {
    setLoadedIcon(true);
  }, [setLoadedIcon]);

  useEffect(() => {
    if (!icon) {
      const image = new window.Image();
      image.src = type === 'left' ? undoBlack : redoBlack;
      image.addEventListener('load', handleImageLoad);

      setIcon(image);
    }
  }, [icon, setIcon, redoBlack, undoBlack, handleImageLoad]);

  return (
    <Fragment>
      {loadedIcon ? (
        <Image
          ref={shapeRef}
          image={icon}
          x={x}
          y={y}
          width={RotationIconSize}
          height={RotationIconSize}
          tension={0}
          opacity={mouseOver ? 1 : 0.5}
          draggable={false}
          rotation={rotation}
          onClick={onClickIcon}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          visible={!invisible}
        />
      ) : null}
    </Fragment>
  );
};

export default React.memo(RotationArrowIconButton);
