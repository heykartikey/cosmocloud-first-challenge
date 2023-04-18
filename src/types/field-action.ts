import { FieldType } from "./field";

export const enum ActionType {
  Add,
  Remove,
  Update,
}

export type UpdateAction = {
  type: ActionType.Update;
  payload: {
    path: string;
  } & (
    | {
        type: "type";
        value: FieldType;
      }
    | {
        type: "name";
        value: string;
      }
    | {
        type: "required";
        value: boolean;
      }
  );
};

export type AddAction = {
  type: ActionType.Add;
  payload: {
    path: string;
  };
};

export type RemoveAction = {
  type: ActionType.Remove;
  payload: {
    path: string;
  };
};

export type FieldAction = AddAction | RemoveAction | UpdateAction;
