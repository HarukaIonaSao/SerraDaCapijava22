export type Action = {type: "ADD_TOKEN" | "ADD_ID", payload: string}
//Tipo da action e a payload é a informação que a ação gera nesse caso, armazerar o token

export const addToken = (token: string): Action=>({
 type: "ADD_TOKEN",
 payload: token
});

export const addId = (id: string): Action =>({
    type: "ADD_ID",
    payload: id
});