import Field, { FieldType, ObjectField } from "../../types/field";
import {
  FieldAction,
  ActionType,
  UpdateAction,
  AddAction,
  RemoveAction,
} from "../../types/field-action";

import { initialState, newField } from "./state";

import { uniq } from "../../uniq";
const IdGenerator = uniq();

export const fieldReducer = (
  state: Field = initialState,
  action: FieldAction
) => {
  switch (action.type) {
    case ActionType.Add:
      return addField(state, action);
    case ActionType.Remove:
      return removeField(state, action);
    case ActionType.Update:
      return update(state, action);
  }
};

function removeField(state: Field, { payload: { path } }: RemoveAction) {
  const clone = structuredClone(state) as Field;

  const pathArray = path.split("|");
  const fieldToRemove = pathArray.pop();

  let field: Field | undefined = clone;

  pathArray.forEach((path) => {
    if (field === undefined) return;
    if (!("fields" in field)) return;
    field = field.fields.find(({ id }) => id == path);
  });

  if (field && "fields" in field) {
    const index = field.fields.findIndex(({ id }) => id === fieldToRemove);
    field.fields.splice(index, 1);
  }

  return clone;
}

function addField(state: Field, { payload: { path } }: AddAction) {
  const clone = structuredClone(state) as Field;

  const pathArray = path.split("|");

  if (pathArray[0] === "") pathArray.pop();

  let field: Field | undefined = clone;

  pathArray.forEach((path) => {
    if (field === undefined) return;
    if (!("fields" in field)) return;
    field = field.fields.find(({ id }) => id == path);
  });

  if (field && "fields" in field) {
    field.fields.push({ ...newField, id: String(IdGenerator.next().value) });
  }

  return clone;
}

function update(
  state: Field,
  { payload: { path, type, value } }: UpdateAction
) {
  const clone = structuredClone(state) as Field;

  const pathArray = path.split("|");

  let field: Field | undefined = clone;

  pathArray.forEach((path) => {
    if (field === undefined) return;
    if (!("fields" in field)) return;
    field = field.fields.find(({ id }) => id == path);
  });

  if (field && type in field) {
    switch (type) {
      case "type":
        field["type"] = value as FieldType;

        if (value === "object") {
          (field as ObjectField).fields = [];
        } else {
          delete (field as Partial<ObjectField>).fields;
        }

        break;
      case "name":
        field.name = value as string;
        break;
      case "required":
        field.required = value as boolean;
        break;
    }
  }

  return clone;
}
