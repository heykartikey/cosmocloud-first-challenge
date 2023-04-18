import type Field from "../types/field";
import { ActionType, FieldAction } from "../types/field-action";

import { Divider, IconButton, Stack, Switch, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Delete';

import Fields from "./Fields";
import { FieldType, fieldTypes } from "../types/field";

type FieldItemProps = {
  field: Field;
  path: string;
  dispatch: React.Dispatch<FieldAction>;
};

function FieldItem({ field, path, dispatch }: FieldItemProps): JSX.Element {
  return (
    <div>
      <Stack
        direction="row" alignItems="center" justifyContent="space-between"
        className="bg-gray-200 p-1 group"
      >
        <Stack direction="row" alignItems="center" gap="4px">
          <input className="bg-gray-200 hover:bg-white focus-within:bg-white w-24 text-ellipsis p-1 text-sm" value={field.name}
            onChange={(e) => {
              dispatch({
                type: ActionType.Update,
                payload: {
                  path,
                  type: "name",
                  value: e.target.value
                }
              })
            }}
          />
          <select className="bg-gray-300 rounded-sm" value={field.type} onChange={(e) => {
            dispatch({
              type: ActionType.Update,
              payload: {
                path,
                type: "type",
                value: e.target.value as FieldType
              }
            })
          }}>
            {
              fieldTypes.map(type => <option value={type} key={type} className="bg-gray-200">
                {type}
              </option>)
            }
          </select>
        </Stack>
        <Stack direction="row" alignItems="center" className="invisible group-hover:visible">
          <Typography variant="caption">Required</Typography>
          <Switch size="small" checked={field.required} onChange={e => {
            dispatch({
              type: ActionType.Update,
              payload: {
                path,
                type: "required",
                value: e.target.checked
              }
            })
          }} />
          {field.type === "object" && <IconButton size="small" onClick={() => {
            dispatch({
              type: ActionType.Add,
              payload: {
                path
              }
            })
          }}>
            <AddIcon />
          </IconButton>}
          <IconButton size="small" onClick={() => {
            dispatch({
              type: ActionType.Remove,
              payload: {
                path
              }
            })
          }}>
            <RemoveIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Divider color="#eee" />
      {field.type === "object" &&
        <Fields path={path} dispatch={dispatch} fields={field.fields} />
      }
    </div>
  );
}

export default FieldItem;
