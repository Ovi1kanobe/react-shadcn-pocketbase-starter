import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface InputOTPFormProps {
  onSubmit: (otp: string) => void;
  className: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  otpLength?: number;
}

export function InputOTPForm(props: InputOTPFormProps) {
  const [otp, setOTP] = useState("");

  function handleSubmit() {
    if (otp.length !== 8) {
      toast.error("OTP must be 8 digits long");
      return;
    }
    props.setOpen(false);
    props.onSubmit(otp);
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="p-4 flex flex-col items-center justify-center">
        <DialogHeader className="p-4 flex flex-col items-center justify-center">
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            Please enter the one-time password sent to your email.
          </DialogDescription>
        </DialogHeader>
        <InputOTP onChange={setOTP} maxLength={8}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
