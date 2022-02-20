import React from "react";
import _upperFirst from "lodash/upperFirst";
import SETTINGS from "../../../../../../../../settings/system.json";
import { FormFieldFileTypes } from "../../../../../../../../types";

export interface IntFormFieldFileProps {
  id?: FormFieldFileTypes;
  name?: string;
  onChange: (_id: FormFieldFileTypes) => void;
}

const FormFieldFile: React.FC<IntFormFieldFileProps> = ({
  id = FormFieldFileTypes.FileField,
  name = "path",
  onChange
}) => {
  const acceptedFiles =
    id === FormFieldFileTypes.MDFileFieldExe
      ? SETTINGS.FILE_TYPES.EXE
      : id === FormFieldFileTypes.MDFileFieldSound
      ? SETTINGS.FILE_TYPES.SOUND
      : SETTINGS.FILE_TYPES.ALL;

  console.log(27, { acceptedFiles });

  return (
    <>
      <div>
        <label data-testid="fileField__label" htmlFor={name}>
          {_upperFirst(name)}:
        </label>
        <input
          data-testid="fileField__input"
          id={id}
          type="file"
          onChange={() => onChange(id)}
          accept={acceptedFiles}
        />
      </div>
    </>
  );
};

export default FormFieldFile;
