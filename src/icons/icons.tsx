// @ts-nocheck
import { FC } from 'react';
import { Icon, IIconProps, defaultProps, IconContainer } from './baseIcon';

// TODO: fix typescript errors
export const Play: FC<IIconProps> = (props) => (
  <IconContainer onClick={props.onClick}>
    <Icon {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M8 5v14l11-7z" />
    </Icon>
  </IconContainer>
); Play.defaultProps = defaultProps;

export const Stop: FC<IIconProps> = (props) => (
  <IconContainer onClick={props.onClick} >
    <Icon {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M8 5v14l11-7z" />
    </Icon>
  </IconContainer>
); Stop.defaultProps = defaultProps;
