import type Field from "../../types/field";
import { NumberField } from "../../types/field";

export const initialState: Field = {
  id: "",
  type: "object",
  name: "",
  required: false,
  fields: [
    {
      type: "object",
      id: "person",
      name: "person",
      required: false,
      fields: [
        {
          type: "object",
          id: "name",
          name: "name",
          required: false,
          fields: [
            {
              type: "string",
              id: "firstName",
              name: "firstName",
              required: false,
            },
            {
              type: "string",
              id: "lastName",
              name: "lastName",
              required: false,
            },
          ],
        },
        {
          type: "number",
          id: "age",
          name: "age",
          required: false,
        },
      ],
    },
    {
      id: "class",
      name: "class",
      type: "string",
      required: false,
    },
  ],
};

export const newField: NumberField = {
  type: "number",
  name: "field",
  required: false,
  id: "",
};
