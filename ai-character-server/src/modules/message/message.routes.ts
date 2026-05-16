import { Router } from "express";

import * as MessageController from "./message.controller";

const router = Router();

router.post(
  "/",
  MessageController.createMessage
);

router.post(
  "/regenerate",
  MessageController.regenerateMessage
);

router.get(
  "/conversation/:conversationId",
  MessageController.getMessagesByConversation
);

router.patch(
  "/:messageId",
  MessageController.updateMessage
);

router.delete(
  "/:messageId",
  MessageController.deleteMessage
);

router.post(
  "/rewind",
  MessageController.rewindConversation
);

export default router;