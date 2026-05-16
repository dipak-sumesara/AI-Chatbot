import { CharacterModel } from "./character.model";

export const createCharacter = async (
  payload: any
) => {
  const character =
    await CharacterModel.create(payload);

  return character;
};

export const getAllCharacters = async () => {
  const characters =
    await CharacterModel.find().sort({
      createdAt: -1,
    });

  return characters;
};

export const getCharacterById = async (
  characterId: string
) => {
  const character =
    await CharacterModel.findById(characterId);

  return character;
};

export const updateCharacter = async (
  characterId: string,
  payload: any
) => {
  const updatedCharacter =
    await CharacterModel.findByIdAndUpdate(
      characterId,
      payload,
      {
        new: true,
      }
    );

  return updatedCharacter;
};

export const deleteCharacter = async (
  characterId: string
) => {
  await CharacterModel.findByIdAndDelete(
    characterId
  );

  return;
};