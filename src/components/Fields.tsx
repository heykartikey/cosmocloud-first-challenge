import type { FieldAction } from "../types/field-action"

import Field from "../types/field"
import FieldItem from "./FieldItem"

type FieldsProps = {
  fields: Field[],
  path: string,
  dispatch: React.Dispatch<FieldAction>
}

function Fields({ fields, path, dispatch }: FieldsProps): JSX.Element {
  return (
    <div className={`${path !== "" ? "ml-4" : ""}`}>
      {
        fields?.map(field =>
          <FieldItem key={field.id} path={`${path}${path === "" ? "" : "|"}${field.id}`} field={field} dispatch={dispatch} />
        )
      }
    </div>
  )
}

export default Fields