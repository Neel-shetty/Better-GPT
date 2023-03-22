import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  chats: Array<string>;
}

interface chat {
  id: number;
  
}

const initialState: initialStateType = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});
