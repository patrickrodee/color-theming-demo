import React from "react";
import { Color, SimpleColorSet, ColorMap } from "../Colors/Colors";
import "./Button.scss";

export interface ThemableComponentProps {
  colorMap: ColorMap;
}

export interface TextButtonColorMap extends ColorMap {
  ink(): Color;
  icon(): Color;
}

export interface FillButtonColorMap extends ColorMap {
  ink(): Color;
  icon(): Color;
  container(): Color;
}

export interface OutlineButtonColorMap extends FillButtonColorMap {
  outline(): Color;
}

export class TextButtonDefaultColorMap implements TextButtonColorMap {
  protected colorSet: SimpleColorSet;

  constructor(colorSet: SimpleColorSet) {
    this.colorSet = colorSet;
  }

  ink() {
    return this.colorSet.accent;
  }

  icon() {
    return this.colorSet.accent;
  }
}

export class FillButtonDefaultColorMap extends TextButtonDefaultColorMap {
  container() {
    return this.colorSet.container;
  }
}

export class OutlineButtonDefaultColorMap extends FillButtonDefaultColorMap {
  outline() {
    return this.colorSet.low;
  }
}

export class TextButtonDisabledColorMap extends TextButtonDefaultColorMap {
  ink() {
    return this.colorSet.medium;
  }

  icon() {
    return this.colorSet.medium;
  }
}

export interface ButtonProps<C extends ColorMap>
  extends ThemableComponentProps {
  colorMap: C;
  textLabel: string;
  icon: string;
  disabled?: boolean;
}

export interface ButtonContentProps {
  textLabel: string;
  icon: string;
  disabled?: boolean;
}

type TextButtonProps = ButtonProps<TextButtonColorMap>;

export const TextButton: React.SFC<TextButtonProps> = props => {
  const styles = {
    containerStyles: {
      backgroundColor: "transparent"
    },
    iconStyles: {
      color: props.colorMap.icon()
    },
    textLabelStyles: {
      color: props.colorMap.ink()
    }
  };

  return (
    <button
      className="mdc-button"
      style={styles.containerStyles}
      disabled={props.disabled}
    >
      <i
        className="material-icons mdc-button__icon"
        aria-hidden={true}
        style={styles.iconStyles}
      >
        {props.icon}
      </i>
      <span className="mdc-button__label" style={styles.textLabelStyles}>
        {props.textLabel}
      </span>
    </button>
  );
};

type FillButtonProps = ButtonProps<FillButtonColorMap>;

export const FillButton: React.SFC<FillButtonProps> = props => {
  const containerStyles = {
    backgroundColor: props.colorMap.container()
  };

  const iconStyles = {
    color: props.colorMap.icon()
  };

  const textLabelStyles = {
    color: props.colorMap.ink()
  };

  return (
    <button
      className="mdc-button"
      style={containerStyles}
      disabled={props.disabled}
    >
      <i
        className="material-icons mdc-button__icon"
        aria-hidden={true}
        style={iconStyles}
      >
        {props.icon}
      </i>
      <span className="mdc-button__label" style={textLabelStyles}>
        {props.textLabel}
      </span>
    </button>
  );
};

type OutlineButtonProps = ButtonProps<OutlineButtonColorMap>;

export const OutlineButton: React.SFC<OutlineButtonProps> = props => {
  const containerStyles = {
    backgroundColor: props.colorMap.container(),
    border: `1px solid ${props.colorMap.outline()}`
  };

  const iconStyles = {
    color: props.colorMap.icon()
  };

  const textLabelStyles = {
    color: props.colorMap.ink()
  };

  return (
    <button
      className="mdc-button"
      style={containerStyles}
      disabled={props.disabled}
    >
      <i
        className="material-icons mdc-button__icon"
        aria-hidden={true}
        style={iconStyles}
      >
        {props.icon}
      </i>
      <span className="mdc-button__label" style={textLabelStyles}>
        {props.textLabel}
      </span>
    </button>
  );
};

// export interface DisableableProps {
//   defaultColorMap: ColorMap;
//   disabledColorMap: ColorMap;
//   disabled?: boolean;
// }

// export function Disableable<P extends ThemableComponentProps>(WrappedComponent: React.ComponentType<P>) {
//   return class DisableableComponent extends Component<DisableableProps> {
//     constructor(props: DisableableProps) {
//       super(props);
//     }

//     render() {
//       const {
//         disabledColorMap,
//         defaultColorMap,
//         disabled,
//         ...props
//       } = this.props;

//       const colorMap = disabled
//         ? disabledColorMap
//         : defaultColorMap;

//       return (
//         <WrappedComponent colorMap={colorMap} disabled={disabled} {...props as P} />
//       );
//     }
//   }
// }

// export const DisableableTextButton = Disableable<ButtonProps<TextButtonColorMap>>(TextButton);
// export const DisableableFillButton = Disableable<ButtonProps<FillButtonColorMap>>(FillButton);

// export interface ThemableButtonProps {
//   defaultColorSet: ColorSet;
//   disabledColorSet: ColorSet;
//   textLabel: string;
//   icon: string;
//   disabled?: boolean;
// }

// export function ThemableTextButton(props: ThemableButtonProps) {
//   const {
//     defaultColorSet,
//     disabledColorSet,
//     ...rest
//   } = props;

//   const defaulColorMap = new TextButtonDefaultColorMap(defaultColorSet);
//   const disabledColorMap = new TextButtonDisabledColorMap(disabledColorSet);

//   return (
//     <DisableableTextButton
//       defaultColorMap={defaulColorMap}
//       disabledColorMap={disabledColorMap}
//       {...rest as ButtonProps<TextButtonColorMap>}/>
//   );
// };

// export function ThemableFillButton(props: ThemableButtonProps) {
//   const {
//     defaultColorSet,
//     disabledColorSet,
//     ...rest
//   } = props;

//   const defaulColorMap = new FillButtonDefaultColorMap(defaultColorSet);
//   const disabledColorMap = new FillButtonDefaultColorMap(disabledColorSet);

//   return (
//     <DisableableFillButton
//       defaultColorMap={defaulColorMap}
//       disabledColorMap={disabledColorMap}
//       {...rest as ButtonProps<FillButtonColorMap>}/>
//   );
// };

// export const MaterialTextButton = (props: ButtonContentProps) => {
//   const defaulColorMap = new TextButtonDefaultColorMap(MaterialPrimary);
//   const disabledColorMap = new TextButtonDisabledColorMap(MaterialPrimary);
//   return (
//     <DisableableTextButton
//       defaultColorMap={defaulColorMap}
//       disabledColorMap={disabledColorMap}
//       {...props as ButtonProps}/>
//   );
// };
