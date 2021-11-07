/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEventHandler, forwardRef } from "react";

import AmplitudeEvent from "src/types/enums/AmplitudeEvent";
import ButtonName from "src/types/enums/ButtonName";
import ButtonTheme from "src/types/enums/ButtonTheme";
import FontClass from "src/types/enums/FontClass";
import GlobalClass from "src/types/enums/GlobalClass";
import Link from "next/link";
import joinClasses from "src/utils/joinClasses";
import styles from "@/css/buttons/ButtonWithText.module.css";
import useLogEvent from "src/hooks/useLogEvent";

type Props = {
  buttonName?: ButtonName;
  buttonTheme: ButtonTheme;
  children: string | JSX.Element | Array<string | JSX.Element>;
  className?: string;
  disabled?: boolean;
  fontClass: FontClass;
  height?: number;
  href?: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  logProperties?: { [key: string]: any };
  onClick?: MouseEventHandler;
  style?: { [key: string]: string | number };
  textTransform?: "none" | "uppercase";
  type?: "button" | "link_external" | "link_internal" | "submit";
  width?: "auto" | "100%";
};

function getClassNameForButtonTheme(
  buttonTheme: ButtonTheme,
  isLink: boolean,
  disabled: boolean
): string {
  switch (buttonTheme) {
    case ButtonTheme.ReplaceMe:
      return joinClasses(
        isLink ? styles.replaceMeThemeLink : styles.replaceMeTheme,
        disabled ? styles.disabled : null
      );
    default:
      break;
  }

  throw new Error(`unsupported buttonTheme ${buttonTheme}`);
}

// forwardRef required to make this work with NextJS Link, see
// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component.
const ButtonWithText = forwardRef<HTMLButtonElement, Props>(
  (
    {
      buttonName,
      buttonTheme,
      children,
      className,
      disabled = false,
      fontClass,
      height,
      href,
      icon,
      iconPosition = "right",
      logProperties,
      onClick,
      style = {},
      textTransform,
      type = "button",
      width = "auto",
    }: Props,
    ref
  ) => {
    const logEvent = useLogEvent();
    const styleToUse = {
      ...style,
      height,
      ...(textTransform == null ? {} : { textTransform }),
    };
    const classNameJoined = joinClasses(
      getClassNameForButtonTheme(
        buttonTheme,
        type === "link_internal" || type === "link_external",
        disabled
      ),
      styles.button,
      width === "auto" ? styles.buttonAutoWidth : styles.button100Width,
      fontClass,
      className
    );

    const childrenWithIcon = (
      <>
        {icon && iconPosition === "left" && (
          <div
            className={joinClasses(
              styles.icon,
              styles.iconLeft,
              GlobalClass.HideText
            )}
          >
            {icon}
          </div>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <div
            className={joinClasses(
              styles.icon,
              styles.iconRight,
              GlobalClass.HideText
            )}
          >
            {icon}
          </div>
        )}
      </>
    );
    const onClickWithLog: MouseEventHandler = (e) => {
      if (buttonName != null) {
        logEvent(AmplitudeEvent.ButtonClick, { buttonName, ...logProperties });
      }
      if (onClick != null) {
        onClick(e);
      }
    };

    if (type === "link_internal") {
      return (
        <Link href={href ?? ""}>
          <div
            className={joinClasses(classNameJoined, styles.linkContent)}
            onClick={onClickWithLog}
            style={styleToUse}
          >
            {childrenWithIcon}
          </div>
        </Link>
      );
    }

    if (type === "link_external") {
      return (
        <a
          className={joinClasses(classNameJoined, styles.linkContent)}
          href={href ?? ""}
          onClick={onClickWithLog}
          style={styleToUse}
        >
          {childrenWithIcon}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classNameJoined}
        disabled={disabled}
        onClick={onClickWithLog}
        style={styleToUse}
        // eslint-disable-next-line react/button-has-type
        type={type}
      >
        {childrenWithIcon}
      </button>
    );
  }
);

export default ButtonWithText;
