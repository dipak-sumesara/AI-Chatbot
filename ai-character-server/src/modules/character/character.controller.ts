import { Request, Response } from "express";

import * as CharacterService from "./character.service";

export const createCharacter = async (
  req: Request,
  res: Response
) => {
  try {
    const character =
      await CharacterService.createCharacter(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Character created successfully",
      data: character,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to create character",
    });
  }
};

export const getAllCharacters = async (
  _: Request,
  res: Response
) => {
  try {
    const characters =
      await CharacterService.getAllCharacters();

    res.status(200).json({
      success: true,
      data: characters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to fetch characters",
    });
  }
};

export const getCharacterById = async (
  req: Request,
  res: Response
) => {
  try {
    const character =
      await CharacterService.getCharacterById(
        req.params.characterId
      );

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to fetch character",
    });
  }
};

export const updateCharacter = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedCharacter =
      await CharacterService.updateCharacter(
        req.params.characterId,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Character updated successfully",
      data: updatedCharacter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to update character",
    });
  }
};

export const deleteCharacter = async (
  req: Request,
  res: Response
) => {
  try {
    await CharacterService.deleteCharacter(
      req.params.characterId
    );

    res.status(200).json({
      success: true,
      message:
        "Character deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to delete character",
    });
  }
};