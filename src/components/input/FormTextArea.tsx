import FontClass from "src/types/enums/FontClass";
import GenericInput from "src/components/input/GenericInput";
import { UseFormRegisterReturn } from "react-hook-form";
import inputStyles from "@/css/input/InputStyles.module.css";
import joinClasses from "src/utils/joinClasses";

type Props = {
  hasError?: boolean;
  label?: string | JSX.Element;
  labelFontClass?: FontClass;
  labelTextTransform?: "none" | "uppercase";
  maxLength?: number;
  placeholder?: string;
  registerResult: UseFormRegisterReturn;
  rows?: number;
  subLabel?: string;
  value?: string;
};

export default function FormTextArea({
  hasError = false,
  label,
  labelFontClass,
  labelTextTransform = "none",
  maxLength,
  placeholder = "",
  registerResult,
  rows = 2,
  subLabel,
  value,
}: Props): JSX.Element {
  const hint =
    maxLength != null
      ? `${maxLength - (value?.length ?? 0)} characters left`
      : undefined;

  return (
    <GenericInput
      hint={hint}
      label={label}
      labelFontClass={labelFontClass}
      labelTextTransform={labelTextTransform}
      subLabel={subLabel}
    >
      {/* Need this extra div to apply border radius to scrollbar */}
      <div className={inputStyles.textAreaContainer}>
        <textarea
          {...registerResult}
          className={joinClasses(
            inputStyles.textArea,
            FontClass.Body1,
            hasError ? inputStyles.textAreaError : null
          )}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={rows}
        />
      </div>
    </GenericInput>
  );
}
