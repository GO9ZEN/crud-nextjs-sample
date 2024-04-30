import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { EyeIcon, EyeOff } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        type={showPassword ? "text" : "password"}
        suffix={
          showPassword ? (
            <EyeIcon
              className="select-one"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOff
              className="select-one"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
