// TODO: add message type from tg docs
export type SendMessageResponse = any;

export function sendMessage(data: {
  delay?: number;
  token: string;
  chatId: string;
  message: string;
}): Promise<SendMessageResponse[]>;

export function chatBot(data: {
  delay?: number;
  token: string;
  chatId: string;
}): (message: string) => Promise<SendMessageResponse[]>;

export function bot(data: {
  delay?: number;
  token: string;
}): (data: {
  chatId: string;
  message: string;
}) => Promise<SendMessageResponse[]>;
