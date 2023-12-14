import React from "react";
import { Checkbox, Flex, Typography } from "@strapi/design-system";

interface InputProps {
  name: string;
  onChange: (
    {
      target: { name, value, type },
    }: { target: { name: string; value: any; type: string } },
    shouldSetInitialValue?: boolean
  ) => void;
  value: null | string;
  attribute: {
    type: string;
    customFiled: string;
    options: {};
  };
  intlLabel: {
    id: string;
    defaultMessage: string;
  };
  hint: string | null | undefined;
  default: boolean | null;
  disabled: boolean | null | undefined;
  required: boolean | null | undefined;
  private: boolean | null | undefined;
}

const Index = ({
  name,
  value,
  onChange,
  attribute: { type, options },
  ...props
}: InputProps): JSX.Element => {
  console.log({ props });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({
      target: {
        name,
        value: e.target.checked,
        type,
      },
    });

  return (
    <Flex direction="column" alignItems="stretch" gap={1}>
      <Typography>{name}</Typography>
      <Checkbox
        checked={value ?? props?.default ?? false}
        onChange={handleChange}
      />
    </Flex>
  );
};

export default Index;
