import { Router } from "express";

import * as CharacterController from "./character.controller";

const router = Router();

router.post(
  "/",
  CharacterController.createCharacter
);

router.get(
  "/",
  CharacterController.getAllCharacters
);

router.get(
  "/:characterId",
  CharacterController.getCharacterById
);

router.patch(
  "/:characterId",
  CharacterController.updateCharacter
);

router.delete(
  "/:characterId",
  CharacterController.deleteCharacter
);

export default router;