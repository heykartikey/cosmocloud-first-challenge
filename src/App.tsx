import type { ObjectField } from "./types/field";
import { ActionType } from "./types/field-action";

import { useReducer } from "react";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import {
  Container,
  IconButton,
  Paper,
  Stack,
  Typography
} from "@mui/material";

import Fields from "./components/Fields";
import { fieldReducer } from "./data/fields/reducer";
import { initialState } from "./data/fields/state";

function App() {
  const [state, dispatch] = useReducer(fieldReducer, initialState);

  return (
    <Container maxWidth="lg" className="mt-32">
      <Paper className="p-4">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2">Field name and type</Typography>
          <div>
            <IconButton
              size="small"
              onClick={() => {
                dispatch({
                  type: ActionType.Add,
                  payload: {
                    path: "",
                  },
                });
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => {
              console.log({ fields: (state as ObjectField).fields })
            }}>
              <SaveIcon />
            </IconButton>
          </div>
        </Stack>
        <div className="mt-4">
          {"fields" in state && state.fields.length > 0 ? (
            <Fields
              fields={(state as ObjectField).fields}
              path=""
              dispatch={dispatch}
            />
          ) : (
            <Typography
              textAlign="center"
              fontStyle="italic"
              variant="subtitle1"
            >
              No Field Added
            </Typography>
          )}
        </div>
      </Paper>
    </Container>
  );
}

export default App;
