import { ImageProps } from "next/image";

export interface IconProps extends Pick<ImageProps, 'width' | 'height'> {
  onClick?: () => void;
}