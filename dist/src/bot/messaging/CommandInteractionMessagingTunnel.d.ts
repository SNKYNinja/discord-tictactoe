import MessagingTunnel from './MessagingTunnel';
import { ChatInputCommandInteraction, GuildMember, InteractionReplyOptions, Message, TextChannel } from 'discord.js';
export default class CommandInteractionMessagingTunnel extends MessagingTunnel {
    private readonly interaction;
    private _reply?;
    constructor(interaction: ChatInputCommandInteraction);
    get author(): GuildMember;
    get channel(): TextChannel;
    get reply(): Message | undefined;
    replyWith(answer: InteractionReplyOptions, direct?: boolean): Promise<Message>;
    editReply(answer: InteractionReplyOptions): Promise<void>;
    end(reason: InteractionReplyOptions): Promise<void>;
}
