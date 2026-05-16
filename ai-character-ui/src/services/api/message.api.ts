import {
    get,
    patch,
    post,
    remove,
} from "../axios.service";

export const createMessage = async (
    payload: any
) => {
    return await post(
        "/messages",
        payload
    );
};

export const getMessagesByConversation =
    async (conversationId: string) => {
        return await get(
            `/messages/conversation/${conversationId}`
        );
    };

export const updateMessage = async (
    messageId: string,
    payload: any
) => {
    return await patch(
        `/messages/${messageId}`,
        payload
    );
};

export const deleteMessage = async (
    messageId: string
) => {
    return await remove(
        `/messages/${messageId}`
    );
};

export const rewindConversation =
    async (payload: {
        conversationId: string;
        messageId: string;
    }) => {
        return await post(
            "/messages/rewind",
            payload
        );
    };

export const regenerateMessage =
    async (
        conversationId: string
    ) => {
        return await post(
            "/messages/regenerate",
            {
                conversationId,
            }
        );
    };