import { Router } from "express";

import * as ConversationController from "./conversation.controller";

const router = Router();

router.post(
  "/",
  ConversationController.createConversation
);

router.get(
  "/character/:characterId",
  ConversationController.getConversationsByCharacter
);

router.patch(
  "/:conversationId/title",
  ConversationController.updateConversationTitle
);

router.get(
  "/:conversationId",
  ConversationController.getConversationById
);

router.post(
  "/branch",
  ConversationController.branchConversation
);


export default router;