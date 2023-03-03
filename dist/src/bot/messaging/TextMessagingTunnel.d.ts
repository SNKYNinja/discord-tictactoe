import MessagingTunnel from './MessagingTunnel';
import { BaseMessageOptions, GuildMember, Message, TextChannel } from 'discord.js';
export default class TextMessagingTunnel extends MessagingTunnel {
    private readonly origin;
    private _reply?;
    constructor(origin: Message);
    get author(): GuildMember;
    get channel(): TextChannel;
    get reply(): Message | undefined;
    replyWith(answer: BaseMessageOptions, direct?: boolean): Promise<Message>;
    editReply(answer: BaseMessageOptions): Promise<void>;
    end(reason: BaseMessageOptions): Promise<void>;
}
