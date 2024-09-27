import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
