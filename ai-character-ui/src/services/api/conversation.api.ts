import { get, post, patch } from "../axios.service";

export const createConversation =
    async (payload: any) => {
        return await post(
            "/conversations",
            payload
        );
    };

export const getConversationsByCharacter =
    async (characterId: string) => {
        return await get(
            `/conversations/character/${characterId}`
        );
    };

export const getConversationById =
    async (conversationId: string) => {
        return await get(
            `/conversations/${conversationId}`
        );
    };

export const branchConversation =
    async (payload: {
        conversationId: string;
        branchFromMessageId: string;
    }) => {
        return await post(
            "/conversations/branch",
            payload
        );
    };

export const updateConversationTitle =
    async (
        conversationId: string,
        title: string
    ) => {
        return await patch(
            `/conversations/${conversationId}/title`,
            {
                title,
            }
        );
    };