import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const InvalidAddress = () => {
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Invalid Location</AlertDialogTitle>
        <AlertDialogDescription>
          You entered an invalid location or the location you submitted is not a
          city
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Try Again</AlertDialogAction>
      </AlertDialogFooter>
    </div>
  );
};

export default InvalidAddress;
