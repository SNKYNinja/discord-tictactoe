import { GuildMember, Message, MessagePayloadOption, TextChannel } from 'discord.js';
export type MessagingAnswer = MessagePayloadOption;
export default abstract class MessagingTunnel {
    abstract get author(): GuildMember;
    abstract get channel(): TextChannel;
    abstract get reply(): Message | undefined;
    abstract replyWith(answer: MessagingAnswer, direct?: boolean): Promise<Message>;
    abstract editReply(answer: MessagingAnswer): Promise<void>;
    abstract end(reason: MessagingAnswer): Promise<void>;
}
