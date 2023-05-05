import { ImageProps } from "next/image";

export interface IconProps extends Pick<ImageProps, 'width' | 'height' | 'className'> {
  onClick?: () => void;
  icon: IconList;
}

type IconList = 'Eye' | 'EyeOff' | 'Hourglass' | 'Heart';
