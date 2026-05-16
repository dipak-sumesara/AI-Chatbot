import {
  get,
  patch,
  post,
  remove,
} from "../axios.service";

export const createCharacter = async (
  payload: any
) => {
  return await post(
    "/characters",
    payload
  );
};

export const getAllCharacters =
  async () => {
    return await get("/characters");
  };

export const getCharacterById =
  async (characterId: string) => {
    return await get(
      `/characters/${characterId}`
    );
  };

export const updateCharacter =
  async (
    characterId: string,
    payload: any
  ) => {
    return await patch(
      `/characters/${characterId}`,
      payload
    );
  };

export const deleteCharacter =
  async (characterId: string) => {
    return await remove(
      `/characters/${characterId}`
    );
  };