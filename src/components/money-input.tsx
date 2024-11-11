import React, { ChangeEvent, forwardRef, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input, InputProps } from "@/components/ui/input";
import { stringToInt, toReal } from "@/lib/utils";

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const [cents, setCents] = useState(props.value);

    const handleValueChange = (value: string) => {
      const numericValue = stringToInt(value);
      setCents(numericValue);
      if (props.onChange) {
        props.onChange(
          numericValue as unknown as ChangeEvent<HTMLInputElement>,
        );
      }
    };

    return (
      <NumericFormat
        {...props}
        value={toReal(cents)}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
        onValueChange={(values) => handleValueChange(values.value || "")}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
