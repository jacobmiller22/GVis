import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
/** Interfaces/types */

/** components */
import BackIcon from "@mui/icons-material/ArrowBackSharp";

type BackButtonProps = {
  onClick?: (e: React.SyntheticEvent) => void;
  asLink?: boolean;
  href?: string;
  [rest: string]: any;
};

const BackButton = ({
  onClick,
  asLink = false,
  href,
  ...rest
}: BackButtonProps) => {
  const router = useRouter();

  if ((asLink && !href) || (!asLink && href)) {
    throw "BackButton: asLink and href must be used together";
  }

  if (!asLink) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          onClick && onClick(e);
          router.back();
        }}
        startIcon={<BackIcon />}
        {...rest}
      >
        Back
      </Button>
    );
  }
  return (
    <Link href={href!}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        startIcon={<BackIcon />}
        {...rest}
      >
        Back
      </Button>
    </Link>
  );

  return <Button></Button>;
};

export default BackButton;
