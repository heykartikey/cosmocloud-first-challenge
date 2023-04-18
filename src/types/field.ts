export const fieldTypes = ["number", "boolean", "string", "object"] as const

export type FieldType = typeof fieldTypes[number];

export type NumberField = {
  id: string;
  name: string;
  required: boolean;
  type: "number";
};

export type BooleanField = {
  id: string;
  name: string;
  required: boolean;
  type: "boolean";
};

export type StringField = {
  id: string;
  name: string;
  required: boolean;
  type: "string";
};

export type ObjectField = {
  id: string;
  name: string;
  type: "object";
  required: boolean;
  fields: Field[];
};

type Field = NumberField | StringField | BooleanField | ObjectField;

export default Field;
