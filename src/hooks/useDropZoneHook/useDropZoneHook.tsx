import React from "react";
import { DropZoneContext } from "./dropZoneContext";

const useDropZone = () => {
  const dropZone: any = React.useContext(DropZoneContext);
  return dropZone;
};

export default useDropZone;
